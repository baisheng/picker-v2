<template>
  <input
    :ref=" inputRef || 'textField' "
    :class="classes"
    :type="type"
    @click="selectOnFocus"/>
</template>
<script>
  /* eslint-disable no-useless-return */
  import {oneOf} from '../../../utils/assist'

  export default {
    name: 'FormTextInput',
    props: {
      type: {
        validator (value) {
          return oneOf(value, ['text', 'textarea', 'password'])
        },
        default: 'text'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      name: {
        type: String
      },
      isError: Boolean,
      isValid: Boolean,
      className: String,
      inputRef: String
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    computed: {
      classes () {
        return [
          'form-text-input',
          this.className,
          {
            'is-error': this.isError,
            'is-valid': this.isValid
          }
        ]
      }
    },
    methods: {
      handleEnter (event) {
        this.$emit('on-enter', event)
      },
      handleKeydown (event) {
        this.$emit('on-keydown', event)
      },
      handleKeypress (event) {
        this.$emit('on-keypress', event)
      },
      handleKeyup (event) {
        this.$emit('on-keyup', event)
      },
      handleIconClick (event) {
        this.$emit('on-click', event)
      },
      handleFocus (event) {
        this.$emit('on-focus', event)
      },
      handleInput (event) {
        const value = event.target.value
        this.$emit('input', value)
        this.setCurrentValue(value)
        this.$emit('on-change', event)
      },
      handleChange (event) {
        this.$emit('on-input-change', event)
      },
      setCurrentValue (value) {
        if (value === this.currentValue) {
          return
        }
        this.currentValue = value
      },
      focus () {
        this.$refs.textField.focus()
      },
      selectOnFocus () {
      }
    }
  }
</script>
