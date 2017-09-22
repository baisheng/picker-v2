<!--<template>
  <div v-show="active">
    <div ref="popover" class="popover" :class="repostion.positionClass" :style="getStylePosition">
      <div class="popover__arrow"></div>
      <div class="popover__inner">
        <div role="menu" class="popover__menu" tabindex="-1">
          <button role="menuitem" tabindex="-1" class="popover__menu-item">
            <svg class="gridicon gridicons-pencil" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path>
              </g>
            </svg>&lt;!&ndash; react-text: 10 &ndash;&gt;编辑&lt;!&ndash; /react-text &ndash;&gt;</button>
          <button role="menuitem" tabindex="-1" class="popover__menu-item">
            <svg class="gridicon gridicons-visible" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M12 6C5.188 6 1 12 1 12s4.188 6 11 6 11-6 11-6-4.188-6-11-6zm0 10c-3.943 0-6.926-2.484-8.38-4 1.04-1.085 2.863-2.657 5.255-3.47C8.335 9.214 8 10.064 8 11c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.937-.335-1.787-.875-2.47 2.393.813 4.216 2.386 5.254 3.47-1.456 1.518-4.438 4-8.38 4z"></path>
              </g>
            </svg>&lt;!&ndash; react-text: 15 &ndash;&gt;查看页面&lt;!&ndash; /react-text &ndash;&gt;</button>
          <button role="menuitem" tabindex="-1" class="popover__menu-item">
            <svg class="gridicon gridicons-stats needs-offset" height="18" width="18"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path
                  d="M19 3H5c-1.105 0-2 .895-2 2v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm0 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2V7h2v10zm4 0h-2v-7h2v7z"></path>
              </g>
            </svg>&lt;!&ndash; react-text: 20 &ndash;&gt;统计&lt;!&ndash; /react-text &ndash;&gt;</button>
          <a role="menuitem" tabindex="-1" href="/page/bluepx.wordpress.com?copy=1" class="popover__menu-item">
            <svg class="gridicon gridicons-clipboard" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M16 18H8v-2h8v2zm0-6H8v2h8v-2zm2-9h-2v2h2v15H6V5h2V3H6c-1.105 0-2 .895-2 2v15c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm-4 2V4c0-1.105-.895-2-2-2s-2 .895-2 2v1c-1.105 0-2 .895-2 2v1h8V7c0-1.105-.895-2-2-2z"></path>
              </g>
            </svg>&lt;!&ndash; react-text: 25 &ndash;&gt;复制&lt;!&ndash; /react-text &ndash;&gt;</a>
          <hr class="popover__menu-separator">
          <button role="menuitem" tabindex="-1" class="popover__menu-item page__trash-item">
            <svg class="gridicon gridicons-trash needs-offset-y" height="18" width="18"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path
                  d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
              </g>
            </svg>&lt;!&ndash; react-text: 31 &ndash;&gt;回收站&lt;!&ndash; /react-text &ndash;&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>-->
<script>
  import { events } from './bus'
  let poputil = {}
  if (process.browser) {
    poputil = require('~/components/popover/util')
  }
  export default {
    data () {
      return {
        visiable: false,
        positionClass: '',
        position: {
          left: 0,
          top: 0
        }
      }
    },
    name: 'Popover',
    render (createElement) {
      if (!this.visiable) {
        return
      }

      return createElement('div', {
        class: this.classes
      }, [
        createElement(
          'div', {
            class: 'popover__arrow'
          }
        ),
        createElement('div', {
            class: 'popover__inner'
          },
          this.$slots.default
        )
      ])
    },
    computed: {
      classes () {
        return [
          'popover'
        ]
      },
      style () {
        return {
          ...this.repostion
        }
      }
    },
    methods: {
      getStylePosition () {
        const {left, top} = this.repostion
//        console.log(this.repostion)
        return `left: ${left}px; top: ${top}px;`
      },
      computePosition (event, podcast) {
        this.curId = podcast.id
        let suggestedPosition = this.position
//        console.log(suggestedPosition)
        const domContainer = this.$refs.popover
//        console.log(domContainer)
        suggestedPosition = poputil.suggested(suggestedPosition, domContainer, event.target)
        const repostion = Object.assign({}, poputil.constrainLeft(poputil.offset(suggestedPosition, domContainer, event.target), domContainer), {
          positionClass: this.getPositionClass(suggestedPosition)
        })
//        console.log(repostion)
        this.repostion = repostion
        this.active = true

//        return repostion
      },
      setPosition () {

      },
      getPositionClass (position = this.position) {
        return `is-${position.replace(/\s+/g, '-')}`;
      }
    }
  }
</script>
