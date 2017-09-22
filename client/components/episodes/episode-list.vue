<template>
  <div>
    <card class="section-header" compact>
      <div class="section-header__label">
          <span class="section-header__label-text" v-if="!creating">
            节目列表 ({{ episodeCount }})
          </span>
        <span v-else>
            {{ post.title }}
          </span>
      </div>
      <div class="section-header__actions">
        <file-upload
          class="button popover-icon is-compact"
          name="file"
          post-action="http://api.picker.la/rest/orgs/1/file"
          v-model="files"
          @input-file="input"
          @input-filter="inputFilter"
          :accept="accept"
          :size="size || 0"
          :headers="requestHeader"
          ref="upload" v-show="!creating">
          <!--Add upload files-->
          <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
            </g>
          </svg>
          批量上传
        </file-upload>

        <button class="button is-compact" @click="create" v-if="!creating">
          <svg class="gridicon gridicons-plus-small needs-offset"
               height="18" width="18" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M18 11h-5V6h-2v5H6v2h5v5h2v-5h5"></path>
            </g>
          </svg>
          添加
        </button>

        <div class="button-group" v-else>
          <button class="button is-compact is-primary" @click="create">
            发布
          </button>
          <button class="button is-compact" @click="cancel">
            取消
          </button>
        </div>
      </div>
    </card>

    <card expanded v-if="creating">
      <div class="connected-application-item__header" slot="header">

        <div class="order">
          <!--{{ index + 1 }}.-->
        </div>
        <h3> {{ episode.title }}</h3>
      </div>
      <button type="submit" class="button form-button is-compact is-active" slot="summary">
        发布
      </button>
      <div slot="expandedSummary" class="section-header__actions">
        <span class="button-group">
        <button type="button" class="button is-error is-compact is-scary">
          <svg class="gridicon gridicons-trash needs-offset-y" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"><g><path
            d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path></g></svg>
          删除
        </button>
        <button type="button" class="button is-error is-compact">停播</button>
        </span>
      </div>
      <form>
        <div role="group" class="invite-people__token-field-wrapper"><label class="form-label">
          标题
        </label>
          <div tabindex="-1" class="token-field">
            <div tabindex="-1" class="token-field__input-container">
              <input type="text" autocapitalize="none"
                     autocomplete="off" value=""
                     placeholder="请输入标题" size="1"
                     class="token-field__input" v-model="episode.title">
            </div>
          </div>
        </div>
      </form>
      <div>
        <!--<card class="post-image is-placeholder is-compact"></card>-->
        <player mutex theme="#42b983" preload="metadata" mode="circulation"
                :music="newItem" v-if="newItem.url"></player>
        <div class="empty-content" v-else>
          <h2 class="empty-content__title">没有音频内容</h2>
          <h3 class="empty-content__line">是否要上传内容？</h3>
          <!--<button @click.prevent="addDirectory">Add upload directory</button>-->
          <button class="media-library__upload-button button button is-primary" @click.prevent="insertFile(newItem)"
                  :class="uploadProgress && newItem === curItem ? 'is-busy' : ''">
              <span v-if="uploadProgress && newItem === curItem">
                {{uploadProgress}}
              </span>
            <span v-else>
                上传音频
              </span>
          </button>
        </div>
      </div>
    </card>

    <episode :key="index" v-for="(item, index) in list"
             :order="index"
             :data="item"
             v-dragging="{item: item, list: list}"
             @episode-del="del" @update="update"></episode>
  </div>
</template>
<style>
  .msg {
    transition: all .3s ease;
    height: 30px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
  }

  .msg.v-enter, .msg.v-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    /*transition: opacity .5s*/
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
<script>
  /* eslint-disable no-trailing-spaces,indent */

  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../foldable-card'
  import {Card} from '../card'
  import Episode from '../episode'

  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      podcast: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        action: '',
        newItem: {
          title: '无标题'
        },
        toItem: null,
        itemList: [],
        files: [],
        uploadProgress: '',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        size: 1024 * 1024 * 10,
        curItem: {
          title: ''
        },
        curIndex: -1,
        episode: {
          title: '无标题',
          status: 'draft',
          content: ''
        },
        post: {
          title: '无标题',
          status: 'draft'
        }
      }
    },
    mounted () {
      // 如果是创建了内容
//      this.curItem = this.post

//      if (!Object.is(this.podcast.children, null)) {
//        this.itemList = this.podcast.children
//      }
      this.$dragging.$on('dragged', ({value, draged, to}) => {
        this.list = value.list
        this.curItem = draged
        // eslint-disable-next-line prefer-const
        let _curSort = draged.sort
        this.curItem.sort = to.sort
        to.sort = _curSort
        this.toItem = to
        // 更新排序
        this.$emit('podcast_item_update', this.curItem, this.curItem.id)
        this.$emit('podcast_item_update', to, to.id)
      })
      this.$dragging.$on('dragend', () => {
      })
    },
    components: {
      Card,
      FileUpload,
      FoldableCard,
      Episode
    },
    computed: {
//      episodeList () {
//        return this.$store.state.podcast.episodeList
//      },
//      status: {
//        get () {
//        }
//      },
      episodeCount () {
        return this.list.count
      },
      creating () {
        return this.$store.state.podcast.episode.creating
      },
//      saving () {
//        return this.$store.state.posts.item.saving
//      },
      episodeState () {
        return this.$store.state.podcast.episode
      },
      episodeId () {
        return this.$store.state.podcast.episode.id
      },
//      postId () {
//        return this.$store.state.posts.post.data.id
//      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    watch: {
      'post': {
        handler (val, oldVal) {
          console.log(val)
        },
        deep: true
      },
      'episodeState': {
        handler (val, oldVal) {
          if (val.del === 'success') {
            console.log('lalal')
            this.list.splice(this.curIndex, 1)
          }
        },
        deep: true
      },
      'episodeId': {
        handler (val, oldVal) {
          console.log('lalala')
          this.episode.id = val
          this.list.push(this.episode)
        },
        deep: true
      }
    },
    methods: {
      getStatusClass (status) {
// eslint-disable-next-line default-case
        switch (status) {
          case 'auto-draft':
            return 'is-warning'
          case 'draft':
            return 'is-warning'
          case 'delete':
            return 'is-danger'
          case 'publish':
            return ''
        }
      },
      save () {

      },
      del (item, index) {
//        console.log('del action...')
//        console.log(JSON.stringify(item))
        this.curIndex = index
        this.$store.dispatch('episodeDelete', {id: item.id, axios: this.$axios})
//        console.log(this.postState)
      },
      update (episode, id) {
        this.$emit('podcast_item_update', episode, id)
      },
      // 创建节目 episode
      create () {
        const _sort = this.list.length + 1
        this.episode = {title: '无标题', parent: this.podcast.id, sort: _sort, status: 'draft'}
        this.$store.dispatch('episodeCreate', {data: this.episode, axios: this.$axios})
      },
      cancel () {
        this.$store.commit('podcast/CREATE_EPISODE_CANCEL')
      },

      insertFile (cur) {
        const input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
        this.curItem = cur
      },
      input (newFile, oldFile) {
        if (newFile && oldFile) {
          // console.log('update', newFile, oldFile)
          if (newFile.active && !oldFile.active) {
            // this.beforeSend(newFile)
            // min size
            if (newFile.size >= 0 && newFile.size < 100 * 1024) {
              // newFile = this.$refs.upload.update(newFile, {error: 'size'})
            }
          }
          if (newFile.progress !== oldFile.progress) {
            this.uploadProgress = newFile.progress
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
            // console.log('error', newFile.error, newFile.response)
          }
          if (newFile.success && !oldFile.success) {
            // this.success(newFile)
            const data = newFile.response.data
            this.curItem.url = data.url
            this.curItem.meta = {
              _audio_id: data.id
            }
            this.uploadProgress = ''
            // 如果不是新建就更新
            if (!this.creating) {
              this.$store.commit('posts/UPDATE_ITEM')
              this.$emit('podcast_item_update', this.curItem, this.curItem.id)
            }
          }
        }
        if (!newFile && oldFile) {
          // this.remove(oldFile)
          // console.log('remove', oldFile)
        }
        // 自动开始
        if (newFile && !oldFile && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      },
      inputFilter (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // 过滤系疼文件 or 隐藏文件
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          // 过滤 php html js 文件
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
          // 创建 blob 字段
          newFile.blob = ''
          const URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
        }
      }

    }
  }
</script>
