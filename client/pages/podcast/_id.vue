<template>
  <main data-reactroot="" class="connected-applications main" role="main">

    <!-- Navbar -->
    <header-cake compact backHref="/podcast/home">
      <span v-if="podcast.id">更新内容</span>
      <span v-else>添加内容</span>
    </header-cake>
    <!-- Header -->
    <podcast-header :podcast="podcast" @featured_image_upload="save"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast="podcast" @content_update="save"></podcast-content-form>

    <episode-list :list="episodes" :podcast="podcast" @podcast_item_update="update"></episode-list>
    <!--<playlist :episodes="episodes" @podcast_item_update="update"></playlist>-->
  </main>
</template>

<script>
  /* eslint-disable quotes,indent,no-undef,no-multi-spaces,no-implicit-coercion */
  //  import EditorSidebar from '~/components/editor/sidebar'
  import HeaderCake from '~/components/header-cake'
  //  import AudioPlayer from '~/components/aplayer'
  import PodcastHeader from '~/components/podcast/header'
  import PodcastContentForm from '~/components/podcast/podcast-content-form'
  import EpisodeList from '~/components/episodes/episode-list'
  import {debounce} from 'lodash'

  export default {
    middleware: 'authenticated',
    layout: 'podcast',
    async fetch ({store, params}) {
      if (params.id && !Object.is(Number(params.id), NaN)) {
//        console.log(params.id)
        await store.dispatch('getPodcast', params.id)
      }
//      await store.dispatch('getPodcast')
//      return Promise.all([
//        store.dispatch('loadEpisodeList', {axios: store.$axios, params: {parent: this.podcastId}})
//        store.dispatch('loadAnnouncements')
//      ])
    },
    data () {
      return {
        curItem: null,
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
        podcast: {
          title: '',
          content: ''
        },
        post: {
          title: '无标题',
          content: ''
        }
      }
    },
    // 获取 ID的 问题
//    validate ({params}) {
//      return !!params.id && !Object.is(Number(params.id), NaN)
//    },
//    async asyncData ({app, params}) {
//      if (!Object.is(params.id, undefined)) {
//        const baseUrl = 'http://api.picker.la/rest/orgs/1'
//        const data = (await app.$axios.get(`${this.orgId}/posts/${params.id}`)).data
//        console.log(JSON.stringify(data))
//        return {
//          podcast: data.data
//        }
//      }
//    },
    props: {},
    components: {
      HeaderCake,
      PodcastHeader,
      PodcastContentForm,
      EpisodeList
    },
//    mounted() {
//      this.podcast = this.detail
//      console.log(this.detail)
//    },
    watch: {
//      'podcast': {
//        handler: (val, oldVal) => {
//          this.save()
//        },
//       深度观察
//        deep: true
//      }
    },
    computed: {
      detail () {
        return this.$store.state.podcast.detail.data
      },
      appId () {
        return this.$store.getters.appId
      },
      orgId () {
        return this.$store.getters.orgId
      },
      episodes () {
        if (!Object.is(this.podcast.children, undefined)) {
          return this.podcast.children
        } else {
          return []
        }
      },
      token () {
        return this.$store.state.token
//        config.headers.common['Authorization'] = 'Bearer ' + store.state.token
//        return
      },
      detailData: {
        get () {
// eslint-disable-next-line indent
//          return this.$store.state.podcast.detail.data
        },
        set (value) {
//          this.$store.commit('podcast/UPDATE_DETAIL', value)
        }
      }
    },
    mounted () {
      if (JSON.stringify(this.detail) !== '{}') {
        this.podcast = Object.assign({}, this.detail)
      }

      this.$watch('podcast.title', () => {
        this.save()
      })
      this.$watch('podcast.content', () => {
        this.save()
      })
    },
    methods: {
      async save (data, id) {
        this.status = 'saving'
//        if (!this.post.id && this.post.content === null) return
        if (Object.is(this.podcast.id, undefined)) {
//        this.post.autoExcerpt = this.autoExcerpt
//          const baseUrl = 'http://api.picker.la/rest/orgs/1'
          await this.$axios.post(`/app/${this.appId}/posts`, this.post)
            .then(response => {
              const postId = response.data.data
              if (!Object.is(postId, null)) {
                this.podcast.id = postId
                // 更新浏览器地址栏
                history.pushState({state: 1}, 'Auto Save State', '/podcast/' + postId + '')
              }
//            const success = !!response.status && response.data && Object.is(response.data.errno, 0)
//            if (success) commit('posts/CREATE_SUCCESS', response.data)
//            if (!success) commit('posts/CREATE_FAILURE')
            }, err => {
//            commit('posts/CREATE_FAILURE', err)
            })
        } else {
          await this.update(this.podcast, this.podcast.id)
        }
      },
      async update (data, id) {
        let podcastId = this.podcast.id
        if (id !== undefined) {
          podcastId = id
        }
//        let api = 'http://vanq.picker.la/api/podcast'
        await this.$axios.put(`/app/${this.appId}/posts/${podcastId}`, data)
          .then(r => {
//            console.log(r.status)
            // 执行 vux store 状态
//            delete data.post_thumbnail
//            that.$emit('update_success')
//            this.$store.commit('podcast/UPDATE_EPISODE_SUCCESS')
          })
          .catch(e => console.log(e))
      }
    }
  }
</script>

