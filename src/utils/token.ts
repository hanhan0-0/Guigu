//封装本地存储数据与读取方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}