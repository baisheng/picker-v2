const qiniu = require('qiniu');
module.exports = class extends think.Service {
  /**
   * 七牛上传
   * @param filePath 要上传文件的本地路径
   * @param key 上传到七牛后保存的文件名
   * @returns {*}
   */
  async upload(filePath, key, option, istoken = false) {
    // this.cacheKey = this.tablePrefix + 'options';
    // if (think.isEmpty(option)) {
    //   option = await think.cache('options').upload.option
    // }
    // console.log(JSON.stringify(option))
    // let $option = await think.cache(this.cacheKey);

    // let $upload = $option.upload;

    // qiniu.conf.ACCESS_KEY = option['ak'];
    // qiniu.conf.SECRET_KEY = option['sk'];
    let bucket = option['bucket'];
    let mac = new qiniu.auth.digest.Mac(option['ak'], option['sk']);
    let options = {
      scope: bucket + ':' + key
    }
    let putPolicy = new qiniu.rs.PutPolicy(options);

    //用于前端直传直接返回 token
    if (istoken && filePath == null) {
      let putPolicy = new qiniu.rs.PutPolicy({scope: bucket});
      //console.log(putPolicy.uploadToken(mac));

      return putPolicy.uploadToken(mac);
    }

    let uploadToken = putPolicy.uploadToken(mac);

    let config = new qiniu.conf.Config();
    //config.zone = qiniu.zone.Zone_z0;
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();

    //file
    function uploadFile(uploadToken, key, filePath, putExtra) {
      let deferred = think.defer();
      formUploader.putFile(uploadToken, key, filePath, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }

        if (respInfo.statusCode === 200) {
          console.log(respBody);
          deferred.resolve(respBody);

        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    }

    return await uploadFile(uploadToken, key, filePath, putExtra);
  }

  //删除资源
  async remove(key, option) {
    if (think.isEmpty(option)) {
      option = await think.cache('options').upload
    }
    let mac = new qiniu.auth.digest.Mac(option['ak'], option['sk']);
    let config = new qiniu.conf.Config();
    //config.useHttpsDomain = true;
    config.zone = qiniu.zone.Zone_z0;
    let bucketManager = new qiniu.rs.BucketManager(mac, config);
    let bucket = option['bucket'];
    let delfile = (bucket, key) => {
      let deferred = think.defer();
      bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
          console.log(err);
          //throw err;
          deferred.resolve(false);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          deferred.resolve(true);
        }
      });
      return deferred.promise;
    }
    return await delfile(bucket, key);
  }

  //获取文件信息
  async stat(key, option) {
    if (think.isEmpty(option)) {
      option = await think.cache('options').upload
    }
    // let setup = think.config("setup");
    qiniu.conf.ACCESS_KEY = option['ak'];
    qiniu.conf.SECRET_KEY = option['sk'];
    let bucket = option['bucket']

    function stat() {
      let deferred = think.defer();
      //构建bucketmanager对象
      let client = new qiniu.rs.Client();
      //获取文件信息
      client.stat(bucket, key, function (err, ret) {
        if (!err) {
          console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
          deferred.resolve(ret);
        } else {
          console.log(err);
          deferred.resolve(err);
        }
      });
      return deferred.promise;
    }

    return await stat();
  }

  //音视频转码
  async pfop(option) {
    if (think.isEmpty(option)) {
      option = await think.cache('options').upload
    }
    // let $option = await think.cache("$option");
    // let $upload = JSON.parse($option.upload);
    qiniu.conf.ACCESS_KEY = option['ak'];
    qiniu.conf.SECRET_KEY = option['sk'];
    let bucket = option['bucket'];


    //要转码的文件所在的空间和文件名
    let key = 'create-project.mp4';

    //转码所使用的队列名称。
    let pipeline = 'abc';

    //要进行转码的转码操作。
    let fops = "avthumb/mp4/s/640x360/vb/1.25m"

    //可以对转码后的文件进行使用saveas参数自定义命名，当然也可以不指定文件会默认命名并保存在当前空间
    let saveas_key = qiniu.util.urlsafeBase64Encode(saved_bucket + ':' + saved_key);
    fops = fops + '|saveas/' + saveas_key;
    // console.log(saveas_key);
    let opts = {
      pipeline: pipleline
    };

    let PFOP = qiniu.fop.pfop(bucket, key, fops, opts, function (err, ret) {
      if (!err) {
        console.log(ret);
        // 上传成功， 处理返回值
        // console.log('curl ' + 'http://api.qiniu.com/status/get/prefop?id=' + ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        // console.log(err);
      }
    });
  }

  async download(key, option) {
    if (think.isEmpty(option)) {
      option = await think.cache('options').upload
    }
    let mac = new qiniu.auth.digest.Mac(option['ak'], option['sk']);
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(mac, config);
    // TODO: 待处理 https 访问配置,空间访问域名
    let http_ = think.config("http_") == 1 ? "http" : "https";
    let publicBucketDomain = `${http_}://${option.domain}`;

    // 公开空间访问链接
    let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
    console.log(publicDownloadUrl);
    return publicDownloadUrl;
  }
}