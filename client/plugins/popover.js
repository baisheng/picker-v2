// import {
//   bindWindowListeners,
//   unbindWindowListeners,
//   suggested as suggestPosition,
//   constrainLeft,
//   isElement as isDOMElement,
//   offset
// } from './lib/popover-util'
let poputil = {}
if (process.browser) {
  poputil = require('./lib/popover-util')
}

export default poputil
