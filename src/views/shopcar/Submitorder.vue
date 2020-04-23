<template>
  <div class="SubmitOrder">
    <Head />
    <!-- 收货地址 -->
    <van-cell value="选择收货地址" />
    <van-cell
      v-if="addresslist.length > 0"
      center
      :title="addresslist[0].name"
      :value="addresslist[0].tel"
      :label="addresslist[0].province + addresslist[0].city + addresslist[0].county + addresslist[0].addressDetail"
      is-link
      icon="location-o"
      @click="$router.push('/site')"
    />
    <van-cell title="前往添加收货地址" is-link v-else @click="$router.push('/site')"></van-cell>
    <!-- 订单信息 -->
    <van-cell value="订单信息" />
    <div class="orderInfo">
      <div class="shopcardata">
        <van-card
          v-for="(item, index) in carlist"
          :key="index"
          :title="item.name"
          :num="item.cartNumber"
          :price="item.price.toFixed(2)"
          :origin-price="item.originPrice.toFixed(2)"
          :desc="item.itro"
          :thumb="item.pic"
        />
      </div>
    </div>
    <!-- 提交 -->
    <van-submit-bar :price="30502" button-text="提交订单" @submit="sebmitOrder" />
    <!-- <div class="submitBtn">
      <van-button color="#ee0a24" size="large" @click="sebmitOrder">提交订单</van-button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "SubmitOrder",
  data() {
    return {
      addresslist: [
        {
          name: "谢鹏",
          tel: 13767617361,
          province: "福建省",
          city: "漳州市",
          county: "龙海市",
          addressDetail: "了空间阿飞",
          isDefault: 1,
          addressId: 1
        },
        {
          name: "小李",
          tel: 13767617361,
          province: "福建省",
          city: "漳州市",
          county: "龙文区",
          addressDetail: "万达写字楼",
          isDefault: 2,
          addressId: 3
        }
      ],
      dataType: "", //1:购物车数据,2立即购买数据
      carlist: [], //购物车商品数据
      goodsinfo: {} //立即购买商品数据
    };
  },
  mounted() {
    this.getGoodsDetail();
    // console.log(this.$route.query.order_id);
  },
  methods: {
    // 获取商品详情
    getGoodsDetail() {
      this.$axios.post("/api/shopCarGoods", {}).then(res => {
        this.carlist = res;
      });
    },
    // 提交订单
    sebmitOrder() {
      this.$toast("订单提交成功");
      this.$router.push("/mine");
    }
  }
};
</script>

<style lang="less" scoped>
.SubmitOrder {
  // background-color: #fafafa;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 10vh;

  .SubmitOrderStore {
    .orderAddress {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0.5rem 0.5rem;
      // margin-top: 1rem;
      background-color: #fff;

      .orderAddressContent {
        flex: 1;
        padding: 0 1rem;

        .addressItemHead {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          color: #000;
        }

        .addressItemcontent {
          color: #999;
          font-size: 0.8rem;
          margin: 0.5rem 0;
        }

        .addressItemChange {
          font-size: 0.6rem;
          color: #f40;
        }
      }
    }
  }

  .orderInfo {
    background-color: #fff;
  }

  .submitBtn {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
}
</style>
