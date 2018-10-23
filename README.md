# gm-media

> 官网

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## axios
```
npm install axios --save
```
## vue-axios
```
npm install vue-axios --save
```
## less less-loader
```
npm install less less-loader --save
```
## iview
```
npm install iview --save
```
## 预加载
```
npm install puppeteer --save --ignore-scripts
npm install prerender-spa-plugin --save
```
## 在webpack.prod.config.js中加入
```
const PrerenderSpaPlugin = require('prerender-spa-plugin')
```
## 在 pugin中加入 
```
new PrerenderSpaPlugin(
      //将渲染的文件放到dist目录下
      path.join(__dirname, '../dist'), 
      //需要预渲染的路由信息
      ['/','/index',"/weixinspread","/subscriptionfuns","/channelorder","/help","/companyProfile","/companyCulture","/companyRecruit","/companyContact"]
    ),