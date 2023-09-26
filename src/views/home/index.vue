<!-- 主体 -->
<template>
  <div><el-button @click="sendReq">点击发送请求</el-button></div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const sendReq = () => {
  // userStore.userLogOut()
  userStore.userInfo()
}
</script>

<style lang="scss" scoped></style>
