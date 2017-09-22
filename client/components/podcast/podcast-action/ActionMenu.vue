<template>
  <svg class="gridicon gridicons-ellipsis page__actions-toggle" :class="classes" height="24" width="24"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="showActions">
    <g>
      <path
        d="M7 12c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm12-2c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-7 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"></path>
    </g>
  </svg>
</template>
<script>
  export default {
    data () {
      return {
        active: false
      }
    },
    computed: {
      classes () {
        return [
          {
            'is-active': this.active
          }
        ]
      }
    },
    methods: {
      showActions () {
        this.active = true
      }
    }
  }
</script>
