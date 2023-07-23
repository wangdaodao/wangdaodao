const axios = require("axios");
const dayjs = require("dayjs");

const baseURL = 'https://rsshub.wangdaodao.com/twitter/user/hidaodao/includeRts=0.json';

const twitter = async () => {
  const res = await axios.request({
    method: 'GET',
    baseURL,
  })
  const list = res.data.items.filter(
    item => {
      item.date = dayjs(item.date_published).utcOffset(8).format('YYYY-MM-DD HH:mm')
      item.content = item.content_html.replace(/<.*?>/g,"")
      return item;
    }
  )

  return list;
}

module.exports = twitter;
