<template>
  <div class="editor-action-bar">
    <div class="editor-action-bar__cell is-left">
        <span class="editor-status-label is-draft is-plain">
          已在 13 分钟前
          <strong>保存</strong>
        </span>
    </div>
    <div class="editor-action-bar__cell is-center">
      <div class="editor-author">
          <span>
          <span class="author-selector__author-toggle" tabindex="-1">
          <img alt="bluepx"
               class="gravatar"
               src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm"
               width="26"
               height="26">
            <span class="editor-author__name">作者：bluepx</span>
            <svg class="gridicon gridicons-chevron-down" height="16"
                 width="16" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"><g><path
              d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></span>
            <!-- react-empty: 2149 -->
          </span>
      </div>
    </div>
    <div class="editor-action-bar__cell is-right">
      <button class="button editor-sticky is-borderless" aria-label="将文章固定到头版" type="button">
        <svg class="gridicon gridicons-bookmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path d="M17 3H7c-1.105 0-2 .896-2 2v16l7-4 7 4V5c0-1.104-.896-2-2-2z"></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      isNew: Boolean,
      post: Object,
      savedPost: Object,
      site: Object,
      type: String,
      isPostPrivate: Boolean,
      postAuthor: Object
    }
  }
</script>
