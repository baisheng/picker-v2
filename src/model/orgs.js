/* eslint-disable no-return-await */
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
    // console.log(list)
    const obj = {}
    list.forEach(v => {
      let domain = v.domain
      if (think.isEmpty(domain)) {
        domain = v.subdomain
      }
      obj[domain] = v.id
      // 缓存进 redis
      think.cache(domain.toString(), v.id)
    })

    return obj
  }
}
