const axios = require("axios");

const baseURL = 'https://v1.hitokoto.cn/?c=a&c=c&c=d&c=i&c=j&c=k';

const hitokoto = async () => {
  const res = await axios.request({
    method: 'GET',
    baseURL,
  })

  const hitokoto = res.data.hitokoto;
  const form = res.data.form ? ` 《${res.data.form}》 ` : ' ';
  const from_who = res.data.from_who || '佚名';

  return `${hitokoto}——${form}${from_who}`;
}

module.exports = hitokoto;
