<template>
  <transition name="fade">
    <div :class="classes" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" v-clickoutside="handleClose">
      <div class="popover__arrow"></div>
      <div class="popover__inner">
        <slot></slot>
      </div>
    </div>
  </transition>

</template>
<script>
  import Popper from '../base/popper'
  import clickoutside from '../../directives/clickoutside'
  import TransferDom from '../../directives/transfer-dom'
  import {oneOf} from '../../utils/assist'

  export default {
    name: 'Poptip',
    mixins: [Popper],
    directives: {clickoutside, TransferDom},
    props: {
      trigger: {
        validator (value) {
          return oneOf(value, ['click', 'focus', 'hover'])
        },
        default: 'click'
      },
      position: {
        type: String,
        validator (value) {
          return oneOf(value, [
            'top',
            'top right',
            'right',
            'bottom right',
            'bottom',
            'bottom left',
            'left',
            'top left'
          ])
        },
        default: 'top'
      },
      title: {
        type: [String, Number]
      },
      content: {
        type: [String, Number],
        default: ''
      },
      width: {
        type: [String, Number]
      },
      transfer: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          'popover',
          'tooltip',
          `is-${this.position.replace(/\s+/g, '-')}`
        ]
      },
      styles () {
        // eslint-disable-next-line prefer-const
        let style = {}
        if (this.width) {
          style.width = `${this.width}px`
        }
        return style
      }
    },
    methods: {
      handleClick () {
        if (this.trigger !== 'click') {
          return false
        }
        console.log('lalal onclick')
        console.log(this.visible + '----')
        this.visible = !this.visible
      },
      handleClose () {
        if (this.trigger !== 'click') {
          return false
        }
        this.visible = !this.visible
      },
      handleFocus () {
        if (this.trigger !== 'focus') {
          return false
        }
        this.visible = true
      },
      handleBlur () {
        if (this.trigger !== 'focus') {
          return false
        }
        this.visible = false
      },
      handleMouseenter () {
        if (this.trigger !== 'hover') {
          return false
        }
        if (this.enterTimer) {
          clearTimeout(this.enterTimer)
        }
        this.enterTimer = setTimeout(() => {
          this.visible = true
        }, 100)
      },
      handleMouseleave () {
        if (this.trigger !== 'hover') {
          return false
        }
        if (this.enterTimer) {
          clearTimeout(this.enterTimer)
          this.enterTimer = setTimeout(() => {
            this.visible = false
          }, 100)
        }
      },
      cancel () {
        this.visible = false
        this.$emit('on-cancel')
      },
      ok () {
        this.visible = false
        this.$emit('on-ok')
      }
    }
  }
</script>
