<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import '@/style/index.less'
</script>

<template>
  <Header v-if="!$route.meta.notPortal" />
  <!-- router-view :   路由的整个出口, 用来显示和 URL 对应的组件; -->
  <!-- keep-alive 是Vue提供的一个抽象组件，主要用于保留组件状态或避免重新渲染。 -->
  <router-view v-slot="{ Component }" class="warp slide animate03">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
    <!-- <component v-if="!$route.meta.keepAlive" :is="Component" /> -->
  </router-view>

  <Footer v-if="!$route.meta.notPortal" />
</template>

<script>
export default {}
</script>

<style scoped lang="less"></style>
