<!-- 面包屑 -->
<template>
  <!-- 左侧图标 -->
  <el-icon style="margin-right: 10px; cursor: pointer" @click="changeIcon">
    <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRightBold">
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :to="{ path: item.path }"
      :key="index"
      v-show="item.meta.title"
    >
      <el-icon size="16">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0px 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
const route = useRoute()
const layOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>

<style lang="scss" scoped>
:deep(.is-link) {
  display: flex;
  align-items: center;
}
</style>
