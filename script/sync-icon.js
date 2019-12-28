
/**
 * 同步factorio wiki的图标
 */
const fs = require('fs');
const { resolve } = require('path');
const { uniq, difference } = require('lodash');
const request = require('request');

const dataSrc = resolve(__dirname, '../src/data/0.17.79');
const resJson = require(resolve(dataSrc, 'res.json'));
const formulaJson = require(resolve(dataSrc, 'formula.json'));

const prefix = `https://wiki.factorio.com/images`;
const iconsPath = resolve(__dirname, '../src/assets/icons');

let iconsNames = uniq(resJson.map(r => r.name).concat(formulaJson.map(r => r.name))).map(n => `${n}.png`);

const force = process.argv.includes('-f');

if (!force) {
    const files = fs.readdirSync(iconsPath);
    iconsNames = difference(iconsNames, files);
}

iconsNames.forEach(n => {
    const url = `${prefix}/${n}`;
    const stream = fs.createWriteStream(resolve(iconsPath, n));
    request(url).pipe(stream).on('close', function (err) {
        console.log(`文件[${n}]下载完毕`);
    });
})