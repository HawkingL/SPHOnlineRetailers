//此模块会对所有API进行统一管理
import request from "./ajax";
import mockRequest from './mockAjax'

//三级联动接口（地址：/api/product/getBaseCategoryList 请求方式：GET 参数：无）
//注意：axios发送请求返回的结果是Promise对象
export const reqCategoryList = () => {
  //发请求
  return request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
};

//获取banner数据的接口
export const reqGetBannerList = () => mockRequest.get('/banner');

//获取floor数据的接口
export const reqFloorList = () => mockRequest.get('/floor');

//获取搜索模块数据的接口，请求地址：/api/list，请求方式：post，请求参数：需要带参数
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post', data: params })

//获取商品详情的接口，请求地址：/api/item/{ skuId }，请求方式：GET， 请求参数：skuId 
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' });

//将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//获取购物车列表的接口
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' });

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//获取验证码的接口
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册的接口
export const reqUserRegister = (data) => request({ url: '/user/passport/register', data, method: 'post' });

//登录接口
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'post' });

//用户登录成功后携带服务器返回的token向服务器发送请求，获取用户的个人信息，以更新页面
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', methods: 'get' });

//退出登录
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'get' });

//获取用户地址信息
export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

//获取商品清单
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' });

//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//获取支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取支付订单状态
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取个人中心的数据
export const reqMyOrderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });
