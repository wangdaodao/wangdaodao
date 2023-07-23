const axios = require("axios");

const bingUrl = 'https://www.bing.com'
const baseURL = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&setlang=zh-CN';

const getBackground = async () => {
  const res = await axios.request({
    method: 'GET',
    baseURL,
  })

  const [image] = res.data.images;

  let imgData = {
    url: bingUrl+image.url,
    title: image.title,
    copyright: image.copyright,
    copyrightlink: image.copyrightlink,
  }

  return imgData;
}

module.exports = getBackground;
