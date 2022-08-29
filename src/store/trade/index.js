import { reqAddressInfo, reqOrderInfo } from "@/api";

const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data);
    } else {
      alert('请求用户地址失败')
    }
  },
  //获取用户商品清单属性
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit('GETORDERINFO', result.data);
    } else {
      alert('用户请求商品清单属性失败')
    }
  }
};
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  }
};
const state = {
  address: [],
  orderInfo: {},
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
}