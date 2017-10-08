const BaseRest = require('./common/rest')
module.exports = class extends BaseRest {

  async getAction () {
    const slug = this.get('slug')
    if (!think.isEmpty(slug)) {
      const term = await this.getTermBySlug(slug)
      return this.success(term)
    }
    const type = this.get('type')
    // 根据分类的分类方法获取分类
    if (!think.isEmpty(type)) {
      const terms = await this.getTermsByTaxonomy(type)
      return this.success(terms)
    }
    const taxonomies = await this.getAllTaxonomies()
    return this.success(taxonomies)
  }

  async getTermBySlug (slug) {
    const term = await this.model('taxonomy', {appId: this.appId}).getTermBySlug(slug)
    return term
  }
  /**
   * 获取全部分类法
   * @returns {Promise.<*>}
   */
  async getAllTaxonomies () {
    const taxonomies = await this.model('taxonomy', {appId: this.appId}).allTaxonomies()
    return taxonomies
  }

  /**
   * 根据分类方法查询分类列表
   * @param taxonomy
   * @returns {Promise.<*>}
   */

  async getTermsByTaxonomy (taxonomy) {
    const taxonomyModel = this.model('taxonomy', {appId: this.appId})
    const terms = await taxonomyModel.getTerms(taxonomy)
    return terms
  }

  async getObjectsInTermsByLimit (terms) {
    const taxonomyModel = this.model('taxonomy', {appId: this.appId})
    const objects = await taxonomyModel.getObjectsInTermsByLimit(2)
    return objects
  }


}
