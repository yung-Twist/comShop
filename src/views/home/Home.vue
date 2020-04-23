<template>
  <div class="home">
    <Head noback></Head>
    <!-- <Search @search="search" :keyword="keyword" /> -->
    <!-- 轮播图 -->
    <Swiper :carouselList="swiperlist" />
    <!-- 秒杀拼团入口 -->
    <div class="secondGroup">
      <div
        class="secondGroupItem"
        v-for="(item, index) in secondgrouplist"
        :key="index"
        @click="toPrefecture(item)"
      >
        <img :src="item.pic" alt />
        <!-- <p>{{item.name}}</p> -->
      </div>
    </div>
    <!-- 商品分类 -->
    <div class="homeGoodsList">
      <div class="homeGoodsListItem" v-for="(item, index) in goodslist" :key="index">
        <NavTitle :title="item.classifyName" />
        <van-grid :border="false" :column-num="2">
          <van-grid-item
            v-for="(item2, index2) in item.goodslist"
            :key="index2"
            @click="toGoodsDetail"
          >
            <GoodsItem2
              :name="item2.name"
              :pic="item2.pic"
              :price="item2.price"
              :originPrice="item2.originPrice"
            />
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      swiperlist: [],
      goodslist: [],
      secondgrouplist: []
    };
  },
  methods: {
    // 获取轮播图数据
    getSwiper() {
      this.$axios.post("/api/getswiper", {}).then(res => {
        // console.log(res);
        this.swiperlist = res;
      });
    },
    // 获取分类和商品
    async getdata() {
      await this.$axios.post("api/home/goods", {}).then(res => {
        // console.log(res);
        this.goodslist = res;
      });
    },
    // 获取拼团秒杀专区
    getSecondGroup() {
      this.$axios.post("/api/secondgrout", {}).then(res => {
        this.secondgrouplist = res;
      });
    },
    // 前往专区
    toPrefecture(item) {
      if (item.id == 1) {
        this.$router.push("/second");
      } else {
        this.$router.push("/group");
      }
    },
    // 商品详情
    toGoodsDetail(item) {
      // console.log(123);
      this.$router.push("/goodsdetail");
    }
  },
  mounted() {
    this.getSwiper();
    this.getdata();
    this.getSecondGroup();
  },
  components: {
    Swiper: () => import("@/components/Swiper"),
    GoodsItem2: () => import("@/components/GoodsItem2")
  }
};
</script>

<style scoped lang="less">
@import url("../../style/base.less");
.home {
  .home-notice {
    width: 96vw;
    border-radius: 1rem;
    overflow: hidden;
    margin: auto;
  }
  .system_record_number {
    text-align: center;
    color: #ddd;
    margin-top: 2rem;
    font-size: 0.8rem;
  }
  .secondGroup {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    // padding: 0 2vw;
  }
}
</style>
