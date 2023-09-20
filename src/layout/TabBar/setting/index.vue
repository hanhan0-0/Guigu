<!-- 设置 -->
<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 5px 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const layOutSettingStore = useLayOutSettingStore()
const router = useRouter()
const route = useRoute()
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}
// 全屏按钮点击的回调
const fullScreen = () => {
  // Dom对象的一个属性：可以用来判断当前是不是全屏模式（全屏:true,不是全屏:false)
  let full = document.fullscreenElement
  if (!full) {
    // 文档的根节点的方法requestFullscreen去实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 点击退出登陆的回调
const logOut = () => {
  // 第一件事情：需要向服务器发请求【退出登录接口】
  // 第二件事情：仓库中关于用户相关的数据清空【token|username|avatar】
  // 第三件事情：跳转到登录页面
  userStore.userLogOut()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style lang="scss" scoped></style>
