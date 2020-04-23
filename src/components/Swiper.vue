<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in carouselList" :key="index" @click="linkTopage(item)">
        <div class="home-bannerImg">
          <img :src="item.carouselImageImagePath" alt />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    carouselList: Array
  },
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    getdata() {
      this.$axios.post("/v1/index/common/carouselList", {}).then(res => {
        // console.log(res);
        this.dataList = res;
      });
    },
    linkTopage(item) {
      // console.log(item);
      this.$router.push(item.carouselImagePath);
    }
  },
  mounted() {
    // this.getdata();
  }
};
</script>

<style lang='less' scoped>
.swiper {
  // margin-top: 8px;
  .home-bannerImg {
    text-align: center;
    img {
      width: 100vw;
      height: 30vh;
    }
  }
}
</style>