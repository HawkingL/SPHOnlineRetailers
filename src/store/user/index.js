import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { removeToken, setToken } from "@/utils/token";

//登录与注册模块
const actions = {
  //获取验证码
  async getCode({commit}, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit('GETCODE', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //用户登录
  async userLogin({ commit }, data) {
    //将用户名和密码提交到服务器，服务器返回对应的token
    let result = await reqUserLogin(data);
    //token是用户的唯一标识
    if (result.code == 200) {
      //将token提交到mutations中进行处理
      commit('UERLOGIN', result.data.token);
      //调用封装的数，将token存储到本地存储空间,使浏览器记住该用户
      setToken(result.data.token);
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    //通过请求拦截器携带token，向服务器发送请求获取对应的用户信息
    let result = await reqUserInfo();
    if (result.code == 200) {
      //将用户信息提交到mutations中进行处理
      commit('GETUSERINFO', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //退出登录
  async userLogout({ commit }) {
    //向服务器发起请求，通知服务器清除token
    let result = await reqLogout();
    if (result.code == 200) {
      commit('CLEAR');
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  }
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  //将token存储到仓库中
  UERLOGIN(state, token) {
    state.token = token;
  },
  //将用户信息储存到才仓库中
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除本地数据
  CLEAR(state) {
    //将仓库中的用户信息清空
    state.token = '';
    state.userInfo = {};
    //将本地存储的token清空
    removeToken();
  }
};
const state = {
  code: '',
  //先从本地存储中寻找token，如果没有返回空字符串，如果有返回token的值
  token: localStorage.getItem('TOKEN'),
  userInfo: {},
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters
}