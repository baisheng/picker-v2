<template>
  <div>

    <div id="pages" class="pages__page-list">
      <div class="card page is-compact" v-for="podcast in list">
        <div class="page__main">
          <nuxt-link class="page__title" :to="`/podcast/${podcast.id}`" :title="podcast.title">
            {{ podcast.title }}
          </nuxt-link>
          <div class="page-card-info">
            <div>
                <span class="page-card-info__item">
                <svg class="gridicon gridicons-time page-card-info__item-icon"
                     height="12" width="12" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"><g><path
                  d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.8 13.4L13 11.667V7h-2v5.333l3.2 4.266 1.6-1.2z"></path></g></svg><span
                  class="page-card-info__item-text">{{ $moment(podcast.modified).fromNow() }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="post-type-list__post-thumbnail-wrapper has-image">
          <img :src="podcast.featured_image" class="post-type-list__post-thumbnail" v-if="podcast.featured_image">
        </div>
        <svg class="gridicon gridicons-ellipsis ellipsis-menu__toggle-icon page__actions-toggle"
             :class="podcast.id === curId && active ? 'is-active' : ''" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="computePosition($event, podcast)"
             slot="face">
          <g>
            <path
              d="M7 12c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm12-2c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-7 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"></path>
          </g>
        </svg>
        <span></span>
      </div>
    </div>

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
              </svg><!-- react-text: 10 -->编辑<!-- /react-text --></button>
            <button role="menuitem" tabindex="-1" class="popover__menu-item">
              <svg class="gridicon gridicons-visible" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M12 6C5.188 6 1 12 1 12s4.188 6 11 6 11-6 11-6-4.188-6-11-6zm0 10c-3.943 0-6.926-2.484-8.38-4 1.04-1.085 2.863-2.657 5.255-3.47C8.335 9.214 8 10.064 8 11c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.937-.335-1.787-.875-2.47 2.393.813 4.216 2.386 5.254 3.47-1.456 1.518-4.438 4-8.38 4z"></path>
                </g>
              </svg><!-- react-text: 15 -->查看页面<!-- /react-text --></button>
            <button role="menuitem" tabindex="-1" class="popover__menu-item">
              <svg class="gridicon gridicons-stats needs-offset" height="18" width="18"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M19 3H5c-1.105 0-2 .895-2 2v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm0 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2V7h2v10zm4 0h-2v-7h2v7z"></path>
                </g>
              </svg><!-- react-text: 20 -->统计<!-- /react-text --></button>
            <a role="menuitem" tabindex="-1" href="/page/bluepx.wordpress.com?copy=1" class="popover__menu-item">
              <svg class="gridicon gridicons-clipboard" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M16 18H8v-2h8v2zm0-6H8v2h8v-2zm2-9h-2v2h2v15H6V5h2V3H6c-1.105 0-2 .895-2 2v15c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm-4 2V4c0-1.105-.895-2-2-2s-2 .895-2 2v1c-1.105 0-2 .895-2 2v1h8V7c0-1.105-.895-2-2-2z"></path>
                </g>
              </svg><!-- react-text: 25 -->复制<!-- /react-text --></a>
            <hr class="popover__menu-separator">
            <button role="menuitem" tabindex="-1" class="popover__menu-item page__trash-item">
              <svg class="gridicon gridicons-trash needs-offset-y" height="18" width="18"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
                </g>
              </svg><!-- react-text: 31 -->回收站<!-- /react-text --></button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  //  import getBoundingClientRect from 'bounding-client-rect';
  //  import Popover from '~/components/popover'
  //  import Vue from 'vue'
  //  const isServer = Vue.prototype.$isServer
  //  const Popper = isServer ? function () {

  //  if (process.browser) {
  //    require('~/plugins/popover')
  //  }
  let poputil = {}
  if (process.browser) {
    poputil = require('~/components/popover/util')
  }
  //  import poputil from '~/plugins/popover'

  export default {
    props: {
      list: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        curId: 0,
        active: false,
        position: 'bottom left',
        repostion: {
          left: -99999,
          right: -99999
        }
      }
    },
    components: {
//      Popover
    },
    computed: {
      iconClasses () {
        return [
          {
            'is-active': this.active
          }
        ]
      },
      getStylePosition () {
        const {left, top} = this.repostion
        return `left: ${left}px; top: ${top}px;`
      }
    },
    methods: {
      showActions (podcast) {
        this.curId = podcast.id
        this.active = !this.active
      },
      computePosition (event, podcast) {
        this.curId = podcast.id
        this.active = !this.active

        let suggestedPosition = this.position
        const domContainer = this.$refs.popover
        suggestedPosition = poputil.suggested(suggestedPosition, domContainer, event.target)
        const repostion = Object.assign({}, poputil.constrainLeft(poputil.offset(suggestedPosition, domContainer, event.target), domContainer), {
          positionClass: this.getPositionClass(suggestedPosition)
        })
        this.repostion = repostion

      },
      setPosition () {

      },
      getPositionClass (position = this.position) {
        return `is-${position.replace(/\s+/g, '-')}`;
      }
    }
  }
</script>
