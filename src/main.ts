import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
// 配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入全局样式
import '@/styles/index.scss'
//引入自定义插件对象：注册整个项目全局组件
import gloalComponent from '@/components'
import router from './router'
import pinia from './store'
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
})

app.use(gloalComponent)
app.use(pinia)
app.use(router)
app.mount('#app')
