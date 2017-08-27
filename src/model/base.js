module.exports = class extends think.Model {
  constructor(...args) {
    super(...args);
    this.orgId = ''
    if (this.config['orgId'] !== undefined) {
      this.orgId = this.config['orgId'] + '_'
    }
  }

  get tablePrefix() {
    return 'picker_'+ this.orgId;
  }
  /**
   * 处理 metas
   *
   * @param post
   * @returns {Promise.<*>}
   */
  async _formatMeta(list) {
    let _items = [];

    for (let item of list) {
      item.meta = {};
      if (item.metas.length > 0) {
        for (let meta of item.metas) {
          // console.log(meta.meta_key + ":" + meta.meta_value);
          item.meta[meta.meta_key] = meta.meta_value;
        }
      }
      delete item.metas;
      _items.push(item);
    }
    return _items;
  }
}
