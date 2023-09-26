<!-- trademark -->
<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus" @click="addTradeMark">
      添加品牌
    </el-button>
    <!-- 表格组件、用于展示已有的平台数据 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <!-- el-table-column 默认展示数据用div -->
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updataTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}吗?`"
            width="200px"
            icon="delete"
            icon-color="red"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 
        v-model:current-page：设置分页器当前页码
        v-model:page-size：设置每一个展示数据的条数
        page-sizes:用于设置下拉菜单数据
        background：设置分页器按钮的背景颜色
        layout:可以设置分页器六个子组件布局调整
    -->
    <el-pagination
      @size-change="getHasTradeMark"
      @current-change="changePageNo"
      :pager-count="9"
      v-model:current-page="currentPage4"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    />
  </el-card>
  <!-- 对话框组件，在增加与修改已有品牌业务时使用 -->
  <!-- 
    v-model属性:用户控制对话框的显示与隐藏 true显示 false隐藏
    title：设置对话框左上角标题
  -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder="请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
        <!-- 
          action:请求的url
         -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 具名插槽 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  reqHasTradeMark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import { TradeMark, type Records } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
// 当前页码
const currentPage4 = ref<number>(1)
// 每一页展示多少条数据
const limit = ref<number>(3)
// 存储已有品牌数据的总量
const total = ref<number>(0)
// 存储已有品牌的数组
const trademarkArr = ref<Records>([])
// 控制对话框的显示与隐藏
const dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件实例
const formRef = ref()
// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，只要再次调用函数即可
const getHasTradeMark = async (pageNo = 1) => {
  const result = await reqHasTradeMark(pageNo, limit.value)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(async () => {
  await getHasTradeMark()
})
// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前的页码）
const changePageNo = () => {
  // 当前页码发生变化时再次发请求
  getHasTradeMark(currentPage4.value)
}
// 添加品牌
const addTradeMark = () => {
  // 将收集的数据清空
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogFormVisible.value = true
  // 清除错误提示
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}
// 修改已有品牌
const updataTrademark = (row: any) => {
  // 清除错误提示
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  //  显示对话框
  dialogFormVisible.value = true
  // es6语法合并对象
  Object.assign(trademarkParams, row)
  console.log(row)

  // trademarkParams.id = row.id
  // // 展示已有数据
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
}
// 对话框底部取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}
// 对话框底部确定按钮
const confirm = async () => {
  // 在发请求之前需要对整个表单进行校验
  // 调用这个方法进行全部的表单校验，如果校验全部通过，在执行后面的语法
  await formRef.value.validate()
  const result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    // 添加成功
    // 1.关闭对话框
    dialogFormVisible.value = false
    // 2.弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    // 3.再次发请求获取已有全部的品牌数据
    getHasTradeMark(trademarkParams.id ? currentPage4.value : 1)
  } else {
    dialogFormVisible.value = false
    // 添加失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败',
    })
  }
}
// 上传图片之前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('Avatar picture must be JPG/PNG/GIF format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
// 图片成功上传钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response即为当前这次上传图片post请求，服务器返回的响应数据
  // 收集上传图片的地址，添加一个新的品牌的时候
  trademarkParams.logoUrl = response.data
  // 图片上传成功清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}
// 对tmName的校验
const validatorTmName = (rule, value, callback) => {
  // 当表单元素触发blur事件的时候会触发此方法
  if (value.trim().length >= 2) {
    callback()
  } else {
    // 校验未通过返回的错误的提示信息
    callback(new Error('品牌名称位数大于等于两位'))
  }
}
// 对logo图片的自定义校验规则方法
const validatorLogoUrl = (rule, value, callback) => {
  // 如果图片上传
  if (value) {
    callback()
  } else {
    callback(new Error('Logo图片必须上传'))
  }
}
// 表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
// 删除气泡确认框，确定按钮的回调
const removeTradeMark = async (id: number) => {
  // 点击确定按钮删除已有品牌请求
  const result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 再次获取已有的品牌数据
    getHasTradeMark(
      trademarkArr.value.length > 1
        ? currentPage4.value
        : currentPage4.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
