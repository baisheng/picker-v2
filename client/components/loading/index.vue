<template>
  <div :class="classes" v-if="loading">
    <pulsing-dot :active="true"></pulsing-dot>
  </div>
</template>
<script>
  import PulsingDot from '~/components/pulsing-dot'

  export default {
    data: () => ({
      loading: false
    }),
    components: {
      PulsingDot
    },
    computed: {
      classes () {
        return [
          'layout__loader',
          'is-active'
//          {
//            'is-active': !!this.loading
//          }
        ]
      }
    },
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    }
  }
</script>
