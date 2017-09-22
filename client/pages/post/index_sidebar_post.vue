<template>
  <div data-reactroot="" class="post-editor"><!-- react-empty: 2383 -->
    <div class="editor-confirmation-sidebar">
      <div class="editor-confirmation-sidebar__sidebar">
        <div class="editor-confirmation-sidebar__ground-control">
          <div class="editor-confirmation-sidebar__close">
            <button title="关闭边栏" aria-label="关闭边栏" type="button" class="button is-borderless">
              <svg class="gridicon gridicons-cross" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
                </g>
              </svg>
            </button>
          </div>
          <div class="editor-confirmation-sidebar__action">
            <button type="button" class="button">发布！</button>
          </div>
        </div>
      </div>
    </div>
    <div class="post-editor__inner">
      <div class="card editor-ground-control">

        <button class="button editor-ground-control__back is-borderless" href="" aria-label="返回" type="button">

          <svg class="gridicon gridicons-arrow-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </g>
          </svg>
        </button>

        <div class="site is-compact">
          <a class="site__content" href="https://bluepx.wordpress.com" target="_blank"
             title="查看站点 bluepx.wordpress.com" aria-label="查看站点 bluepx.wordpress.com">
            <div class="site-icon is-blank" style="height: 24px; width: 24px; line-height: 24px; font-size: 24px;">
              <svg class="gridicon gridicons-globe" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                </g>
              </svg>
            </div>
            <div class="site__info">
              <div class="site__title"><!-- react-text: 2437 -->bluepx<!-- /react-text --></div>
              <div class="site__domain">bluepx.wordpress.com</div>
            </div>
            <span class="site__home">
            <icon name="home" class="gridicon"></icon>
          </span></a>
        </div>

        <div class="editor-ground-control__status"><span class="editor-ground-control__save-status"></span></div>
        <div class="editor-ground-control__action-buttons">
          <button class="button editor-ground-control__preview-button is-borderless" disabled="" tabindex="4"
                  type="button">
            <svg class="gridicon gridicons-visible" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M12 6C5.188 6 1 12 1 12s4.188 6 11 6 11-6 11-6-4.188-6-11-6zm0 10c-3.943 0-6.926-2.484-8.38-4 1.04-1.085 2.863-2.657 5.255-3.47C8.335 9.214 8 10.064 8 11c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.937-.335-1.787-.875-2.47 2.393.813 4.216 2.386 5.254 3.47-1.456 1.518-4.438 4-8.38 4z"></path>
              </g>
            </svg><!-- react-text: 2450 --> <!-- /react-text --><span
            class="editor-ground-control__button-label">预览</span></button>
          <button class="button editor-ground-control__toggle-sidebar is-borderless" type="button">
            <svg class="gridicon gridicons-cog" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
              </g>
            </svg>
            <span class="editor-ground-control__button-label"><!-- react-text: 2457 --> <!-- /react-text --><span
              class="editor-post-type"><!-- react-text: 2459 -->页面设置<!-- /react-text --><!-- react-text: 2460 -->
              <!-- /react-text --><!-- react-empty: 2461 --></span></span></button>
          <div class="editor-ground-control__publish-combo">
            <button class="button editor-publish-button is-primary" disabled="" tabindex="5" type="button">发布</button>
            <button class="button editor-ground-control__time-button is-compact is-primary" aria-label="确定发布文章的日期和时间安排。"
                    aria-pressed="false" title="设置日期和时间" tabindex="6" type="button">
              <svg class="gridicon gridicons-calendar" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.105 0-2 .896-2 2v13c0 1.104.895 2 2 2h14c1.104 0 2-.896 2-2V6c0-1.104-.896-2-2-2zm0 15H5V8h14v11z"></path>
                </g>
              </svg>
              <span class="editor-ground-control__time-button-label">选择日期</span></button>
          </div><!-- react-empty: 2469 --></div>
      </div>
      <div class="post-editor__content">
        <div class="post-editor__content-editor">
          <div class="editor-action-bar">
            <div class="editor-action-bar__cell is-left">
              <span class="editor-status-label is-draft is-plain">新草稿</span>
            </div>
            <div class="editor-action-bar__cell is-center">
              <div class="editor-author">
                <span>
                  <span class="author-selector__author-toggle" tabindex="-1">
                    <img
                      alt="bluepx" class="gravatar"
                      src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm" width="26"
                      height="26"><span class="editor-author__name">作者：Basil</span><svg
                    class="gridicon gridicons-chevron-down" height="16" width="16" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"><g><path
                    d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg>
                  </span>
                </span>
              </div>
            </div>
            <div class="editor-action-bar__cell is-right"></div>
          </div>

          <div class="post-editor__site">
            <div class="site is-compact">
              <a class="site__content" href="https://bluepx.wordpress.com" target="_blank"
                 title="查看站点 bluepx.wordpress.com" aria-label="查看站点 bluepx.wordpress.com">
                <div class="site-icon is-blank" style="height: 24px; width: 24px; line-height: 24px; font-size: 24px;">
                  <icon name="globe" class="gridicon" style="fill: #fff; color: #fff;"></icon>
                </div>
                <div class="site__info">
                  <div class="site__title"><!-- react-text: 2487 -->bluepx<!-- /react-text --></div>
                  <div class="site__domain">bluepx.wordpress.com</div>
                </div>
                <span class="site__home">
                <icon name="home" class="gridicon"></icon>
              </span></a>
            </div>
            <span class="editor-status-label is-draft is-plain">新草稿</span>
          </div>
          <div class="post-editor__inner-content is-shown">
            <div class="editor-featured-image"><!-- react-empty: 2496 -->
              <button class="button editor-featured-image__current-image is-compact is-borderless" type="button">
                <svg class="gridicon gridicons-pencil editor-featured-image__edit-icon" height="24" width="24"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path>
                  </g>
                </svg>
              </button>
            </div>

            <div class="post-editor__header">
              <div class="editor-title">
                <textarea tabindex="1" class="textarea-autosize editor-title__input"
                          placeholder="标题" aria-label="编辑标题" rows="1"
                          style="overflow: hidden; word-wrap: break-word; height: 62px;"></textarea>
              </div>
              <div class="editor-slug">
                <svg class="gridicon gridicons-link" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M17 13H7v-2h10v2zm1-6h-1c-1.63 0-3.065.792-3.977 2H18c1.103 0 2 .897 2 2v2c0 1.103-.897 2-2 2h-4.977c.913 1.208 2.347 2 3.977 2h1c2.21 0 4-1.79 4-4v-2c0-2.21-1.79-4-4-4zM2 11v2c0 2.21 1.79 4 4 4h1c1.63 0 3.065-.792 3.977-2H6c-1.103 0-2-.897-2-2v-2c0-1.103.897-2 2-2h4.977C10.065 7.792 8.63 7 7 7H6c-2.21 0-4 1.79-4 4z"></path>
                  </g>
                </svg>
                <span class="editor-slug__url-path">https://bluepx.wordpress.com/</span>
                <input type="text" value=""
                       aria-label="输入数据域"
                       class="form-text-input">
              </div>



            </div>


            <hr class="post-editor__header-divider">
            <div>
              <textarea class="tinymce" id="tinymce-2" tabindex="2" aria-hidden="true"
                        style="display: none; overflow-x: hidden; word-wrap: break-word; overflow-y: visible;"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- Sidebar -->
      <editor-sidebar></editor-sidebar>
      <div class="editor-notice is-global"><!-- react-empty: 2680 --></div>
    </div>
  </div>
</template>

<script>
  import EditorSidebar from '~/components/editor/sidebar'

  export default {
    layout: 'post-editor',
    props: {},
    components: {
      EditorSidebar
    }
  }
</script>
