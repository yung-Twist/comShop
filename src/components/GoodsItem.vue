<template>
  <div>
    <div class="GoodsWrap" @click.prevent="toGoodsDetail">
      <div class="GoodsItem">
        <img :src="pic" alt />
        <div class="goodsContent">
          <div class="goodsNameTags">
            <p class="goodsName">{{title}}</p>
            <div class="goodsTags">
              <van-tag plain type="danger" v-if="isSecond == 1">秒杀</van-tag>
              <van-tag plain type="success" v-if="isGroup == 1">拼团</van-tag>
            </div>
          </div>
          <div class="goodsPrice">
            <p class="goodsPrice">¥{{price.toFixed(2)}}</p>
            <p class="goodsOriginPrice">¥{{originPrice.toFixed(2)}}</p>
          </div>
          <div class="goodsSaleNum">
            <p>已售:{{sale}}</p>
            <div class="changeBuyNum" v-if="isGroup != 1">
              <img v-show="buyNum > 0" :src="icon.reduce" alt @click.stop="reduceNum" />
              <p v-show="buyNum > 0">{{buyNum}}</p>
              <img :src="icon.add" alt @click.stop="addBtn" />
            </div>
            <div class="changeBuyNum" v-else>
              <van-button type="danger" size="mini">去拼团</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showGoodsInfo" position="bottom" :style="{ height: '40%' }">
      <div class="goodsBuyOperate">
        <div class="buyOperateHeader">
          <img :src="pic" alt />
          <div class="buyOperateHeaderRight">
            <h1>{{title}}</h1>
            <div class="buyGoodsPrice">
              <p class="buyGoodsPricePrice">¥{{price.toFixed(2)}}</p>
              <p class="buyGoodsOriginPrice">¥{{originPrice.toFixed(2)}}</p>
            </div>
          </div>
        </div>
        <div class="goodsBuyIntro">{{intro}}</div>
        <div class="goodsSaleNum">
          <p>数量</p>
          <div class="changeBuyNum">
            <img :src="icon.reduce" alt @click.stop="reduceNum" />
            <p>{{buyNum}}</p>
            <img :src="icon.add" alt @click.stop="addNum" />
          </div>
        </div>
        <van-button
          type="danger"
          size="large"
          style="position:fixed;bottom:0;"
          @click="showGoodsInfo = false"
        >确定</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "GoodsItem",
  props: {
    title: String, //商品明晨
    pic: String, //商品封面图
    intro: String, //商品简介
    price: Number, //商品价格
    originPrice: Number, //商品原价
    sale: Number, //销量
    isSecond: Number, //是否秒杀
    isGroup: Number, //是否拼团
    buyNum: Number, //购买数量
    secondStartTime: String | Number //秒杀开始事件
  },
  data() {
    return {
      icon: {
        add: require("../assets/images/加.png"),
        reduce: require("../assets/images/减.png")
      },
      showGoodsInfo: false,
      visible: false
    };
  },
  methods: {
    //加入购物车
    addShopCar() {
      this.$emit("addShopCar");
    },
    // 前往商品详情
    toGoodsDetail() {
      this.$emit("toGoodsDetail");
    },
    // 计时结束
    countdownfinish() {
      this.$emit("countDownFinish");
    },
    // 添加按钮,显示规格
    addBtn() {
      // this.showGoodsInfo = true;
      this.$emit("addBtn");
    },
    // 增加数量
    addNum() {
      this.$emit("addNum");
    },
    // 减少数量
    reduceNum() {
      this.$emit("reduceNum");
    },
    stopEvent() {}
  }
};
</script>
<style scoped lang='less'>
@import url("../style/base");
.GoodsWrap {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  .GoodsItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    img {
      width: 20vw;
      height: 20vw;
    }
    .goodsContent {
      flex: 1;
      display: flex;
      height: 20vw;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0.5rem;
      .goodsNameTags {
        display: flex;
        flex-direction: row;
        align-items: center;
        .goodsName {
          color: #000;
          overflow: hidden;
          width: 7rem;
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        .goodsTags {
          flex: 1;
          display: flex;
          flex-direction: row;
          white-space: nowrap;
          margin-left: 4px;
        }
      }
      .goodsPrice {
        display: flex;
        flex-direction: row;
        align-items: center;
        .goodsPrice {
          color: #f40;
          font-size: 1rem;
        }
        .goodsOriginPrice {
          color: #969799;
          font-size: 0.8rem;
          margin-left: 0.5rem;
          text-decoration: line-through;
        }
      }
      .goodsSaleNum {
        width: 100%;
        font-size: 0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .changeBuyNum {
          display: flex;
          flex-direction: row;
          align-items: center;
          p {
            margin: 0 8px;
          }
          img {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
  .secondTime {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      font-size: 12px;
      margin-right: 10px;
    }
    .item {
      display: inline-block;
      width: 22px;
      margin-right: 5px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      background-color: #1989fa;
    }
  }
}
.goodsBuyOperate {
  padding: 0.5rem 0;
  .buyOperateHeader {
    display: flex;
    flex-direction: row;
    border-bottom: @comborder;
    padding-bottom: 0.5rem;
    padding: 0.5rem;
    img {
      width: 20vw;
      height: 20vw;
    }
    .buyOperateHeaderRight {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      h1 {
        color: #000;
        font-size: 1.2rem;
      }
      .buyGoodsPrice {
        display: flex;
        flex-direction: row;
        .buyGoodsPricePrice {
          color: @mainColor;
        }
        .buyGoodsOriginPrice {
          margin-left: 0.5rem;
          text-decoration: line-through;
        }
      }
    }
  }
  .goodsBuyIntro {
    font-size: 0.8rem;
    padding: 0.5rem;
    line-height: 1rem;
  }
  .goodsSaleNum {
    width: 100%;
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    .changeBuyNum {
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        margin: 0 8px;
      }
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>