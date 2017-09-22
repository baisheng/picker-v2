<style scoped>
  .fa-icon {
    width: auto;
    height: 1.5em; /* or any other relative font sizes */
  }
</style>
<template>
  <div :class="classes">
    <span>
      <icon :name="iconName" class="gridicon"></icon>
      <slot></slot>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'FormInputValidation',
    props: {
      isError: Boolean,
      isWarning: Boolean
    },
    computed: {
      classes () {
        return [
          'form-input-validation',
          {
            'is-warning': this.isWarning,
            'is-error': this.isError
          }
        ]
      },
      iconName () {
        return this.isError || this.isWarning ? 'exclamation-circle' : 'exclamation-triangle'
      }
    }
  }
</script>
