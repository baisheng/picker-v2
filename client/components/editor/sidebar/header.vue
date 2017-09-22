<template>
  <div class="editor-sidebar__header">
    <span class="editor-post-type">
      文章设置
      <span class="post-status is-draft">
        <span class="post-status__text">草稿</span>
      </span>
    </span>
    <button class="button editor-sidebar__back is-compact is-borderless" title="关闭边栏" type="button" @click="handleClick">
      <icon name="close" class="gridicon"></icon>
      <!--<svg class="gridicon gridicons-cross" height="24" width="24" xmlns="http://www.w3.org/2000/svg"-->
           <!--viewBox="0 0 24 24">-->
        <!--<g>-->
          <!--<path-->
            <!--d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>-->
        <!--</g>-->
      <!--</svg>-->
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '关闭边栏'
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    }
  }
</script>
