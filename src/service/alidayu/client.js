const TopClient = require('./topClient').TopClient;
module.exports =  class extends think.Service {
  /**
   * init
   * @return {[]}         []
   */
  constructor(...args){
    super(...args);
  }
  async send(info){
    let option = think.config('options.sms');
    let key;
    if(!think.isEmpty(option.key.value)){
      key = option.key.value.split("|");
      console.log(key);
      if(think.isEmpty(key[0])||think.isEmpty(key[1])){
        return {result: { errno: '1000', errmsg: '请确认短信服务配置'}}
      };

    }else {
      return {result: { errno: '1000', errmsg: '请确认短信服务配置'}}
    }
    let client = new TopClient({
      'appkey': key[0],
      'appsecret': key[1],
      'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
    let execute =()=> {
      let deferred = think.defer();
      client.execute('alibaba.aliqin.fc.sms.num.send', info, function(error, response) {
        if (!error){
          deferred.resolve(response);
        }else {
          deferred.resolve(error);
        }

      })
      return deferred.promise;
    }
    return await execute();
  }
}