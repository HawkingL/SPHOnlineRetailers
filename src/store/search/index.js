//search模块的小仓库
import { reqGetSearchInfo } from "@/api";
//action:作为mutation的过渡，也可以写自己的逻辑，也可以处理异步
const actions = {
  //获取search模块
  async getSearchList({commit}, params={}) {
    let result = await reqGetSearchInfo(params);
    if (result.code==200) {
      commit('GETSEARCHLIST', result.data);
    }
  }
};
//mutation:处理state中的数据
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
//state:Vuex仓库存储数据的地方
const state = {
  searchList: {},
};
//getter:将state中的数据转换为计算属性，简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  goodsList(state) {
    return state.searchList.goodsList;
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
}