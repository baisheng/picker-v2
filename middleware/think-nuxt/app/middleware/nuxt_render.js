/* eslint-disable no-useless-return,no-unreachable */
module.exports = (options, app) => {
  // options = Object.assign({}, defaultOptions, options)
  // options.requestTimeout = helper.ms(options.requestTimeout);

  // const nuxt = new Nuxt(options)

  return (ctx, next) => {
    // webpack hot reload
    if (this.path !== '/__webpack_hmr') {
      return next()

      // ignore status if not 404
      if (this.status !== 404 || this.method !== 'GET') {
        return
      }

      this.status = 200
      const path = this.path
      if (/\.js$/.test(path)) {
        this.set('Content-Type', 'application/javascript')
      }
      if (/\.css/.test(path)) {
        this.set('Content-Type', 'text/css')
      }
    }

    this.app.nuxt.render(this.req, this.res)
  }
}
