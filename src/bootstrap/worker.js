/* eslint-disable no-undef */
require('./global');

// invoked in worker
think.beforeStartServer(async () => {
  // 获取全部组织账户信息并缓存
  const orgs = await think.model('org').list()
  // console.log(JSON.stringify(orgs))
  await think.cache('orgs', orgs)
  const options = await think.model('options').get(true)
  // console.log(JSON.stringify(options))
  think.config('options', options)
  // for (let i of orgs) {
  //   console.log(i)
  // }
    // console.log(JSON.stringify(think.config('options')['picker_user_roles']))
  // console.log(JSON.stringify(_orgs))
  // const config =  await think.model("setup").getset();;
  // think.config('setup', config); //从数据库中将配置读取出来，然后设置
})

think.app.on("appReady", function () {
  // console.log('app ready')
})
