<!-- logo -->
<template>
  <div class="logo">
    <SvgIcon
      :name="setting.logo"
      width="40px"
      height="40px"
      v-if="setting.logoHidden"
    ></SvgIcon>
    <p v-show="!layOutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  padding: 10px;
  p {
    margin-left: 10px;
    color: white;
    font-size: $base-logo-title-fontSize;
  }
}
</style>
