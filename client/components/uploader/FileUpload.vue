<template>
  <label :class="className">
    <input-file></input-file>
    <slot></slot>
  </label>
</template>
<style>
  .file-uploads {
    overflow: hidden;
    position: relative;
    text-align: center;
    display: inline-block;
  }

  .file-uploads.file-uploads-html4 input[type="file"] {
    opacity: 0;
    font-size: 20em;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .file-uploads.file-uploads-html5 input[type="file"] {
    overflow: hidden;
    position: fixed;
    width: 1px;
    height: 1px;
    z-index: -1;
    opacity: 0;
  }
</style>
<script>
  /* eslint-disable comma-dangle,prefer-promise-reject-errors,no-multi-spaces,no-cond-assign,no-unused-vars,spaced-comment,no-undef,no-extra-parens */

  import InputFile from './InputFile.vue'

  export default {
    components: {
      InputFile,
    },
    props: {
      inputId: {
        type: String,
      },
      name: {
        type: String,
        default: 'file',
      },
      accept: {
        type: String,
      },
      multiple: {
        type: Boolean,
      },
      directory: {
        type: Boolean,
      },
      postAction: {
        type: String,
      },
      putAction: {
        type: String,
      },
      headers: {
        type: Object,
        default: Object,
      },
      data: {
        type: Object,
        default: Object,
      },
      timeout: {
        type: Number,
        default: 0,
      },
      drop: {
        default: false,
      },
      dropDirectory: {
        type: Boolean,
        default: true,
      },
      size: {
        type: Number,
        default: 0,
      },
      extensions: {
        default: Array,
      },
      value: {
        type: Array,
        default: Array,
      },
      thread: {
        type: Number,
        default: 1,
      },
    },
    data () {
      return {
        files: this.value,
        features: {
          html5: true,
          directory: false,
          drag: false,
        },
        active: false,
        dropActive: false,
        uploading: 0,
        destroy: false,
      }
    },
    /**
     * mounted
     * @return {[type]} [description]
     */
    mounted () {
      let input = document.createElement('input')
      input.type = 'file'
      input.multiple = true
      // html5 特征
      if (window.FormData && input.files) {
        // 上传目录特征
        if (typeof input.webkitdirectory === 'boolean' || typeof input.directory === 'boolean') {
          this.features.directory = true
        }
        // 拖拽特征
        if (this.features.html5 && typeof input.ondrop !== 'undefined') {
          this.features.drop = true
        }
      } else {
        this.features.html5 = false
      }
      // files 定位缓存
      this.maps = {}
      this.$nextTick(function () {
        // 更新下父级
        if (this.$parent) {
          this.$parent.$forceUpdate()
        }
        // 拖拽渲染
        this.watchDrop(this.drop)
      })
    },
    /**
     * beforeDestroy
     * @return {[type]} [description]
     */
    beforeDestroy () {
      // 已销毁
      this.destroy = true
      // 设置成不激活
      this.active = false
    },
    computed: {
      /**
       * uploading 正在上传的线程
       * @return {[type]} [description]
       */
      /*uploading() {
        let uploading = 0
        for (var i = 0; i < this.files.length; i++) {
          if (this.files[i].active) {
            uploading++
          }
        }
        return uploading
      },*/
      /**
       * uploaded 文件列表是否全部已上传
       * @return {[type]} [description]
       */
      uploaded () {
        let file
        for (let i = 0; i < this.files.length; i++) {
          file = this.files[i]
          if (!file.error && !file.success) {
            return false
          }
        }
        return true
      },
      className () {
        return [
          'file-uploads',
          this.features.html5 ? 'file-uploads-html5' : 'file-uploads-html4',
          this.features.directory && this.directory ? 'file-uploads-directory' : undefined,
          this.features.drop && this.drop ? 'file-uploads-drop' : undefined,
        ]
      }
    },
    watch: {
      active (active) {
        this.watchActive(active)
      },
      dropActive () {
        if (this.$parent) {
          this.$parent.$forceUpdate()
        }
      },
      drop (value) {
        this.watchDrop(value)
      },
      value (files) {
        if (this.files === files) {
          return
        }
        let oldFiles = this.files
        this.files = files
        let oldMaps = this.maps
        // 重写 maps 缓存
        this.maps = {}
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          this.maps[file.id] = file
        }
        // add, update
        for (let key of this.maps) {
          let newFile = this.maps[key]
          let oldFile = oldMaps[key]
          if (newFile !== oldFile) {
            this.emitFile(newFile, oldFile)
          }
        }
        // delete
        for (let key in oldMaps) {
          if (!this.maps[key]) {
            this.emitFile(undefined, oldMaps[key])
          }
        }
      },
    },
    methods: {
      // 清空
      clear () {
        if (this.files.length) {
          let files = this.files
          this.files = []
          // 定位
          this.maps = {}
          // 事件
          this.emitInput()
          for (let i = 0; i < files.length; i++) {
            this.emitFile(undefined, files[i])
          }
        }
        return true
      },
      // 选择
      get (id) {
        if (!id) {
          return false
        }
        if (typeof id === 'object') {
          id = id.id
        }
        return this.maps[id] || false
      },
      // 添加
      add (files, start) {
        let isArray = files instanceof Array
        // 不是数组整理成数组
        if (!isArray) {
          files = [files]
        }
        // 遍历规范对象
        let addFiles = []
        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          if (this.features.html5 && file instanceof File) {
            file = {
              file,
              size: file.size,
              name: file.webkitRelativePath || file.relativePath || file.name,
              type: file.type,
            }
          }
          file = {
            size: -1,
            name: 'Filename',
            type: '',
            active: false,
            error: '',
            success: false,
            putAction: this.putAction,
            postAction: this.postAction,
            timeout: this.timeout,
            ...file,
            response: {},
            progress: '0.00',          // 只读
            speed: 0,                  // 只读
            // xhr: false,                // 只读
            // iframe: false,             // 只读
          }
          file.data = {
            ...this.data,
            ...file.data ? file.data : {},
          }
          file.headers = {
            ...this.headers,
            ...file.headers ? file.headers : {},
          }
          if (!file.id) {
            file.id = Math.random().toString(36).substr(2)
          }
          if (this.emitFilter(file, undefined)) {
            continue
          }
          addFiles.push(file)
          // 只允许单个文件
          if (!this.multiple) {
            break
          }
        }
        // 没有文件
        if (!addFiles.length) {
          return false
        }
        // 只允许单个文件 删除所有
        if (!this.multiple) {
          this.clear()
        }
        // 添加进去 files
        let newFiles
        if (start) {
          newFiles = addFiles.concat(this.files)
        } else {
          newFiles = this.files.concat(addFiles)
        }
        this.files = newFiles
        // 定位
        for (let i = 0; i < addFiles.length; i++) {
          let file = addFiles[i]
          this.maps[file.id] = file
        }
        // 事件
        this.emitInput()
        for (let i = 0; i < addFiles.length; i++) {
          this.emitFile(addFiles[i], undefined)
        }
        return isArray ? addFiles : addFiles[0]
      },
      // 移除
      remove (file) {
        file = this.get(file)
        if (file) {
          if (this.emitFilter(undefined, file)) {
            return false
          }
          let files = this.files.concat([])
          let index = files.indexOf(file)
          if (index === -1) {
            console.error('remove', file)
            return false
          }
          files.splice(index, 1)
          this.files = files
          // 定位
// eslint-disable-next-line prefer-reflect
          delete this.maps[file.id]
          // 事件
          this.emitInput()
          this.emitFile(undefined, file)
        }
        return file
      },
      // 更新
      update (file, data) {
        file = this.get(file)
        if (file) {
          let newFile = {...file, ...data}
          // 停用必须加上错误
          if (file.active && !newFile.active && !newFile.error && !newFile.success) {
            newFile.error = 'abort'
          }
          if (this.emitFilter(newFile, file)) {
            return false
          }
          let files = this.files.concat([])
          let index = files.indexOf(file)
          if (index === -1) {
            console.error('update', file)
            return false
          }
          files.splice(index, 1, newFile)
          this.files = files
          // 定位
          this.maps[file.id] = newFile
          // 事件
          this.emitInput()
          this.emitFile(newFile, file)
          return newFile
        }
        return false
      },
      // 预处理 事件 过滤器
      emitFilter (newFile, oldFile) {
        let isPrevent = false
        this.$emit('input-filter', newFile, oldFile, function () {
          isPrevent = true
          return isPrevent
        })
        return isPrevent
      },
      // 处理后 事件 分发
      emitFile (newFile, oldFile) {
        this.$emit('input-file', newFile, oldFile)
        if (newFile && newFile.active && (!oldFile || !oldFile.active)) {
          this.uploading++
          // 激活
          this.$nextTick(function () {
            setTimeout(() => {
              this.upload(newFile).then(() => {
                newFile = this.get(newFile)
                if (newFile) {
                  this.update(newFile, {active: false, success: !newFile.error})
                }
              }).catch((e) => {
                this.update(newFile, {active: false, success: false, error: e.code || e.error || e.message || e})
              })
// eslint-disable-next-line radix
            }, parseInt(Math.random() * 50 + 50))
          })
        } else if ((!newFile || !newFile.active) && oldFile && oldFile.active) {
          // 停止
          this.uploading--
        }
        // 自动延续激活
        if (this.active && (Boolean(newFile) !== Boolean(oldFile) || newFile.active !== oldFile.active)) {
          this.watchActive(true)
        }
      },
      emitInput () {
        this.$emit('input', this.files)
      },
      // 上传
      upload (file) {
        // 被删除
        if (!(file = this.get(file))) {
          return Promise.reject('not_exists')
        }
        // 有错误直接响应
        if (file.error) {
          return Promise.reject(file.error)
        }
        // 已完成直接响应
        if (file.success) {
          return Promise.resolve(file)
        }
        // 后缀
        let extensions = this.extensions
        if (extensions && (extensions.length || typeof extensions.length === 'undefined')) {
          if (typeof extensions !== 'object' || !(extensions instanceof RegExp)) {
            if (typeof extensions === 'string') {
              extensions = extensions.split(',').map(value => value.trim()).filter(value => value)
            }
            extensions = new RegExp('\\.(' + extensions.join('|').replace(/\./g, '\\.') + ')$', 'i')
          }
          if (file.name.search(extensions) === -1) {
            return Promise.reject('extension')
          }
        }
        // 大小
        if (this.size > 0 && file.size >= 0 && file.size > this.size) {
          return Promise.reject('size')
        }
        if (this.features.html5 && file.putAction) {
          return this.uploadPut(file)
        } else if (this.features.html5) {
          return this.uploadHtml5(file)
        } else {
          return this.uploadHtml4(file)
        }
      },
      uploadPut (file) {
        let querys = []
        let value
        for (let key of file.data) {
          value = file.data[key]
          if (value !== null && value !== undefined) {
            querys.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
          }
        }
        let queryString = querys.length ? (file.putAction.indexOf('?') === -1 ? '?' : '&') + querys.join('&') : ''
        let xhr = new XMLHttpRequest()
        xhr.open('PUT', file.putAction + queryString)
        return this.uploadXhr(xhr, file, file.file)
      },
      uploadHtml5 (file) {
        let form = new window.FormData()
        let value
        for (let key of file.data) {
          value = file.data[key]
          if (value && typeof value === 'object' && typeof value.toString !== 'function') {
            form.append(key, JSON.stringify(value))
          } else if (value !== null && value !== undefined) {
            form.append(key, value)
          }
        }
        form.append(this.name, file.file)
        let xhr = new XMLHttpRequest()
        xhr.open('POST', file.postAction)
        return this.uploadXhr(xhr, file, form)
      },
      uploadXhr (xhr, file, data) {
        let speedTime = 0
        let speedLoaded = 0
        // 进度条
        xhr.upload.onprogress = (e) => {
          // 还未开始上传 已删除 未激活
          if (!e.lengthComputable || !(file = this.get(file)) || !file.active) {
            return
          }
          // 进度 速度 每秒更新一次
          let speedTime2 = Math.round(Date.now() / 1000)
          if (speedTime2 === speedTime) {
            return
          }
          speedTime = speedTime2
          file = this.update(file, {
            progress: (e.loaded / e.total * 100).toFixed(2),
            speed: e.loaded - speedLoaded,
          })
          speedLoaded = e.loaded
        }
        // 检查激活状态
        let interval = setInterval(() => {
          file = this.get(file)
          if (file && !file.success && !file.error && file.active) {
            return
          }
          if (interval) {
            clearInterval(interval)
            interval = false
          }
          try {
            xhr.abort()
            xhr.timeout = 1
          } catch (e) {
            console.log(e)
          }
        }, 100)
        return new Promise((resolve, reject) => {
          let complete
          let fn = (e) => {
            // 已经处理过了
            if (complete) {
              return
            }
            complete = true
            if (interval) {
              clearInterval(interval)
              interval = false
            }
            file = this.get(file)
            // 不存在直接响应
            if (!file) {
              return reject('not_exists')
            }
            // 有错误自动响应
            if (file.error) {
              return reject(file.error)
            }
            // 未激活
            if (!file.active) {
              return reject('abort')
            }
            // 已完成 直接相应
            if (file.success) {
              return resolve(file)
            }
            let data = {}
            switch (e.type) {
              case 'timeout':
              case 'abort':
                data.error = e.type
                break
              case 'error':
                if (!xhr.status) {
                  data.error = 'network'
                } else if (xhr.status >= 500) {
                  data.error = 'server'
                } else if (xhr.status >= 400) {
                  data.error = 'denied'
                }
                break
              default:
                if (xhr.status >= 500) {
                  data.error = 'server'
                } else if (xhr.status >= 400) {
                  data.error = 'denied'
                } else {
                  data.progress = '100.00'
                }
            }
            if (xhr.responseText) {
              let contentType = xhr.getResponseHeader('Content-Type')
              if (contentType && contentType.indexOf('/json') !== -1) {
                data.response = JSON.parse(xhr.responseText)
              } else {
                data.response = xhr.responseText
              }
            }
            // 更新
            file = this.update(file, data)
            // 相应错误
            if (file.error) {
              return reject(file.error)
            }
            // 响应
            return resolve(file)
          }
          // 事件
          xhr.onload = fn
          xhr.onerror = fn
          xhr.onabort = fn
          xhr.ontimeout = fn
          // 超时
          if (file.timeout) {
            xhr.timeout = file.timeout
          }
          // headers
          for (let key of file.headers) {
            xhr.setRequestHeader(key, file.headers[key])
          }
          // 更新 xhr
          file = this.update(file, {xhr})
          // 开始上传
          xhr.send(data)
        })
      },
      uploadHtml4 (file) {
        let onKeydown = function (e) {
          if (e.keyCode === 27) {
            e.preventDefault()
          }
        }
        let iframe = document.createElement('iframe')
        iframe.id = 'upload-iframe-' + file.id
        iframe.name = 'upload-iframe-' + file.id
        iframe.src = 'about:blank'
        iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;')
        let form = document.createElement('form')
        form.action = file.postAction
        form.name = 'upload-form-' + file.id
        form.setAttribute('method', 'POST')
        form.setAttribute('target', 'upload-iframe-' + file.id)
        form.setAttribute('enctype', 'multipart/form-data')
        let value
        let input
        for (let key of file.data) {
          value = file.data[key]
          if (value && typeof value === 'object' && typeof value.toString !== 'function') {
            value = JSON.stringify(value)
          }
          if (value !== null && value !== undefined) {
            input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            form.appendChild(input)
          }
        }
        form.appendChild(file.el)
        document.body.appendChild(iframe).appendChild(form)
        let getResponseData = function () {
          let doc
          try {
            if (iframe.contentWindow) {
              doc = iframe.contentWindow.document
            }
          } catch (err) {
            console.log(err)
          }
          if (!doc) {
            try {
              doc = iframe.contentDocument ? iframe.contentDocument : iframe.document
            } catch (err) {
              doc = iframe.document
            }
          }
          if (doc && doc.body) {
            return doc.body.innerHTML
          }
          return null
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // 不存在
            if (!(file = this.update(file, {iframe}))) {
              return reject('not_exists')
            }
            // 定时检查
            let interval = setInterval(() => {
              file = this.get(file)
              if (file && !file.success && !file.error && file.active) {
                return
              }
              if (interval) {
                clearInterval(interval)
                interval = false
              }
              if (!file || file.error) {
                iframe.onabort({type: file ? 'abort' : 'not_exists'})
              }
            }, 100)
            let complete
            let fn = (e) => {
              // 已经处理过了
              if (complete) {
                return
              }
              complete = true
              if (interval) {
                clearInterval(interval)
                interval = false
              }
              // 关闭 esc 事件
              document.body.removeEventListener('keydown', onKeydown)
              file = this.get(file)
              // 不存在直接响应
              if (!file) {
                return reject('not_exists')
              }
              // 有错误自动响应
              if (file.error) {
                return reject(file.error)
              }
              // 未激活
              if (!file.active) {
                return reject('abort')
              }
              // 已完成 直接相应
              if (file.success) {
                return resolve(file)
              }
              let response = getResponseData()
              let data = {}
              switch (e.type) {
                case 'abort':
                  data.error = 'abort'
                  break
                case 'error':
                  if (file.error) {
                    data.error = file.error
                  } else if (response === null) {
                    data.error = 'network'
                  } else {
                    data.error = 'denied'
                  }
                  break
                default:
                  if (file.error) {
                    data.error = file.error
                  } else if (data === null) {
                    data.error = 'network'
                  } else {
                    data.progress = '100.00'
                  }
              }
              if (response !== null) {
                if (response && response.substr(0, 1) === '{' && response.substr(response.length - 1, 1) === '}') {
                  try {
                    response = JSON.parse(response)
                  } catch (err) {
                    console.log(err)
                  }
                }
                data.response = response
              }
              // 更新
              file = this.update(file, data)
              if (file.error) {
                return reject(file.error)
              }
              // 响应
              return resolve(file)
            }
            // 添加事件
            iframe.onload = fn
            iframe.onerror = fn
            iframe.onabort = fn
            // 禁止 esc 键
            document.body.addEventListener('keydown', onKeydown)
            // 提交
            form.submit()
          }, 50)
        }).then(function (res) {
          iframe.parentNode && iframe.parentNode.removeChild(iframe)
          return res
        }).catch(function (res) {
          iframe.parentNode && iframe.parentNode.removeChild(iframe)
          return res
        })
      },
      watchActive (active) {
        let file
        let index = 0
        while (file = this.files[index]) {
          index++
          if (active && !this.destroy) {
            if (this.uploading >= this.thread || this.uploading && !this.features.html5) {
              break
            }
            if (!file.active && !file.error && !file.success) {
              this.update(file, {active: true})
            }
          } else {
            if (file.active) {
              this.update(file, {active: false})
            }
          }
        }
        if (this.uploading === 0) {
          this.active = false
        }
      },
      watchDrop (el) {
        if (!this.features.drop) {
          return
        }
        // 移除挂载
        if (this.dropElement) {
          try {
            window.document.removeEventListener('dragenter', this.onDragenter, false)
            window.document.removeEventListener('dragleave', this.onDragleave, false)
            this.dropElement.removeEventListener('dragover', this.onDragover, false)
            this.dropElement.removeEventListener('drop', this.onDrop, false)
          } catch (e) {
            console.log(e)
          }
        }
        if (!el) {
          el = false
        } else if (typeof el === 'string') {
          el = document.querySelector(el) || this.$root.$el.querySelector(el)
        } else if (el === true) {
          el = this.$parent.$el
        }
        this.dropElement = el
        if (this.dropElement) {
          window.document.addEventListener('dragenter', this.onDragenter, false)
          window.document.addEventListener('dragleave', this.onDragleave, false)
          this.dropElement.addEventListener('dragover', this.onDragover, false)
          this.dropElement.addEventListener('drop', this.onDrop, false)
        }
      },
      // 添加表单文件
      addInputFile (el) {
        let files = []
        if (el.files) {
          for (let i = 0; i < el.files.length; i++) {
            let file = el.files[i]
            files.push({
              size: file.size,
              name: file.webkitRelativePath || file.relativePath || file.name,
              type: file.type,
              file,
              el
            })
          }
        } else {
          files.push({
            name: el.value.replace(/^.*?([^/\\\r\n]+)$/, '$1'),
            el,
          })
        }
        this.add(files)
        let Component = this.$options.components.InputFile
        // vue 2.0.0  = Component
        // vue 2.0.x  = Component._Ctor
        // vue 2.1.x = Component._Ctor[0]
        if (!Component._Ctor) {
          console.log('compnent._Ctor empty')
        } else if (typeof Component._Ctor === 'function') {  ///... 蠢死我 没加 typeof
          Component = Component._Ctor
        } else {
          Component = Component._Ctor[0]
        }
        let inputFile = new Component({
          parent: this,
          el,
        })
      },
      // 获得 entry
      getEntry (entry, path = '') {
        return new Promise((resolve, reject) => {
          if (entry.isFile) {
            entry.file(function (file) {
              resolve([
                {
                  size: file.size,
                  name: path + file.name,
                  type: file.type,
                  file,
                }
              ])
            })
          } else if (entry.isDirectory && this.dropDirectory) {
            entry.createReader().readEntries((entries) => {
              let files = []
              let forEach = (i) => {
                if (!entries[i] || (files.length && !this.multiple)) {
                  return resolve(files)
                }
                this.getEntry(entries[i], path + entry.name + '/').then((results) => {
                  files.push(...results)
                  forEach(i + 1)
                })
              }
              forEach(0)
            })
          } else {
            resolve([])
          }
        })
      },
      onDragenter (e) {
        e.preventDefault()
        if (!this.dropActive) {
          this.dropActive = true
        }
      },
      onDragleave (e) {
        e.preventDefault()
        if (e.target.nodeName === 'HTML' || e.screenX === 0 && e.screenY === 0 && e.screenY === 0 && !e.fromElement && e.offsetX < 0) {
          this.dropActive = false
        }
      },
      onDragover (e) {
        e.preventDefault()
      },
      onDrop (e) {
        e.preventDefault()
        this.dropActive = false
        let dataTransfer = e.dataTransfer
        let files = []
        if (dataTransfer.items && dataTransfer.items.length) {
          let items = []
          for (let i = 0; i < dataTransfer.items.length; i++) {
            let item = dataTransfer.items[i]
            if (item.getAsEntry) {
              item = item.getAsEntry()
            } else if (item.webkitGetAsEntry) {
              item = item.webkitGetAsEntry()
            } else {
              item = item.getAsFile()
            }
            items.push(item)
          }
          let forEach = (i) => {
            let item = items[i]
            // 结束 或者已有文件了
            if (!item || (!this.multiple && files.length)) {
              return this.add(files)
            }
            this.getEntry(item).then(function (results) {
              files.push(...results)
              forEach(i + 1)
            })
          }
          forEach(0)
        } else if (dataTransfer.files.length) {
          for (let i = 0; i < dataTransfer.files.length; i++) {
            files.push(dataTransfer.files[i])
            if (!this.multiple) {
              break
            }
          }
          this.add(files)
        }
      },
    }
  }
</script>
