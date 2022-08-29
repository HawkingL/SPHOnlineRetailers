//引入mockjs模块
import Mock from 'mockjs'
//引入JSON数据格式（webpack默认对晚暴露的是，图片和json数据，所以不需要暴露就可以直接引用
import banner from './banner.json'
import floor from './floor.json'

//mock数据(第一个参数是请求的地址，第二个参数是请求的数据)
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });