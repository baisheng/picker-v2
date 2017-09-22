<template>
  <h2 class="sidebar__heading" @click="handleClick">
    <slot></slot>
  </h2>
</template>
<script>
  export default {
    methods: {
      handleClick (event) {
        this.$emit('on-click', event)
      }
    }
  }
</script>
