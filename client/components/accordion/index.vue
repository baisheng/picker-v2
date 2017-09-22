<template>
  <div :class="classes">
    <header class="accordion__header">

      <button type="button" class="accordion__toggle" @click="toggleExpanded">
        <span class="accordion__icon" v-if="icon"> {{ icon }}</span>
        <!--<icon v-if="icon" :name="icon" class="acction__icon"></icon>-->
        <span class="accordion__title">{{ title }}</span>
        <span v-if="subtitle" class="accordion__subtitle">{{ subtitle }}</span>
        <span class="accordion__arrow">
          <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               class="gridicon gridicons-dropdown"><g><path
            d="M7 10l5 5 5-5"></path></g></svg>
        </span>
      </button>
      <slot name="status"></slot>
      <!--<accordion-status></accordion-status>-->
    </header>
    <div class="accordion__content">
      <div class="accordion__content-wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Popover from '../../components/popover'
  export default {
    props: {
      initialExpanded: {
        type: Boolean,
        default: false
      },
      icon: String,
      title: String,
      subtitle: String,
      status: String
    },
    data () {
      return {
        isExpanded: false
      }
    },
    mounted () {
      this.isExpanded = this.initialExpanded
    },
    computed: {
      classes () {
        return [
          'accordion',
          {
            'is-expanded': this.isExpanded || this.forceExpand,
            'has-icon': !!this.icon,
            'has-subtitle': !!this.subtitle,
            'has-status': !!this.status
          }
        ]
      }
    },
    components: {
      Popover
    },
    methods: {
      toggleExpanded () {
        this.isExpanded = !this.isExpanded
      }
    }
  }
</script>
