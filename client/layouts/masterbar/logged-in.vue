<template>
  <masterbar>
    <item icon="pagelines" :isActive="isActive" url="/">
      {{ org.meta.basic.name }}
    </item>
    <item icon="tint" class="masterbar__reader" url="/contents">
      内容市场
    </item>
    <div class="masterbar__publish">
      <a href="/podcast" title="创建新文章"
         class="masterbar__item masterbar__item-new">
        <svg class="gridicon gridicons-create" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M21 11v8c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h8l-2 2H5v14h14v-6l2-2zM7 17h3l7.5-7.5-3-3L7 14v3zm9.94-12.94L15.5 5.5l3 3 1.44-1.44c.585-.585.585-1.535 0-2.12l-.88-.88c-.585-.585-1.535-.585-2.12 0z"></path>
          </g>
        </svg>
        <span class="masterbar__item-content">
          添加节目
        </span>
      </a>
      <div>
        <button class="button masterbar__toggle-drafts is-compact is-borderless" title="最新草稿" type="button">
          <span class="count">3</span>
        </button>
      </div>
    </div>
    <item icon="user-circle" url="/me" class="masterbar__item-me">
    </item>
  </masterbar>
</template>

<script>
  import Masterbar from './masterbar.vue'
  import Item from './item.vue'

  export default {
    data () {
      return {
        isActive: true
      }
    },
    computed: {
      org () {
        return this.$store.state.org.detail.data
      }
    },
    components: {
      Masterbar,
      Item
    }
  }
</script>
