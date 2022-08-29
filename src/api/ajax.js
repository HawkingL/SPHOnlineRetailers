//对于axios进行二次封装
import axios from 'axios'
//引入进度条插件（start()表示进度条开始，done()表示进度条结束）
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//引入store仓库模块
import store from '@/store'


//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置了一下
const request = axios.create({
  //配置对象
  //基础路径，发请求的时候，自动拼接到请求路径中
  baseURL: "/api",
  //请求超时的配置（单位毫秒）
  timeout:5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前去做一些事
request.interceptors.request.use((config) => {
  //config: 配置对象，对象里面有一个属性很重要，headers请求头
  /* ****************** */
  //如果生成了游客身份的uuid_token，就将这个token带到请求头中
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段（userTempId）
    config.headers.userTempId = store.state.detail.uuid_token;
  };
  //需要携带token字段带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  };
  //启动进度条
  nprogress.start();
  return config
});

//响应拦截器
request.interceptors.response.use((res) => {
  //成功的回调函数，服务器相应数据回来后，响应拦截器可以拦截到，可以做一些事
  //关闭进度条
  nprogress.done();
  return res.data;
}, (err) => {
  //服务器响应失败后的回调函数
  return Promise.reject(new Error('faile'));
});

//对外暴露
export default request;
