<template>
  <main :class="classes">
    <slot></slot>
  </main>
</template>

<script>
  export default {
    name: 'Main',
    props: {
      className: String,
      wideLayout: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          this.className,
          'main',
          {
            'is-wide-layout': this.wideLayout
          }
        ]
      }
    }
  }
</script>
