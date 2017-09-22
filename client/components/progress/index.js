import Progress from './Progress'

const VueProgress = {
  install: function (Vue, options) {
    Vue.component('progress-bar', Progress)
  }
}

export default VueProgress

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueProgress)
}
