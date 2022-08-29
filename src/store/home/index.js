//home模块的小仓库
import {reqCategoryList, reqGetBannerList, reqFloorList} from '@/api'

//action:作为mutation的过渡，也可以写自己的逻辑，也可以处理异步
const actions = {
  //通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
  async categoryList({commit}) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORYLIST',result.data)
    }
  },
  //获取首页轮播数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit('GETBANNERLIST',result.data)
    }
  },
  //获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
};
//mutation:处理state中的数据
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  }
};
//state:Vuex仓库存储数据的地方
const state = {
  //home仓库中存储三级菜单的数据
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor组件的数据
  floorList: [],
};
//getter:将state中的数据转换为计算属性，简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters
}