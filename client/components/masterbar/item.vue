<template>
  <a :href="url" :class="classes" :isActive="isActive">
    <slot name="icon"></slot>
    <icon :name="icon" v-if="icon" class="gridicon"></icon>
    <span class="masterbar__item-content">
      <slot></slot>
    </span>
  </a>
</template>
<script>
  export default {
    name: 'Item',
    props: {
      url: String,
      tooltip: String,
      className: String,
      icon: String,
      isActive: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    computed: {
      classes () {
        return [
          'masterbar__item',
          this.className,
          {
            'is-active': !!this.isActive
          }
        ]
      }
    }
  }
</script>
