//token模块
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}

//清除本地存储的token
export const removeToken = () => {
  localStorage.removeItem('TOKEN');
}