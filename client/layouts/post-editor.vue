<template>
  <div class="layout is-group-editor is-section-post-editor focus-sidebar">
    <masterbar-logged-in :title="title" :sectionName="name"/>
    <div id="content" class="layout__content">
      <div id="primary" class="layout__primary">
        <nuxt/>
      </div>
      <div id="secondary" class="layout__secondary"></div>
    </div>
  </div>
</template>

<script>
  import MasterbarLoggedIn from './masterbar/logged-in.vue'
  export default {
    name: 'logged-out',
    props: {
      title: String,
      name: String
    },
    components: {
      MasterbarLoggedIn
    },
    computed: {
    }
  }
</script>
