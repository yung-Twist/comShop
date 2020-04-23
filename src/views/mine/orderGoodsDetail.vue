<template>
  <div class="OrderGoodsDetail">
    <Head />
    <!-- 订单信息 -->
    <div class="groupInfo" v-if="orderStatus == 3">
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
    </div>
    <div class="getGoodsCode">
      <div class="getGoodsCodeHeader">
        <div class="getGoodsCodeHeaderLeft">
          <p class="goodsStore">{{storeName}}</p>
          <p class="goodsStoreAddress">{{storeAddress}}</p>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="getGoodsCodeContent">
        <p class="goodsCodeWord">取货码</p>
        <p class="goodsCode">E221</p>
        <span>请向商家出示取货码</span>
      </div>
    </div>
    <van-cell-group>
      <van-cell :title="storeName" :value="storeAddress" />
    </van-cell-group>
    <div class="getGoodsCodeGoodsInfo">
      <van-card
        v-for="(item, index) in goodsInfo.orderGoodsList"
        :key="index"
        :num="item.orderGoodsNumber"
        :price="item.orderGoodsPrice.toFixed(2)"
        :desc="item.orderGoodsSpecContent"
        :title="item.orderGoodsGoodsName"
        :thumb="item.orderGoodsImagePath"
      />
    </div>
    <div class="paymoney">
      <p></p>
      <p>合计:¥332.32</p>
    </div>
    <van-cell-group>
      <van-cell title="订单号" :value="goodsInfo.orderNumber" />
      <van-cell title="下单时间" value="2020-4-14 10:22:00" />
      <van-cell title="取货时间" value="2020-4-15 00:00:00前" />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: "OrderGoodsDetail",
  data() {
    return {
      storeName: localStorage.getItem("storeName"),
      storeAddress: localStorage.getItem("storeAddress"),
      goodsInfo: {},
      orderStatus: this.$route.query.orderStatus,
      active: 2,
      joinGroupItemData: {}
    };
  },
  mounted() {
    this.getdata();
    this.getGroupProcess();
  },
  methods: {
    getdata() {
      this.$axios.post("/api/orderdetail", {}).then(res => {
        // console.log(res);
        this.goodsInfo = res;
      });
    },
    // 获取商品拼团信息
    getGroupProcess() {
      this.$axios.post("/api/groupOrderProcress", {}).then(res => {
        console.log(res);
        this.joinGroupItemData = res;
      });
    }
  }
};
</script>
<style scoped lang='less'>
@import url("../../style/base");
.OrderGoodsDetail {
  .getGoodsCode {
    width: 80vw;
    margin: 2vh auto;
    // border: @comborder;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 1rem;
    .getGoodsCodeHeader {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: @comborder;
      .getGoodsCodeHeaderLeft {
        font-size: 0.8rem;
        .goodsStore {
          color: #000;
        }
        .goodsStoreAddress {
          color: #ccc;
          margin-top: 0.5rem;
        }
      }
    }
    .getGoodsCodeContent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      .goodsCodeWord {
        font-size: 0.8rem;
      }
      .goodsCode {
        color: @mainColor;
        font-size: 1.2rem;
        margin: 1rem;
      }
      span {
        font-size: 0.8rem;
      }
    }
  }
  .getGoodsCodeGoodsInfo {
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
  .paymoney {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // color: @mainColor;
    color: #000;
    font-weight: 700;
  }
}
</style>