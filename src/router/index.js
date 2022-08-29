//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由信息
import routes from './routes'
//引入store数据仓库 
import store from '@/store'


//重写push和replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

//配置路由器
let router = new VueRouter({
  //使用导入的路由信息
  routes,
  //前端路由滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});

//全局路由守卫：前置守卫
router.beforeEach(async (to, from, next) => {
  //to：可以获取到你要跳转到的那个路由的信息
  //from：可以获取到你来的那个路由的信息
  //next：放行函数，使函数继续执行 ------  next()：放行 ； next('/home')：放行到指定路由
  //next();
  //只要用户登录肯定能获得token
  let token = store.state.user.token;
  //获取用户信息
  let name = store.state.user.userInfo.name; 
  //判断用户是否已经登录
  if (token) {
    //用户已经登录了还想去登录页面时，让页面停留在首页阻止用户登录
    if (to.path == '/login' || to.path == '/register') {
      next('/');
    } else {
      //用户已经登录了，但是去的不是登录页面时
      //判断用户信息中是否有用户名，如果有就放行，如果没有就派发请求获取用户信息
      if (name) {
        next();
      } else {
        //派发请求获取用户信息
        try {
          //获取用户信息成功放行
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token失效了，获取不到用户信息，重新登录
          alert('令牌失效，重新登录');
          //清除token
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    //用户还未登录，不能去交易相关的页面，不能去个人中心
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
});

export default router;