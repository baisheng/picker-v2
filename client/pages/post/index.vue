<template>
  <main data-reactroot="" class="connected-applications main" role="main">


    <header-cake @click="test" @click-title="test" isCompact>
      添加内容
    </header-cake>
    <foldable-card class="is-compact">
      <div class="connected-application-item__header" slot="header">
        <div class="plugin-icon connected-application-icon">
          <img
            class="plugin-icon__img"
            src="https://i0.wp.com/wpcom.files.wordpress.com/2016/01/icon300px.png?w=100">
        </div>
        <h3>{{ post.title }}</h3>
      </div>
      <button type="submit" class="button form-button is-compact is-active" slot="summary">
        发布
      </button>
      <div slot="expandedSummary">
        <button type="button" class="button is-error is-compact is-scary">下架</button>
      </div>
    </foldable-card>
    <div class="card">
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
                       v-model="post.title">
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
                        class="counted-textarea__input form-textarea" v-model="post.content"></textarea>
              <div class="counted-textarea__count-panel">
                {{ wordCount }} 个字
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    <div>
      <div class="card section-header is-compact">
        <div class="section-header__label">
          <span class="section-header__label-text">
            音频列表
        </span>
        </div>
        <div class="section-header__actions">
          <button class="button popover-icon is-compact" type="button">
            <!--<icon name="plus-circle" class="gridicon"></icon>-->
            <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
              </g>
            </svg>
            上传
          </button>
        </div>
      </div>
      <div class="card foldable-card connected-application-item has-expanded-summary is-compact">
        <div class="foldable-card__header is-clickable has-border">
          <span class="foldable-card__main">
            <div
              class="connected-application-item__header">
          <div class="plugin-icon connected-application-icon">
            <img
              class="plugin-icon__img"
              src="https://i0.wp.com/wpcom.files.wordpress.com/2016/01/icon300px.png?w=100"></div><h3>WordPress.com</h3></div>
            <!-- react-text: 4537 --> <!-- /react-text --></span><span class="foldable-card__secondary"><span
          class="foldable-card__summary"><div><button type="button" class="button is-compact">下架</button></div>
          <!-- react-text: 4542 --> <!-- /react-text --></span><span class="foldable-card__summary-expanded"><div><button
          type="button" class="button is-compact">下架</button></div><!-- react-text: 4546 -->
          <!-- /react-text --></span><button type="button" class="foldable-card__action foldable-card__expand"><span
          class="screen-reader-text">更多</span><svg class="gridicon gridicons-chevron-down" height="24" width="24"
                                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
          d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></span></div>
      </div>
      <foldable-card compact>
        <div class="connected-application-item__header" slot="header">
          <div class="plugin-icon connected-application-icon">
            <img
              class="plugin-icon__img"
              src="https://i0.wp.com/wpcom.files.wordpress.com/2016/01/icon300px.png?w=100">
          </div>
          <h3>{{ post.title }}</h3>
        </div>
        <button type="submit" class="button form-button is-compact is-active" slot="summary">
          发布
        </button>
        <div slot="expandedSummary">
          <button type="button" class="button is-error is-compact is-scary">下架</button>
        </div>
        <form>
          <div role="group" class="invite-people__token-field-wrapper"><label class="form-label">
            标题
          </label>
            <div tabindex="-1" class="token-field">
              <div tabindex="-1" class="token-field__input-container"><input type="text" autocapitalize="none"
                                                                             autocomplete="off" value=""
                                                                             placeholder="请输入标题" size="1"
                                                                             class="token-field__input"></div>
              <ul tabindex="-1" class="token-field__suggestions-list"></ul>
            </div>
          </div>
          <fieldset class="form-fieldset"><label for="role" class="form-label">
            作者
          </label><select id="_role" name="role" class="form-select">
            <option value="administrator">Basil(佰晟）</option>
            <option value="editor">叶青</option>
            <option value="author">亚南</option>
            <option value="contributor">贡献者</option>
            <option value="follower">粉丝</option>
          </select>
            <p class="form-setting-explanation">
              <a target="_blank" rel="noopener noreferrer"
                 href="http://en.support.wordpress.com/user-roles/">
                <svg version="1.1" role="presentation" width="12.571428571428571" height="16" viewBox="0 0 1408 1792"
                     class="gridicon">
                  <path
                    d="M1408 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
                  
                </svg>
                <span>
                添加作者
              </span>
              </a></p>
          </fieldset>
          <fieldset class="form-fieldset"><label for="message" class="form-label">
            内容介绍
          </label>
            <div class="counted-textarea"><textarea name="message" id="_message" maxlength="500" placeholder=""
                                                    class="counted-textarea__input form-textarea"></textarea>
              <div class="counted-textarea__count-panel">
                0 个字
              </div>
            </div>
          </fieldset>
        </form>
      </foldable-card>

      <card>
        <div class="color-list">
          <div
            class="color-item"
            v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
            :key="color.text">
            {{color.text}}
          </div>
        </div>
      </card>
    </div>
  </main>
</template>

<script>
  /* eslint-disable quotes */

  import EditorSidebar from '~/components/editor/sidebar'
  import HeaderCake from '~/components/header-cake'
  import FoldableCard from '~/components/foldable-card'

  export default {
    data () {
      return {
        post: {
          title: '无标题',
          content: ''
        },
        colors: [{
          text: "Aquamarine"
        }, {
          text: "Hotpink"
        }, {
          text: "Gold"
        }, {
          text: "Crimson"
        }, {
          text: "Blueviolet"
        }, {
          text: "Lightblue"
        }, {
          text: "Cornflowerblue"
        }, {
          text: "Skyblue"
        }, {
          text: "Burlywood"
        }]
      }
    },
    props: {},
    components: {
      EditorSidebar,
      HeaderCake,
      FoldableCard
    },
    computed: {
      wordCount () {
        return this._wordCount(this.post.content)
      }
    },
    methods: {
      test () {
        console.log('llalalla')
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

<style>
</style>
