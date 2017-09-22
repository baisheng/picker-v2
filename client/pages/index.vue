<template>
</template>
<script>
  export default {
    layout: 'dashboard',
    data () {
      return {
        collapsed: true
      }
    },
    middleware: 'authenticated',
    components: {},
    async fetch ({store}) {
      await store.dispatch('loadPosts')
    },
    computed: {
      orgId () {
        return this.$store.state.org.id
      },
      posts () {
        return this.$store.state.posts.list
      },
      options () {
        return this.$store.state.options.globalOption.data
      },
      classes () {
        return [
          'post-image',
          {
            'is-collapsed': this.collapsed
          }
        ]
      }
    },
    methods: {
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>
