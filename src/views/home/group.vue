<template>
  <div class="Group">
    <Head />
    <div class="secondAdvance">
      <div :class="{todaySecond:true,SecondActive:activeName == 1}" @click="todaySecond">
        <span>HOT</span>
        <span>今日必拼</span>
      </div>
      <p>|</p>
      <div :class="{tomorrowSecond:true,SecondActive:activeName == 2}" @click="tomottowSecond">
        <span>10:00</span>
        <span>明天预告</span>
      </div>
    </div>
    <div class="secondCount" v-if="activeName == 1">
      <span>距拼团结束还有：</span>
      <CountDown
        :secondStartTime="Date.parse(new Date('2020/4/21 23:50:00')) - Date.parse(new Date())"
        @countDownFinish="countDownFinish"
      />
    </div>
    <GoodsItem
      v-for="(item, index) in goodslist"
      :key="index"
      :title="item.name"
      :pic="item.pic"
      :intro="item.itro"
      :price="item.price"
      :originPrice="item.originPrice"
      :sale="item.sale"
      :isGroup="item.isGroup"
      @addShopCar="addShopCar(item)"
      @toGoodsDetail="toGoodsDetail(item)"
      @addNum="toGoodsDetail(item)"
    />
  </div>
</template>
<script>
export default {
  name: "Group",
  data() {
    return {
      goodslist: [],
      activeName: 1
    };
  },
  methods: {
    // 获取热门商品
    async getdata() {
      await this.$axios.post("/api/groupGoods", {}).then(res => {
        // console.log(res);
        this.goodslist = res;
      });
    },
    // 添加购物车
    addShopCar() {
      console.log("添加购物车");
    }, // 商品详情
    toGoodsDetail(item) {
      // console.log(123);
      this.$router.push("/goodsgroupdetail");
    },
    // 今日疯抢
    todaySecond() {
      this.activeName = 1;
      this.getdata();
    },
    // 明天必抢
    tomottowSecond() {
      this.activeName = 2;
      this.getdata();
    },
    // 倒计时结束
    countDownFinish() {
      console.log("倒计时结束");
    }
  },
  mounted() {
    this.getdata();
  },
  components: {
    GoodsItem: () => import("@/components/GoodsItem"),
    CountDown: () => import("@/components/CountDown")
  }
};
</script>
<style scoped lang='less'>
@import url("../../style/base");
.Group {
  .secondAdvance {
    background-color: @mainColor;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
    padding: 1rem 2rem;
    .todaySecond,
    .tomorrowSecond {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 300;
    }
    .SecondActive {
      font-weight: 500;
    }
  }
  .secondCount {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2vw;
    span {
      color: #000;
    }
  }
}
</style>