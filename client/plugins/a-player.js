import Vue from 'vue'
import AudioPlayer from '../components/aplayer'
// if (process.BROWSER_BUILD) {
// Vue.use(require('../components/aplayer'))
// }
// Vue.use(AudioPlayer)
Vue.component('Player', AudioPlayer)
