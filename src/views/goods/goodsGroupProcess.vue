<template>
  <div class="SubmitOrder">
    <Head />
    <!-- 订单信息 -->
    <van-steps :active="active">
      <van-step>发起拼团</van-step>
      <van-step>邀请好友参团</van-step>
      <van-step>评团成功</van-step>
    </van-steps>
    <div class="hasJoinUser">
      <img
        :src="item.avator"
        alt
        v-for="(item, index) in joinGroupItemData.hasJoinGroup"
        :key="index"
      />
      <div class="ItemGroupResidueWrap" v-if="joinGroupItemData.hasJoinGroup">
        <div
          class="ItemGroupResidueItem"
          v-for="(item, index) in joinGroupItemData.groupCount - joinGroupItemData.hasJoinGroup.length"
          :key="index"
        >
          <span>?</span>
        </div>
      </div>
    </div>
    <div class="orderInfo">
      <div class="shopcardata">
        <van-card
          v-if="goodsinfo.price"
          :title="goodsinfo.name"
          :num="goodsinfo.cartNumber"
          :price="goodsinfo.price.toFixed(2)"
          :origin-price="goodsinfo.originPrice.toFixed(2)"
          :desc="goodsinfo.itro"
          :thumb="goodsinfo.pic"
        />
        <van-cell title="合计" :value="(goodsinfo.cartNumber*goodsinfo.price).toFixed(2)" />
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-button type="danger" text="分享好友" @click="shareGroup" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "GoodsGroupProcess",
  data() {
    return {
      addresslist: [
        {
          name: "严斌",
          tel: 13767617361,
          province: "福建省",
          city: "漳州市",
          county: "龙海市",
          addressDetail: "宅前小学",
          isDefault: 1,
          id: 1
        },
        {
          name: "小李",
          tel: 13767617361,
          province: "福建省",
          city: "漳州市",
          county: "龙文区",
          addressDetail: "万达写字楼b座2410",
          isDefault: 2,
          id: 3
        }
      ],
      active: 1,
      joinGroupItemData: {},
      goodsinfo: {} //购物车商品数据
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getGoodsDetail();
      this.getGroupProcess();
    });
    // console.log(this.$route.query.order_id);
  },
  methods: {
    // 获取商品详情
    getGoodsDetail() {
      this.$axios.post("/api/subGroupGoods", {}).then(res => {
        console.log(res);
        this.goodsinfo = res;
      });
    },
    // 获取商品拼团信息
    getGroupProcess() {
      this.$axios.post("/api/groupGroupProcress", {}).then(res => {
        console.log(res);
        this.joinGroupItemData = res;
      });
    },
    // 分享好友
    shareGroup() {
      this.$toast("分享好友");
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
  .hasJoinUser {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      border: 1px solid #ffb549;
      margin-left: 10px;
    }
    .ItemGroupResidueWrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      .ItemGroupResidueItem {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #bbb;
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        border: 1px dashed #bbb;
        margin-left: 10px;
      }
    }
  }
}
</style>
