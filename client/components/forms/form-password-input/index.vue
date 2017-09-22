<template>
  <div class="form-password-input">
    <form-text-input
      autocomplete="off"
      ref="textField"
      :type="hidden ? 'password' : 'text'"
    >
    </form-text-input>
    <span :class="toggleVisibilityClasses" @click="togglePasswordVisibility">
      <icon :name="hidden ? 'eye-slash' : 'eye'" class="gridicon"></icon>
    </span>
  </div>
</template>
<script>
  import FormTextInput from '~/components/forms/form-text-input'
  export default {
    name: 'FormPasswordInput',
    props: {
      hideToggle: Boolean
    },
    data () {
      return {
        hidePassword: true
      }
    },
    components: {
      FormTextInput
    },
    methods: {
      togglePasswordVisibility () {
        this.hidePassword = !this.hidePassword
      }
    },
    computed: {
      hidden () {
        if (this.hideToggle) {
          return true
        }
        return this.hidePassword
      },
      toggleVisibilityClasses () {
        return [{
          'form-password-input__toggle': true,
          'form-password-input__toggle-visibility': !this.hideToggle
        }]
      }
    }
  }
</script>
