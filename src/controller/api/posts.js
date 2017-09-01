const BaseRest = require('../common/rest')
module.exports = class extends BaseRest {
  /**
   * 获取分类信息
   * /api/category 获取全部栏目（树结构）
   * /api/category/1 获取栏目id为1的栏目信息
   * @returns {Promise.<*>}
   */
  async getAction () {
    // console.log(this.ctx.state.user)
    let type = this.get('type')
    let query = {}
    query.type = 'article'
    query .status = ['NOT IN', 'trash']
    // query.type = "";
    let fields = [];
    fields.push('id');
    fields.push('author');
    fields.push('status');
    fields.push('type');
    fields.push('title');
    fields.push('name');
    // fields.push('content');
    fields.push('excerpt');
    fields.push('date');
    fields.push('modified');
    fields.push('parent');
    fields = unique(fields);

    if (!think.isEmpty(type)) {
      query.type = type;
      switch (query.type) {
        case "article":
          break;
        case "resume":
          fields.push('content_json')
          // fields.push('content')

          break;
        case "snippets":
          break;
        case "pages":
          break;
      }
    }
    // 条件查询
    let list = await this.modelInstance.where(query).field(fields.join(",")).order('modified DESC').page(this.get('page'), 10).countSelect()
    console.log(JSON.stringify(list))
    // 处理分类
    let _taxonomy = this.model('taxonomy', {orgId: this.orgId})
    for (let item of list.data) {
      item.terms = await _taxonomy.getTermsByObject(item.id)
    }
    // 处理内容层级
    let treeList = await arr_to_tree(list.data, 0);
    list.data = treeList;

    return this.success(list)
  }

  async postAction () {
    let data = this.post()

    // TODO: 快速截取摘要
    if (data.autoExcerpt){
      data.excerpt = await trimHtml(data.content).html;
    }
    if (think.isEmpty(data.status)) {
      data.status = 'auto-draft';
    }
    let _id = data.id;
    // data.author = data.author
  }

}
