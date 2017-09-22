<template>
  <main data-reactroot="" class="connected-applications main" role="main">

    <!-- Navbar -->
    <header-cake compact>
      添加内容
    </header-cake>
    <!-- Header -->
    <podcast-header :podcast="podcast" @featured_image_upload="update"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast="podcast" @content_update="update"></podcast-content-form>
    <playlist :podcast="podcast" @podcast_item_update="update"></playlist>
  </main>
</template>

<script>
  /* eslint-disable quotes,indent,no-undef,no-multi-spaces,handle-callback-err */
  //  import EditorSidebar from '~/components/editor/sidebar'
  import HeaderCake from '~/components/header-cake'
  //  import AudioPlayer from '~/components/aplayer'
  import PodcastHeader from '~/components/podcast/header'
  import PodcastContentForm from '~/components/podcast/podcast-content-form'
  import Playlist from '~/components/podcast/playlist'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        status: '',
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
    props: {},
    components: {
      HeaderCake,
      PodcastHeader,
      PodcastContentForm,
      Playlist
    },

    computed: {
      token () {
        return this.$store.state.token
      }
    },
    mounted () {
      this.$watch('podcast.title', () => {
        this.save()
      })
    },
    methods: {
      async save () {
        this.status = 'saving'
//        if (!this.post.id && this.post.content === null) return
        if (Object.is(this.post.id, undefined)) {
//        this.post.autoExcerpt = this.autoExcerpt
          const baseUrl = 'http://api.picker.la/rest/orgs/1'
          await this.$axios.post(baseUrl + '/posts', this.post)
            .then(response => {
              const postId = response.data.data
//            console.log(JSON.stringify(data))
              if (!Object.is(postId, null)) {
                this.post.id = postId
//                if (process.browser) {
//                  console.log(postId)
                history.pushState({state: 1}, 'Auto Save State', '/podcast/' + postId + '')
//                }
              }
//            const success = !!response.status && response.data && Object.is(response.data.errno, 0)
//            if (success) commit('posts/CREATE_SUCCESS', response.data)
//            if (!success) commit('posts/CREATE_FAILURE')
            }, err => {
              console.log(err)
//            commit('posts/CREATE_FAILURE', err)
            })
        }
      },
      async update (data, id) {
        let podcastId = this.podcast.id
        if (id !== undefined) {
          podcastId = id
        }
//        let api = 'http://vanq.picker.la/api/podcast'
        await this.$axios.put('http://api.picker.la/rest/orgs/1/posts/' + podcastId, data)
          .then(r => {
            console.log(r.status)
            // 执行 vux store 状态
//            delete data.post_thumbnail
//            that.$emit('update_success')
            this.$store.commit('posts/UPDATE_ITEM_SUCCESS')
          })
          .catch(e => console.log(e))
      }
    }
  }
</script>

