import { resultProps } from 'element-plus';
<!-- 三级分类栏组件 -->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          :disabled="!scene"
          v-model="categoryStore.c1Id"
          @change="getCategory2"
        >
          <!-- option:label即为显示文字，value属性即为select下拉菜单收集的数据 -->
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :label="c1.name"
            :key="c1.id"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="!scene"
          v-model="categoryStore.c2Id"
          @change="getCategory3"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :label="c2.name"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="!scene" v-model="categoryStore.c3Id">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :label="c3.name"
            :key="c3.id"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()

// 组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
  // 获取一级分类的数据
  getC1()
})
// 获取一级分类的数据方法
const getC1 = () => {
  categoryStore.getC1()
}
// 此方法即为一级分类下拉菜单的change事件（选中值的时候触发，保证一级分类ID有了）
const getCategory2 = () => {
  // 需要将二级、三级选项清空
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
// 此方法即为二级分类下拉菜单的change事件（选中值的时候触发，保证二级分类ID有了）
const getCategory3 = () => {
  // 需要将三级选项
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
// 接受父组件传递过来的scene
defineProps(['scene'])
</script>

<style lang="scss" scoped></style>
