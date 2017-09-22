<template>

</template>
<script>
  export default {
    props: {},
    mounted () {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)
      this.renderChildren()
    },
    methods: {
      renderChildren () {
        document.getElementById('app').appendChild(this.container)
      }
    }
  }
</script>
