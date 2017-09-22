<template>
  <masterbar>
    <item icon="home" isActive="true" url="http://www.baidu.com">
    </item>
    <item icon="heart">
      内容市场
    </item>
    <item>
    </item>
  </masterbar>
</template>

<script>
  import Masterbar from './masterbar.vue'
  import Item from './item.vue'
  export default {
    components: {
      Masterbar,
      Item
    }
  }
</script>
