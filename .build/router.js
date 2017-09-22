import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4a95869c = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _23685d45 = () => import('../client/pages/start/index.vue' /* webpackChunkName: "pages/start/index" */).then(m => m.default || m)
const _30844a73 = () => import('../client/pages/post/index.vue' /* webpackChunkName: "pages/post/index" */).then(m => m.default || m)
const _ce08c6a2 = () => import('../client/pages/home.vue' /* webpackChunkName: "pages/home" */).then(m => m.default || m)
const _370eddc5 = () => import('../client/pages/apps/index.vue' /* webpackChunkName: "pages/apps/index" */).then(m => m.default || m)
const _5db04a72 = () => import('../client/pages/comments/index.vue' /* webpackChunkName: "pages/comments/index" */).then(m => m.default || m)
const _198aab8c = () => import('../client/pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _7cf55d02 = () => import('../client/pages/podcasts/index.vue' /* webpackChunkName: "pages/podcasts/index" */).then(m => m.default || m)
const _608494f6 = () => import('../client/pages/me/profile/index.vue' /* webpackChunkName: "pages/me/profile/index" */).then(m => m.default || m)
const _ac8a89be = () => import('../client/pages/podcast/settings/index.vue' /* webpackChunkName: "pages/podcast/settings/index" */).then(m => m.default || m)
const _558b8700 = () => import('../client/pages/people/team/index.vue' /* webpackChunkName: "pages/people/team/index" */).then(m => m.default || m)
const _0917350c = () => import('../client/pages/podcast/detail.vue' /* webpackChunkName: "pages/podcast/detail" */).then(m => m.default || m)
const _434041f3 = () => import('../client/pages/people/new/index.vue' /* webpackChunkName: "pages/people/new/index" */).then(m => m.default || m)
const _062c589a = () => import('../client/pages/course/home.vue' /* webpackChunkName: "pages/course/home" */).then(m => m.default || m)
const _2d15675a = () => import('../client/pages/podcast/home.vue' /* webpackChunkName: "pages/podcast/home" */).then(m => m.default || m)
const _101049cf = () => import('../client/pages/settings/general/index.vue' /* webpackChunkName: "pages/settings/general/index" */).then(m => m.default || m)
const _6a961910 = () => import('../client/pages/me/sidebar/index.vue' /* webpackChunkName: "pages/me/sidebar/index" */).then(m => m.default || m)
const _72e9175f = () => import('../client/pages/me/sidebar-navigation/index.vue' /* webpackChunkName: "pages/me/sidebar-navigation/index" */).then(m => m.default || m)
const _8abd6716 = () => import('../client/pages/podcast/new.vue' /* webpackChunkName: "pages/podcast/new" */).then(m => m.default || m)
const _01dadfba = () => import('../client/pages/podcast/settings/general/index.vue' /* webpackChunkName: "pages/podcast/settings/general/index" */).then(m => m.default || m)
const _6f1d17f0 = () => import('../client/pages/start/_steps/index.vue' /* webpackChunkName: "pages/start/_steps/index" */).then(m => m.default || m)
const _7e0ecf1f = () => import('../client/pages/post/index_sidebar_post.vue' /* webpackChunkName: "pages/post/index_sidebar_post" */).then(m => m.default || m)
const _b22910e2 = () => import('../client/pages/podcast/_id.vue' /* webpackChunkName: "pages/podcast/_id" */).then(m => m.default || m)
const _24ca8262 = () => import('../client/pages/start/_steps/design-type/index.vue' /* webpackChunkName: "pages/start/_steps/design-type/index" */).then(m => m.default || m)
const _6ecca086 = () => import('../client/pages/start/_steps/design-type/page-image.vue' /* webpackChunkName: "pages/start/_steps/design-type/page-image" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'selected',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _4a95869c,
			name: "index"
		},
		{
			path: "/start",
			component: _23685d45,
			name: "start"
		},
		{
			path: "/post",
			component: _30844a73,
			name: "post"
		},
		{
			path: "/home",
			component: _ce08c6a2,
			name: "home"
		},
		{
			path: "/apps",
			component: _370eddc5,
			name: "apps"
		},
		{
			path: "/comments",
			component: _5db04a72,
			name: "comments"
		},
		{
			path: "/login",
			component: _198aab8c,
			name: "login"
		},
		{
			path: "/podcasts",
			component: _7cf55d02,
			name: "podcasts"
		},
		{
			path: "/me/profile",
			component: _608494f6,
			name: "me-profile"
		},
		{
			path: "/podcast/settings",
			component: _ac8a89be,
			name: "podcast-settings"
		},
		{
			path: "/people/team",
			component: _558b8700,
			name: "people-team"
		},
		{
			path: "/podcast/detail",
			component: _0917350c,
			name: "podcast-detail"
		},
		{
			path: "/people/new",
			component: _434041f3,
			name: "people-new"
		},
		{
			path: "/course/home",
			component: _062c589a,
			name: "course-home"
		},
		{
			path: "/podcast/home",
			component: _2d15675a,
			name: "podcast-home"
		},
		{
			path: "/settings/general",
			component: _101049cf,
			name: "settings-general"
		},
		{
			path: "/me/sidebar",
			component: _6a961910,
			name: "me-sidebar"
		},
		{
			path: "/me/sidebar-navigation",
			component: _72e9175f,
			name: "me-sidebar-navigation"
		},
		{
			path: "/podcast/new",
			component: _8abd6716,
			name: "podcast-new"
		},
		{
			path: "/podcast/settings/general",
			component: _01dadfba,
			name: "podcast-settings-general"
		},
		{
			path: "/start/:steps",
			component: _6f1d17f0,
			name: "start-steps"
		},
		{
			path: "/post/index:sidebar_post",
			component: _7e0ecf1f,
			name: "post-indexsidebar_post"
		},
		{
			path: "/podcast/:id?",
			component: _b22910e2,
			name: "podcast-id"
		},
		{
			path: "/start/:steps/design-type",
			component: _24ca8262,
			name: "start-steps-design-type"
		},
		{
			path: "/start/:steps/design-type/page-image",
			component: _6ecca086,
			name: "start-steps-design-type-page-image"
		}
    ],
    fallback: false
  })
}
