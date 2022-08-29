import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除产品信息
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    //当服务器返回数据后进行判断
    if (result.code == 200) {
      //存储成功后返回ok
      return 'ok';
    } else {
      //当服务器储存数据失败时，返回一个失败的Promise，并在失败的Promise中new一个错误警告
      return Promise.reject(new Error('faile'));
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //删除勾选的全部产品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    //循环遍历购物车信息，选出勾选的产品，通过派发deleteCartListBySkuId将选出的产品删除
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
      //将派发deleteCartListBySkuId后返回的promise放到一个数组中
      PromiseAll.push(promise);
    });
    //只有都成功返回结果才为成功，只要有一个失败，返回结果即为失败
    return Promise.all(PromiseAll);
  },
  //修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked})
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  }
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const state = {
  cartList: [],
};
const getters = {
  //购物车列表
  cartList(state) {
    return state.cartList[0] || {};
  }
};
export default {
  actions,
  mutations,
  state,
  getters
}