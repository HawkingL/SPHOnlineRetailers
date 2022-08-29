//配置路由信息
/* ************************** */
//引入路由组件 --------以后引入组件时直接用路由懒加载就行，不需要全部引入了
/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
//引入二级路由
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
 */
//路由信息的配置
export default [
  {
    path: '/center',
    component: () => import("@/pages/Center"),
    meta: { show: true },
    //二级路由组件
    children: [
      {
        path: 'myorder',
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: 'grouporder',
        component: () => import("@/pages/Center/GroupOrder"),
      },
      {
        //子组件的重定向，让所有访问到center的路由都跳转到center/myorder路由下
        path: '/center',
        redirect: '/center/myorder',
      }
    ]
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: () => import("@/pages/PaySuccess"),
    meta: {
      show: true
    }
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    name: 'trade',
    path: '/trade',
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      } else {
        //从哪儿来到哪儿去，中断路由，停留在当前路由
        next(false);
      }
    }
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: () => import("@/pages/ShopCart"),
    meta: {
      show: true
    }
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: () => import("@/pages/AddCartSuccess"),
    meta: {
      show: true
    }
  },
  {
    name: 'detail',
    path: '/detail/:skuId',
    component: () => import("@/pages/Detail"),
    meta: {
      show: true
    }
  },
  {
    name: 'home',
    path: '/home',
    /* 路由懒加载
      如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
    */
    component: () => import("@/pages/Home"),
    meta: {
      show: true
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import("@/pages/Search"),
    meta: {
      show: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import("@/pages/Login"),
    meta: {
      show: false
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import("@/pages/Register"),
    meta: {
      show: false
    }
  },
  //重定向，项目启动时，直接访问/home
  {
    path: '*',
    redirect: '/home'
  }
]