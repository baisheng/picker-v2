<template>
  <div class="editor-sidebar">
    <sidebar-header></sidebar-header>

    <div class="editor-action-bar">
      <div class="editor-action-bar__cell is-left"><span class="editor-status-label is-draft is-plain">新草稿</span>
      </div>
      <div class="editor-action-bar__cell is-center">
        <div class="editor-author">
              <span>
                <span class="author-selector__author-toggle" tabindex="-1"><img
                  alt="bluepx" class="gravatar"
                  src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm" width="26"
                  height="26"><span
                  class="editor-author__name">作者：bluepx</span>

              <svg class="gridicon gridicons-chevron-down" height="16"
                   width="16" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"><g><path
                d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></span>
                <!-- react-empty: 2710 --></span>
        </div>
      </div>
      <div class="editor-action-bar__cell is-right"></div>
    </div>

    <div class="sidebar__region editor-sidebar__parent-region">
      <div class="editor-drawer"><!-- react-empty: 2539 --><!-- react-empty: 2540 -->
        <accoridion title="状态">
          <div class="edit-post-status"><span class="edit-post-status__full-date"><svg
            class="gridicon gridicons-time needs-offset" height="18" width="18"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
            d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.8 13.4L13 11.667V7h-2v5.333l3.2 4.266 1.6-1.2z"></path></g></svg>
            <!-- react-text: 2556 -->2017年9月2日 早上6点27分<!-- /react-text --><!-- react-empty: 2557 -->
            <!-- react-empty: 2558 --></span><label class="edit-post-status__pending-review"><span
            class="edit-post-status__label-text"><!-- react-text: 2561 -->待审核<!-- /react-text --><span
            class="info-popover"><svg class="gridicon gridicons-info-outline needs-offset" height="18"
                                      width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
            d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
            <!-- react-empty: 2566 --></span></span><span class="form-toggle__wrapper"><input type="checkbox"
                                                                                              id="toggle-4"
                                                                                              class="form-toggle is-compact"
                                                                                              readonly=""
                                                                                              value="on"><label
            class="form-toggle__label" for="toggle-4"><span class="form-toggle__switch" role="checkbox"
                                                            aria-checked="false" aria-label="请求查看文章"
                                                            tabindex="0"></span><span
            class="form-toggle__label-content"></span></label></span></label>
            <div class="editor-visibility">
              <button type="button" class="button is-compact is-borderless">
                <svg class="gridicon gridicons-visible" height="24" width="24"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 6C5.188 6 1 12 1 12s4.188 6 11 6 11-6 11-6-4.188-6-11-6zm0 10c-3.943 0-6.926-2.484-8.38-4 1.04-1.085 2.863-2.657 5.255-3.47C8.335 9.214 8 10.064 8 11c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.937-.335-1.787-.875-2.47 2.393.813 4.216 2.386 5.254 3.47-1.456 1.518-4.438 4-8.38 4z"></path>
                  </g>
                </svg><!-- react-text: 2577 --> <!-- /react-text --><!-- react-text: 2578 -->public
                <!-- /react-text --><!-- react-empty: 2579 --></button>
            </div><!-- react-empty: 2580 --></div>
        </accoridion>
        <div class="editor-drawer__taxonomies"><!-- react-empty: 2582 --></div>

        <accoridion title="特色图片" subtitle="featured-image">
          <div class="editor-drawer-well is-empty">
            <div class="editor-drawer-well__content">
              <div class="editor-featured-image"><!-- react-empty: 2724 -->
                <button class="button editor-featured-image__current-image is-compact is-borderless"
                        type="button">
                  <svg class="gridicon gridicons-pencil editor-featured-image__edit-icon" height="24" width="24"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g>
                      <path
                        d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <button class="button editor-drawer-well__remove is-compact" type="button"><span
                class="screen-reader-text">移除</span>
                <svg class="gridicon gridicons-cross editor-drawer-well__remove-icon" height="24" width="24"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button type="button" class="editor-drawer-well__placeholder"><span
              class="editor-drawer-well__button button is-secondary is-compact">设为特色图像</span></button>
            <div class="drop-zone editor-featured-image__dropzone">
              <div class="drop-zone__content">
                <div><span class="drop-zone__content-icon"><svg width="55" height="42" viewBox="0 0 55 42"
                                                                xmlns="http://www.w3.org/2000/svg"><title>Featured Image</title><g
                  fill-rule="nonzero" fill="#542B06"><path
                  d="M22 11c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm18-7v12.33l-3.173 8.29-12.01.637L31.992 32H4c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h32c2.21 0 4 1.79 4 4zm-4 0H4v14.888L12 10l11.79 13.1 3.174-3.7c1.596-1.864 4.48-1.864 6.074 0L36 22.852V4z"></path><path
                  d="M41 16.667l3.443 9.27 9.89.406-7.762 6.136L49.24 42 41 36.52 32.76 42l2.67-9.52-7.763-6.14 9.89-.404"></path></g></svg></span><span
                  class="drop-zone__content-text">设为推荐图片</span></div>
              </div>
            </div>
          </div>
        </accoridion>

        <accoridion title="属性">
          <section class="accordion__section editor-page-parent">
            <label class="form-label"><span
              class="editor-page-parent__label-text">父页</span></label><label
            class="editor-page-parent__top-level form-label"><span
            class="editor-page-parent__top-level-label">顶级页面</span><span
            class="form-toggle__wrapper"><input type="checkbox" id="toggle-5" class="form-toggle is-compact"
                                                readonly="" value="on"><label class="form-toggle__label"
                                                                              for="toggle-5"><span
            class="form-toggle__switch" role="checkbox" aria-checked="true" aria-label="切换即可将页面设为顶级"
            tabindex="0"></span><span class="form-toggle__label-content"></span></label></span></label>
            <div class="post-selector is-compact"><!-- react-empty: 2605 -->
              <div class="post-selector__results" style="position: relative;">
                <div style="overflow: visible; width: 0px;">
                  <div aria-label="grid" class="ReactVirtualized__Grid ReactVirtualized__List" role="grid"
                       tabindex="0"
                       style="box-sizing: border-box; direction: ltr; height: 25px; position: relative; width: 238px; will-change: transform; overflow: hidden;">
                    <div class="ReactVirtualized__Grid__innerScrollContainer"
                         style="width: auto; height: 25px; max-width: 238px; max-height: 25px; overflow: hidden; position: relative;">
                      <div style="height: 25px; left: 0px; position: absolute; top: 0px; width: 100%;">
                        <div class="post-selector__list-item"><label><input type="radio" name="posts" value="1"
                                                                            class="post-selector__input"><span
                          class="post-selector__label"><!-- react-text: 2687 -->About
                          <!-- /react-text --></span></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="resize-triggers">
                  <div class="expand-trigger">
                    <div style="width: 239px; height: 26px;"></div>
                  </div>
                  <div class="contract-trigger"></div>
                </div>
              </div>
            </div>
          </section>
          <div><!-- react-empty: 2610 --></div>
          <section class="accordion__section editor-page-order"><label><span
            class="editor-page-order__label-text">顺序</span><input type="number" value="0" pattern="[0-9]*"
                                                                  class="form-text-input editor-page-order__input"></label>
          </section>
        </accoridion>
        <accoridion title="共享" class="editor-sharing__accordion has-status">
          <a href="/sharing/bluepx.wordpress.com" class="accordion__status is-warning" slot="status">
            <svg class="gridicon gridicons-notice" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2l-.5-6h3l-.5 6z"></path>
              </g>
            </svg><!-- react-empty: 2758 -->
          </a>
          <section class="accordion__section">
            <div class="editor-sharing"><!-- react-empty: 2764 -->
              <fieldset class="editor-fieldset editor-sharing__sharing-like-options">
                <legend class="editor-fieldset__legend">共享按钮和赞</legend>
                <div class="editor-fieldset__option"><label><input type="checkbox" name="sharing_enabled"
                                                                   class="form-checkbox"
                                                                   value="on"><span>显示共享按钮</span></label></div>
                <div class="editor-fieldset__option"><label><input type="checkbox" name="likes_enabled"
                                                                   class="form-checkbox"
                                                                   value="on"><span>显示赞按钮</span></label></div>
              </fieldset>
            </div>
          </section>

        </accoridion>

        <accoridion title="更多">
          <section class="accordion__section editor-more-options__slug"><label
            class="editor-drawer__label"><span class="editor-drawer__label-text"><!-- react-text: 2629 -->别名
            <!-- /react-text --><span class="info-popover"><svg
              class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
              d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
              <!-- react-empty: 2634 --></span></span>
            <div class="editor-slug editor-more-options__slug-field"><span
              class="editor-slug__url-path"></span><input
              type="text" value="" aria-label="输入数据域" class="form-text-input"></div>
          </label></section>
          <section class="accordion__section"><label class="editor-drawer__label"><span
            class="editor-drawer__label-text"><!-- react-text: 2641 -->摘要<!-- /react-text --><span
            class="info-popover"><svg class="gridicon gridicons-info-outline needs-offset" height="18"
                                      width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
            d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
            <!-- react-empty: 2646 --></span></span><textarea id="excerpt" name="excerpt" placeholder="编写摘录…"
                                                              aria-label="编写摘录…"
                                                              class="form-textarea"></textarea></label>
          </section>
          <section class="accordion__section"><label class="editor-drawer__label"><span
            class="editor-drawer__label-text"><!-- react-text: 2651 -->位置<!-- /react-text --></span></label>
            <div class="editor-location">
              <div class="editor-drawer-well is-empty">
                <div class="editor-drawer-well__content">
                  <button class="button editor-drawer-well__remove is-compact" type="button"><span
                    class="screen-reader-text">移除</span>
                    <svg class="gridicon gridicons-cross editor-drawer-well__remove-icon" height="24" width="24"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <button type="button" class="editor-drawer-well__placeholder">
                  <svg class="gridicon gridicons-location editor-drawer-well__icon" height="24" width="24"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g>
                      <path
                        d="M19 9c0-3.866-3.134-7-7-7S5 5.134 5 9c0 1.387.41 2.677 1.105 3.765h-.008C8.457 16.46 12 22 12 22l5.903-9.235h-.007C18.59 11.677 19 10.387 19 9zm-7 3c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>
                    </g>
                  </svg>
                  <span class="editor-drawer-well__button button is-secondary is-compact">获取当前位置</span></button>
              </div>
              <div class="editor-location__search">
                <div class="card search-card">
                  <div class="is-open is-compact has-open-icon search" role="search">
                    <div class="spinner" style="">
                      <svg class="spinner__image" width="20" height="20" viewBox="0 0 100 100">
                        <defs>
                          <mask id="maskBorder19">
                            <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                            <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
                          </mask>
                          <mask id="maskDonut19">
                            <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                            <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
                            <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
                          </mask>
                          <mask id="maskLeft19">
                            <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
                          </mask>
                          <mask id="maskRight19">
                            <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
                          </mask>
                        </defs>
                        <circle class="spinner__border" r="50%" cx="50%" cy="50%"
                                mask="url( #maskBorder19 )"></circle>
                        <g mask="url( #maskDonut19 )">
                          <g mask="url( #maskLeft19 )">
                            <rect class="spinner__progress is-left" x="0" y="0" width="50%"
                                  height="100%"></rect>
                          </g>
                          <g mask="url( #maskRight19 )">
                            <rect class="spinner__progress is-right" x="50%" y="0" width="50%"
                                  height="100%"></rect>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="search__icon-navigation" aria-controls="search-component-5" aria-label="打开“搜索”">
                      <svg class="gridicon gridicons-search search__open-icon" height="24" width="24"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g>
                          <path
                            d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
                        </g>
                      </svg>
                    </div>
                    <div class="search__input-fade"><input type="search" id="search-component-5"
                                                           class="search__input" placeholder="搜索…" role="search"
                                                           value="" aria-label="搜索" aria-hidden="false"
                                                           autocapitalize="none"></div>
                  </div>
                </div>
                <ul class="editor-location__search-results"></ul>
              </div>
            </div>
          </section>
          <section class="accordion__section">
            <fieldset class="editor-fieldset">
              <legend class="editor-fieldset__legend">讨论</legend>
              <div class="editor-fieldset__option"><label><input type="checkbox" name="comment_status"
                                                                 class="form-checkbox" value="on"><span><!-- react-text: 2826 -->允许评论
                <!-- /react-text --><span class="info-popover editor-comment_status__info"><svg
                  class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                  d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
                  <!-- react-empty: 2831 --></span></span></label></div>
              <div class="editor-fieldset__option"><label><input type="checkbox" name="ping_status"
                                                                 class="form-checkbox" value="on"><span>允许 Pingback 和 Trackback</span></label>
              </div>
            </fieldset>
          </section>
          <section class="accordion__section editor-more-options__copy-post"><label
            class="editor-drawer__label"><span class="editor-drawer__label-text"><!-- react-text: 2658 -->复制页面
            <!-- /react-text --><span class="info-popover"><svg
              class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
              d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
              <!-- react-empty: 2663 --></span></span>
            <button type="button" class="button is-compact is-borderless">
              <svg class="gridicon gridicons-clipboard" height="24" width="24"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M16 18H8v-2h8v2zm0-6H8v2h8v-2zm2-9h-2v2h2v15H6V5h2V3H6c-1.105 0-2 .895-2 2v15c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm-4 2V4c0-1.105-.895-2-2-2s-2 .895-2 2v1c-1.105 0-2 .895-2 2v1h8V7c0-1.105-.895-2-2-2z"></path>
                </g>
              </svg><!-- react-text: 2668 -->选择要复制的页面<!-- /react-text --></button>
          </label><!-- react-empty: 2669 --></section>
        </accoridion>
      </div>
    </div>
    <div class="sidebar__region editor-sidebar__nested-region"></div>
    <div class="sidebar__footer"><!-- react-empty: 2672 --><a class="button sidebar__footer-help is-borderless"
                                                              href="/help" title="帮助">
      <svg class="gridicon gridicons-help-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 8c0-2.21-1.79-4-4-4s-4 1.79-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2c-.552 0-1 .448-1 1v2h2v-1.14c1.722-.447 3-1.998 3-3.86zm-3 6h-2v2h2v-2z"></path>
        </g>
      </svg>
    </a></div>
  </div>
</template>
<script>
  import SidebarHeader from './header.vue'
  import StatusLabel from '../status-label'
  import Accoridion from '../../accordion'

  export default {
    components: {
      SidebarHeader,
      StatusLabel,
      Accoridion
    },
    methods: {
      headerToggleSidebar (event) {
        console.log('toggle sidebar event')
        this.$emit('toggleSidebar', event)
      }
    }
  }
</script>
