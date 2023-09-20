<!-- layout -->
<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slide">
      <SliderBar></SliderBar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: layOutSettingStore.fold }">
      <TabBar />
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: layOutSettingStore.fold }"
      v-if="flag"
    >
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <keep-alive>
            <component :is="Component" v-if="flag" :key="route.name" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const route = useRoute()
// 目前首页挂载完毕发请求获取用户信息
onMounted(() => {
  userStore.userInfo()
})
const layOutSettingStore = useLayOutSettingStore()
// 控制当前组件是否销毁重建
const flag = ref(true)
watch(
  () => layOutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slide {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    overflow: auto;
    padding: 20px;
    transition: all 0.3s;
    background-color: white;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .slide-fade-enter-from {
      opacity: 0;
      transform: translateX(-5%);
    }

    .slide-fade-leave-to {
      opacity: 0;
      transform: translateX(5%);
    }
  }
}
</style>
