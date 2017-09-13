const Base = require('./base');

module.exports = class extends Base {
  get relation() {
    return {
      metas: {
        type: think.Model.HAS_MANY,
        model: 'termmeta',
        // rModel: 'usermeta',
        fKey: 'term_id',
        field: "term_id,meta_key,meta_value"
      }
    };
  }

  /**
   * 根据内容获取分类, 这里查询出来的分类未查询它所归属的分类法，仅类别的信息
   * @returns {Promise.<void>}
   */
  async getTermsByObject(object_id) {

    // 从缓存中提取到所有 term
    let all_terms = await this.allTerms();

    let _term_relationships = this.model("term_relationships", {orgId: this.orgId});

    // 查询内容关联的分类法 id == term_id
    let taxonomies = await _term_relationships.field('term_taxonomy_id as term_id').where({"object_id": object_id}).select();

    /**
     * 按 term_id 查询 term
     * @type {Array}
     * @private
     */
    let _terms = [];
    taxonomies.forEach((item) => {
      _terms.push(think._.filter(JSON.parse(all_terms), {id: item.term_id}));
    });

    return await think._.flattenDeep(_terms);
  }
  async allTerms(flag) {
    if (!flag) {
      let _cache = await think.cache(this.tablePrefix + 'all_terms')
      if (think.isEmpty(_cache)) {
        let _data = await this.model('terms', {orgId: this.orgId}).select();
        await think.cache(this.tablePrefix + 'all_terms', JSON.stringify(_data))
      }
      return _cache
    } else {
      return await this.model('terms').select();

    }
  }
}
