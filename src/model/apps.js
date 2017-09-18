/* eslint-disable no-return-await */
module.exports = class extends think.Model {
  get relation () {
    return {
      metas: {
        type: think.Model.HAS_MANY,
        model: 'appmeta',
        fKey: 'app_id'
      }
    };
  }

  async findByOrgId (orgId) {
    const list = await this.where({org_id: orgId}).field(['id', 'org_id', 'domain', 'subdomain']).select()
// eslint-disable-next-line no-undef
    _formatMeta(list)
    return list
  }

}
