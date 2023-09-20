<!-- svg封装 -->
<template>
  <div>
    <!-- svg是图标外层容器节点，内部需要与use标签结合使用 -->
    <svg :style="{ width, height }">
      <!--  xlink:href 属性来执行用哪一个图标 ,属性值务必#icon-图标的名字 -->
      <!-- use的fill属性可以设置图标的颜色 ,如果没有设置成功在.svg文件中把fill属性删除-->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //提供的矢量的图标的名字
  name: String,
  //接收颜色
  color: {
    type: String,
    default: '',
  },
  //接收图标的宽度
  width: {
    type: String,
    default: '16px',
  },
  //接收图标的高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style lang="scss" scoped></style>
