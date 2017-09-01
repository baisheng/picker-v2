const redisCache = require('think-cache-redis');
import Base from './base';

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.cacheKey = this.tablePrefix + 'options';
  }

  async get (flag) {
    console.log(this.cacheKey)
    if (flag) {
      await think.cache(this.cacheKey, null)
    }
    let ret = await think.cache(this.cacheKey)

    if (think.isEmpty(ret)) {
      let data = await this.select();
      let result = {};
      data.forEach(item => {
        result[item.key] = JSON.parse(item.value);
      });
      await think.cache(this.cacheKey, JSON.stringify(result))
    }
    let _options = await think.cache(this.cacheKey)
    return JSON.parse(_options)
  }


  async updateOptions(key, value) {

    console.log(key + ": " + value);


    let data = think.isObject(key) ? think.extend({}, key) : {[key]: value};
    let cacheData = await think.cache(this.cacheKey, undefined, this.cacheOptions);

    // console.log(JSON.stringify(cacheData))
    // update picker_resume.picker_options set value = json_set(value,'$.current_theme', 'limitless') where `key` = 'site';
    if (think.isEmpty(cacheData)) {
      cacheData = await this.getOptions();
    }
    let changedData = {};
    for (let key in data) {
      if (data[key] !== cacheData[key]) {
        changedData[key] = data[key];
      }
    }

    console.log(JSON.stringify(changedData) + "-----")
    let json_sql = `update picker_resume.picker_options set value = json_set(value,'$.${value.key}', '${value.value}') where \`key\` = '${key}'`;

    console.log(json_sql)
    // console.log(JSON.stringify(changedData))
    //data is not changed
    if (think.isEmpty(changedData)) {
      return;
    }
    let p1 = think.cache(this.cacheKey, think.extend(cacheData, changedData), this.cacheOptions);

    let promises = [p1];
    for (let key in changedData) {
      let value = changedData[key];
      let exist = await this.where({key: key}).count('key');
      let p;
      this.execute(json_sql);
      // let json_sql = `update picker_resume.picker_options set value = json_set(value,'$.${key}', '${value}') where \`key\` = \`${key}\``;
      // if (exist) {
      // this.execute(update picker_resume.picker_options set value = json_set(value,'$.current_theme', 'limitless') where `key` = 'site';)
      // p = this.where({key: key}).update({value: value});
      // } else {
      //     p = this.add({key, value});
      // }
      promises.push(p);
    }
    await Promise.all(promises);
    // console.log(JSON.stringify(p1) +"======")

    let ret = await this.getOptions(true);

    return ret;
  }


  /**
   * 获取网站配置
   * @returns {{}}
   */
  async lists() {
    let map = {}
    map.status = 1;
    let list = await this.where(map).order("sort ASC").field(["name", "value", "type"]).select();
    let obj = {}
    list.forEach(v => {
      if (v.value.search(/\r\n/ig) > -1 && v.type != 2) {
        v.value = v.value.split("\r\n");
        let obj = {}
        v.value.forEach(n => {
          n = n.split(":");
          obj[n[0]] = n[1];
        })

        v.value = obj;
      }
      obj[v.name] = v.value;


    })
    return obj;
  }
};
