import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//引入路由
import router from './router'

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
//轮播图组件---全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
//分页器组件---全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
//注册element-UI为全局组件(第二种写法：直接挂载在原型上)
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入Vuex数据仓库
import store from '@/store'

//引入MockServe.js-----mock数据
import '@/mock/mockServe'

//将所有的api接口统一引入
import * as API from '@/api';

//引入swiper样式
import 'swiper/css/swiper.css'

//引入插件
import VueLazyload from 'vue-lazyload'
import photo from '@/assets/1.jpg'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: photo,
})

//引入表单验证插件
import '@/plugin/validate'

new Vue({
  render: h => h(App),
  //全局事件总线的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册Vuex数据仓库
  store
}).$mount('#app')
