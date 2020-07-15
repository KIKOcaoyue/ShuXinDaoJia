// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.action) {
    case 'requestSubscribeMessage': {
      return requestSubscribeMessage(event)
    }
    case 'sendSubscribeMessage': {
      return sendSubscribeMessage(event)
    }
    case 'getWXACode': {
      return getWXACode(event)
    }
    case 'getOpenData': {
      return getOpenData(event)
    }
    case 'updateDB':{
      return updateDB(event)
    }
    case 'insertDB':{
      return insertDB(event)
    }
    case 'updateall':{
      return updateall(event)
    }
    default: {
      return
    }
  }
}

async function updateall(event){
  const { name } = event
  const { des } = event
  const { price } = event
  const { weight } = event
  return await db.collection('VegeSet').where({
    vegeName: name
  }).update({
    data:{
      vegeDes: des,
      vegePrice: price,
      vegeWeight: weight
    }
  })
}

async function insertDB(event){
  const { norderitem } = event
  const { norderaddr } = event
  const { nordertel } = event
  const { nordertime } = event
  const { nserial } = event
  const { ntotal } = event
  const { nfinished } = event
  return await db.collection('AllOrder').add({
    data:{
      orderitem: norderitem,
      orderaddr: norderaddr,
      ordertel: nordertel,
      ordertime: nordertime,
      serial: nserial,
      total: ntotal,
      finished: nfinished
    }
  })
}

async function updateDB(event){
  const { serial } = event
  var tmp = serial
  return await db.collection('AllOrder').where({
    serial: tmp
  }).update({
    data: {
      finished: true
    }
  })
}
async function requestSubscribeMessage(event) {
  // 此处为模板 ID，开发者需要到小程序管理后台 - 订阅消息 - 公共模板库中添加模板，
  // 然后在我的模板中找到对应模板的 ID，填入此处
  return 'G6pf-ZO8zhc6-NqEq8XfNf2NpDdawS1azPvyTW_iIdM' // 如 'N_J6F05_bjhqd6zh2h1LHJ9TAv9IpkCiAJEpSw0PrmQ'
}

async function sendSubscribeMessage(event) {
  const { OPENID } = cloud.getWXContext()

  const { templateId } = event
  const { region } = event
  const { tel } = event
  const { tme } = event
  const { good } = event

  const sendResult = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    templateId,
    miniprogram_state: 'developer',
    page: 'pages/openapi/openapi',
    // 此处字段应修改为所申请模板所要求的字段
    data: {
      thing1: {
        value: region,
      },
      phone_number8: {
        value: tel,
      },
      thing7: {
        value: tme,
      },
      thing2: {
        value: good,
      }
    }
  })

  return sendResult
}

async function getWXACode(event) {

  // 此处将获取永久有效的小程序码，并将其保存在云文件存储中，最后返回云文件 ID 给前端使用

  const wxacodeResult = await cloud.openapi.wxacode.get({
    path: 'pages/openapi/openapi',
  })

  const fileExtensionMatches = wxacodeResult.contentType.match(/\/([^\/]+)/)
  const fileExtension = (fileExtensionMatches && fileExtensionMatches[1]) || 'jpg'

  const uploadResult = await cloud.uploadFile({
    // 云文件路径，此处为演示采用一个固定名称
    cloudPath: `wxacode_default_openapi_page.${fileExtension}`,
    // 要上传的文件内容可直接传入图片 Buffer
    fileContent: wxacodeResult.buffer,
  })

  if (!uploadResult.fileID) {
    throw new Error(`upload failed with empty fileID and storage server status code ${uploadResult.statusCode}`)
  }

  return uploadResult.fileID
}

async function getOpenData(event) {
  return cloud.getOpenData({
    list: event.openData.list,
  })
}
