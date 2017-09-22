<template>
  <div class="sidebar__footer">
    <slot></slot>
    <button class="sidebar__footer-help" href="/help" title="帮助"></button>
  </div>
</template>
<script>
  import Button from '~/components/button'
  export default {
    components: {
      Button
    }
  }
</script>
