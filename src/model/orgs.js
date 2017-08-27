module.exports = class extends think.Model {
  get relation() {
    return {
      metas: {
        type: think.Model.HAS_MANY,
        model: 'orgmeta',
        fKey: 'org_id'
      }
    };
  }

  async get () {
    return await this.list();
  }

  async list() {
    const map = {}
    const list = await this.where(map).field(['id', 'domain', 'subdomain']).select()
    let obj = {}
    list.forEach(v => {
      if (!think.isEmpty(v['domain'])) {
        obj[v.domain] = v.id
      }
      obj[v.subdomain] = v.id
    })

    // console.log(JSON.stringify(obj))
    return obj
  }
}
