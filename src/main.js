import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import utils from '@/components/service/utils'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import Qs from 'qs'
import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';
import axiosbusiness from "@/components/service/axiosbusiness"
import business from "@/components/service/business"
Vue.config.productionTip = false
//axios.defaults.baseURL="http://192.168.7.111:8080";
axios.defaults.baseURL="http://localhost:8080";
//axios.defaults.baseURL="http://nieyue.ngrok.xiaomiqiu.cn";
axios.defaults.headers["Content-Type"]="application/x-www-form-urlencoded";
//默认为baseURL，
axios.defaults.imgURL=""||axios.defaults.baseURL;
Vue.prototype.Qs=Qs
Vue.prototype.utils=utils
Vue.prototype.Swiper=Swiper
Vue.prototype.axiosbusiness=axiosbusiness
Vue.prototype.business=business
Vue.use(VueAxios, axios)
Vue.use(iView)
//全局监听事件
Vue.prototype.Hub = new Vue();

//是否超级管理员,默认不是
Vue.prototype.isSuperAdmin=false
//路径参数
Vue.prototype.pathParams={
  currentPage:1,//当前页
}
new Vue({
  el: '#app',
  router,
  components: { 
    App
   },
  render: h => h(App),
  template: '<App/>'
})
