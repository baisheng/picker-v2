/* eslint-disable no-undef */
require('./global');

// invoked in worker
think.beforeStartServer(async () => {
  // 获取全部组织账户信息并缓存
  const orgs = await think.model('org').list()
  await think.cache('orgs', orgs)
  const options = await think.model('options').get(true)
  think.config('options', options)
})

think.app.on("appReady", function () {
  // console.log('app ready')
})
