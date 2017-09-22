<template>
  <div class="is-expanded-to-container is-open has-open-icon search" role="search">
    <div class="spinner" style="">
      <svg class="spinner__image" width="20" height="20" viewBox="0 0 100 100">
        <defs>
          <mask id="maskBorder12">
            <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
            <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
          </mask>
          <mask id="maskDonut12">
            <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
            <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
            <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
          </mask>
          <mask id="maskLeft12">
            <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
          </mask>
          <mask id="maskRight12">
            <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
          </mask>
        </defs>
        <circle class="spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder12 )"></circle>
        <g mask="url( #maskDonut12 )">
          <g mask="url( #maskLeft12 )">
            <rect class="spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
          </g>
          <g mask="url( #maskRight12 )">
            <rect class="spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
          </g>
        </g>
      </svg>
    </div>
    <div class="search__icon-navigation" aria-controls="search-component-3" aria-label="打开“搜索”">
      <svg class="gridicon gridicons-search search__open-icon" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
        </g>
      </svg>
    </div>
    <div class="search__input-fade">
      <input type="search" id="search-component-3" class="search__input"
             placeholder="搜索已发布内容…" role="search" value="" aria-label="搜索"
             aria-hidden="false" autocapitalize="none">
    </div>
    <div class="search__icon-navigation" tabindex="0" aria-controls="search-component-3" aria-label="关闭“搜索”">
      <svg class="gridicon gridicons-cross search__close-icon" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      pinned: {
        type: Boolean,
        default: false
      },
      additionalClasses: String,
      initialValue: String,
      value: String,
      placeholder: String
    },
    methods: {}
  }
</script>
