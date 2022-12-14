//游客身份模块
import { v4 as uuidv4 } from 'uuid';
//该函数生成一个随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  //先从本地存储获取uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  //判断本地存储是否有uuid
  if (!uuid_token) {
    //生成游客的临时身份
    uuid_token = uuidv4();
    //本地存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token;
}