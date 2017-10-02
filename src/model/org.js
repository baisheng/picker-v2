/* eslint-disable no-return-await,no-undef */
module.exports = class extends think.Model {
  get relation () {
    return {
      metas: {
        type: think.Model.HAS_MANY,
        model: 'orgmeta',
        fKey: 'org_id'
      },
      apps: {
        type: think.Model.HAS_MANY,
        model: 'apps',
        fKey: 'org_id'
      }
    };
  }

  async get () {
    const orgs = await this.list();
    return orgs
  }

  async list () {
    const map = {}
    const list = await this.where(map).field(['id', 'domain', 'subdomain']).select()
    _formatMeta(list)
    // console.log(JSON.stringify(list.apps))
    // for (let app of list.apps) {
    //   console.log(JSON.stringify(app))
    // }
    const obj = {}
    list.forEach(v => {
      let domain = v.domain
      if (think.isEmpty(domain)) {
        domain = v.subdomain
      }
      obj[domain] = v.id
      _formatMeta(v.apps)
      // 缓存进 redis
      think.cache(domain.toString(), v)
    })

    return obj
  }
}
