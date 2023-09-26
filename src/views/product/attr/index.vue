<!-- attr -->
<template>
  <CateGory :scene="scene"></CateGory>
  <el-card style="margin: 10px 0px">
    <div v-show="scene">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0px" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updataAttr"
            ></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!scene">
      <!-- 展示添加属性与修改属性的结构 -->
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="attrParams.attrName ? false : true"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
      <el-table
        border
        style="margin: 10px 0px"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input
              v-if="row.flag"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
              @blur="toLook(row)"
              size="small"
              :focus=""
            ></el-input>
            <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// 一惹怒获取已有属性和属性值接口
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import type {
  AttrResponseData,
  Attr,
  AttrValue,
} from '@/api/product/attr/type.ts'
// 引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
// 存储已有的属性与属性值
const attrArr = ref<Attr[]>([])
// 定义card组件内容切换控制变量
const scene = ref<boolean>(true)
// 收集新增的属性的数据
const attrParams = reactive<Attr>({
  attrName: '', //新增的属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
})
// 监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次获得的属性和属性值
    attrArr.value = []
    // 保证三级分类存在再发请求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)
// 获取已有的属性和属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
// 添加属性按钮的回调
const addAttr = () => {
  // 每一次点击的时候，先清空一下数据在收集数据
  Object.assign(attrParams, {
    attrName: '', //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  })
  scene.value = !scene.value
}
// 修改属性按钮的回调
const updataAttr = () => {
  scene.value = !scene.value
}
// 取消按钮的回调
const cancel = () => {
  scene.value = !scene.value
}
// 添加属性值按钮的回调
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值编辑模式与
  })
}
// 保存按钮的回调
const save = async () => {
  // 发请求
  const result = await reqAddOrUpdateAttr(attrParams)
  // 添加或修改属性已经成功
  if (result.code == 200) {
    scene.value = !scene.value
    // 提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 获取全部已有的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
// 属性值表单元素失去焦点的方法
const toLook = (row: AttrValue) => {
  row.flag = false
}
// 进入到编辑模式
const toEdit = (row: AttrValue) => {
  row.flag = true
}
</script>

<style lang="scss" scoped></style>
