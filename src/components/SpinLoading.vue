<template>
  <div class="spinner" v-if="isLoading">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  <slot v-else></slot>
</template>

<script>
import { watchEffect, ref } from 'vue';

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const isLoading = ref(props.isLoading)

    // 当props发生改变时会触发这里的逻辑
    watchEffect(() => {
      isLoading.value = props.isLoading
    });

    return {
      isLoading
    };
  },
};
</script>


<style scoped lang="less">
.spinner {
  margin: 100px auto 60px;
  width: 150px;
  text-align: center;

  &>div {
    width: 30px;
    height: 30px;
    background-color: #67CF22;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}


@keyframes bouncedelay {

  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {

  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }

  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>