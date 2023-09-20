import { defineStore } from 'pinia'
const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
      refsh: false, //刷新
    }
  },
})
export default useLayOutSettingStore
