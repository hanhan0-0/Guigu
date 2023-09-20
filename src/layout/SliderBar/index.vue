<!-- Sliderbar -->
<template>
  <Logo></Logo>
  <!-- 展示菜单 -->
  <!-- 滚动组件 -->
  <el-scrollbar class="scrollbar">
    <!-- 菜单组件 -->
    <el-menu
      :collapse="layOutSettingStore.fold"
      background-color="#001529"
      text-color="white"
      active-text-color="pink"
      :default-active="route.path"
    >
      <!-- 根据路由动态生成菜单 -->
      <Menu :menuList="userStore.menuRoutes"></Menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
// 获取路由对象
const route = useRoute()
let userStore = useUserStore()
</script>

<style lang="scss" scoped>
.scrollbar {
  width: 100%;
  height: calc(100vh - $base-menu-logo-height);
  .el-menu {
    border-right: none;
  }
}
</style>
