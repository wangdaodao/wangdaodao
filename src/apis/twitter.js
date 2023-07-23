const axios = require("axios");
const dayjs = require("dayjs");

const baseURL = 'https://rsshub.app/twitter/user/hidaodao/exclude_rts_replies=0.json';
// https://rsshub.app/twitter/user/hidaodao/exclude_rts_replies

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
