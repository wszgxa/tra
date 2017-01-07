var superagent = require('superagent')
var settings = require('../settings')

//用有道翻译的api翻译
var translate = function (value) {
  var search = 'http://fanyi.youdao.com/openapi.do?keyfrom=' +
    settings.keyFrom +
    '&key=' +
    settings.apiKey +
    '&type=data&doctype=json&version=1.1' +
    '&q=' + 
    value
  superagent.get(search)
    .end(function (err, res) {
      if (err) return next(err)
      var text = JSON.parse(res.text)
      if (!text.errorCode) {
        console.log('\033[32m'+'翻译：'+text.translation+'\033[0m')
        var back = ''
        if (text.basic !== undefined ) {
          console.log('\033[34m'+'解释：'+'\033[0m');
          text.basic.explains.forEach(function(element, index){
            console.log('\033[34m'+element+'\033[0m');
          });
        }
      } else {
        console.log('输入命令无效或则查无此词，输入tra -h查看帮助');
      }
    })
}

module.exports = translate
