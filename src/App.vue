<template>
    <div class="container" :style="containerStyle">
        <component :is="isMobile ? MCalculatorPage : PcCalculatorPage" />
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import PcCalculatorPage from './components/PcCalculatorPage.vue';
import MCalculatorPage from './components/MCalculatorPage.vue';
import utils from './utils';
import CustomizedData from '../CustomizedData.json';
const isMobile = utils.isMobile();

const containerStyle = {
    // backgroundImage: `url(${CustomizedData.bg})`
    backgroundImage: 'url(https://fastly.picsum.photos/id/518/1920/1080.jpg?hmac=yW2qvv7jVIo8fbpROaX6kzcR0ZBwogUgl0xsDRJWabA)'
};

onMounted(() => {
    document.title = CustomizedData.tabTitle || 'VPS剩余价值计算器';
});

</script>
<style lang="less">
.container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
}
</style>
