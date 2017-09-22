<template>
  <img alt="altText" class="classes" src="avatarURL" width="size" height="size" />
</template>
<script>
  export default {
    props: {
      // The REST-API returns s=96 by default, so that is most likely to be cached
      imgSize: 96,
      size: 32
    },
    methods: {
      getResizedImageURL (imageURL) {
      }
    }
  }
</script>
