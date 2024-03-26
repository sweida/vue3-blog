<template>
  <div class="center">
    <img src="@/assets/404.webp">
    <p>您所访问的页面无法找到，请尝试返回首页</p>
    <a class="goback" href="/">返回首页</a>
  </div>
</template>


<style lang='less'>
.center {
  height: 100%;
  max-width: 700px;
  margin: 0 auto 40px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 18px;
  color: #eb387d;
  text-align: center;

  img {
    width: 100%;
  }

  .goback {
    width: 100px;
    height: 40px;
    background: #eb387d;
    border-radius: 5px;
    display: block;
    line-height: 40px;
    color: #fff;
    margin: auto;
  }
}
</style>
