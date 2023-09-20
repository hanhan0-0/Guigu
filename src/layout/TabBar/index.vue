<!-- 顶部导航 -->
<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <BreadCrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, rgb(250, 208, 215), white);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
