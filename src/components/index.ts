//引入项目中全部的组件
import SvgIcon from './SvgIcon/index.vue'
import CateGory from './CateGory/index.vue'
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局对象
const allGloablComponent = { SvgIcon, CateGory }
//对外暴露插件对象
export default {
  install(app) {
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
