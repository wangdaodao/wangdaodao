require('dotenv').config();

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const prettify = require('html-prettify');

const getBackground = require("./apis/background");
const hitokotos = require("./apis/hitokoto");
// const twitters = require("./apis/twitter");
const badges = require("./constants/badges");
const packages = require("./constants/packages");
const plugins = require("./constants/typecho");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const tplPath = path.join(__dirname, './template.ejs');
const outputPath = path.join(__dirname, '../README.md');

const main = async () => {
  const timeStamp = new Date().getTime();
  const updateTime = dayjs().utcOffset(8).format('YYYY-MM-DD HH:mm')
  const tplStr = fs.readFileSync(tplPath, 'utf8');

  const [background] = await Promise.all([
    getBackground(),
  ]);
  const [hitokoto] = await Promise.all([
    hitokotos(),
  ]);
  // const [twitter] = await Promise.all([
  //   twitters(),
  // ]);

  const html = ejs.render(tplStr, {
    // twitter,
    badges,
    packages,
    plugins,
    background,
    hitokoto,
    timeStamp,
    updateTime
  });

  const prettyHtml = prettify(html);

  fs.writeFileSync(outputPath, prettyHtml);
}

main().then();
