import { reqGoodsInfo, reqAddOrUpdateShopCart} from "@/api";
import { getUUID } from "@/utils/uuid_token"


const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  //将产品信息添加到购物车中（async函数返回的值为一个promise对象）
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //此时只需要向服务器发送请求，将传过来的产品信息参数存在服务器即可，不需要对服务器返回的数据做任何处理
    //await返回promise执行成功的值或失败的promise
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //当服务器返回数据后进行判断
    if (result.code == 200) {
      //存储成功后返回ok
      return 'ok';
    } else {
      //当服务器储存数据失败时，返回一个失败的Promise，并在失败的Promise中new一个错误警告
      return Promise.reject(new Error('faile'));
    }
  }
};
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  }
};
const state = {
  goodInfo: {},
  //创建一个游客的临时身份
  uuid_token: getUUID()
};
const getters = {
  //导航路径的简化数据
  categoryView(state) {
    //清除假警告
    return state.goodInfo.categoryView || {};
  },
  //产品信息的简化数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性的简化数据
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
};
export default {
  actions,
  mutations,
  state,
  getters
}