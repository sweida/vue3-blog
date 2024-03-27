<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import '@/style/index.less'
</script>

<template>
  <Header v-if="!$route.meta.notPortal" />
  <!-- router-view :   路由的整个出口, 用来显示和 URL 对应的组件; -->
  <!-- key是重点 -->
  <router-view v-slot="{ Component }" class="warp slide animate03">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>

  <Footer v-if="!$route.meta.notPortal" />
</template>

<script>
export default {}
</script>

<style scoped lang="less"></style>
