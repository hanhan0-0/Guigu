<!-- menu -->
<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.meta.hidden && !item.children"
      :index="item.path"
      @click="goView(item.path)"
    >
      <el-icon><component :is="item.meta.icon"></component></el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由但是只有一个 -->
    <el-menu-item
      v-if="
        item.children &&
        !item.children[0].meta.hidden &&
        item.children.length == 1
      "
      :index="item.children[0].path"
      @click="goView(item.path)"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有很多个子路由 -->
    <el-sub-menu
      v-if="!item.meta.hidden && item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
const router = useRouter()
const goView = (path: string) => {
  router.push(path)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style lang="scss" scoped></style>
