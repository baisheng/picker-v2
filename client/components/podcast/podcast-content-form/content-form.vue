<template>
  <div>
    <card class="section-header" compact>
      <div class="section-header__label">
          <span class="section-header__label-text">
            节目信息
        </span>
      </div>
      <div class="section-header__actions" v-show="editing" @click="handleClick">
        <button class="button is-compact is-primary">
          保存
        </button>
      </div>
    </card>
    <card>
      <div>
        <form>
          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              标题
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input type="text"
                       autocapitalize="none"
                       autocomplete="off"
                       value=""
                       placeholder="请输入标题"
                       size="1"
                       class="token-field__input"
                       v-model="podcast.title">
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
          </div>
          <fieldset class="form-fieldset">
            <!-- react-empty: 3841 --><!-- react-empty: 3842 -->
            <label for="role" class="form-label">
              作者
            </label>
            <select id="role" name="role" class="form-select">
              <option value="administrator">Basil(佰晟）</option>
              <option value="editor">叶青</option>
              <option value="author">亚南</option>
              <option value="contributor">贡献者</option>
              <option value="follower">粉丝</option>
            </select>
            <p class="form-setting-explanation">
              <a target="_blank" rel="noopener noreferrer"
                 href="http://en.support.wordpress.com/user-roles/">
                <icon name="plus" class="gridicon"></icon>
                添加作者
              </a>
            </p>
          </fieldset>
          <fieldset class="form-fieldset">
            <label for="message" class="form-label">
              内容介绍
            </label>
            <div class="counted-textarea">
              <textarea name="message" id="message" maxlength="500" placeholder=""
                        class="counted-textarea__input form-textarea" v-model="podcast.content">
              </textarea>
              <div class="counted-textarea__count-panel">
                {{ wordCount }} 个字
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </card>
  </div>
</template>

<script>
  import {Card} from '../../card'

  export default {
    props: {
      podcast: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        editing: false
      }
    },
    components: {
      Card
    },
    mounted () {
      this.$on('update_success', () => {
        this.editing = false
      })
    },
    computed: {
      wordCount () {
        if (this.podcast.content !== null) {
          return this._wordCount(this.podcast.content)
        }
      }
    },
    watch: {
//      'podcast': {
//        handler (val, oldVal) {
//          this.editing = true
//          this.$emit('content_update', this.podcast)
//        },
//        deep: true
//      }
    },
    methods: {
      handleClick () {
//        this.$emit('content_update', this.podcast)
      },
      _wordCount (data) {
        const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g

        const m = data.match(pattern)
        let count = 0
        if (m === null) {
          return count
        }
        for (let i = 0; i < m.length; i++) {
          if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
          } else {
            count += 1
          }
        }
        return count
      }
    }
  }
</script>
