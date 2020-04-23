<template>
  <div class="SpecItem">
    <div class="buyOperateHeader">
      <img :src="pic" alt />
      <div class="buyOperateHeaderRight">
        <h1>{{title}}</h1>
        <div class="buyGoodsPrice">
          <p class="buyGoodsPricePrice">¥{{selectVipPrice.toFixed(2)}}</p>
          <!-- <p class="buyGoodsOriginPrice">¥{{originPrice}}</p> -->
        </div>
        <div class="selectedStock">剩余：{{selectedStock ? selectedStock : 0}}</div>
        <div class="selectedSpec" v-if="selectedSpec">已选：{{selectedSpec}}</div>
      </div>
    </div>
    <div class="goodsBuyOperate">
      <div class="spec_item" v-for="(item,index) in specTemp" :key="index">
        <p style="color: #000;margin:0.5rem 0;">{{item.spec_key}}</p>
        <div
          style="display:flex;flex-direction: row;padding:0 0 1rem 1rem;border-bottom:1px solid #ddd;flex-wrap:wrap;"
        >
          <p
            :style="item2.ischecked ? itemstyleA : itemstyle"
            class="spec_value_item"
            v-for="(item2,index2) in item.spec_checked"
            :key="index2"
            @click="clickSpec(index,index2,item2)"
          >{{item2.size}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpecItem",
  props: {
    pic: String,
    title: String,
    selectVipPrice: String | Number,
    originPrice: String | Number,
    itro: String,
    specTemp: Array,
    selectedSpec: String,
    selectedStock: Number | String,
    buyNum: Number | String
  },
  data() {
    return {
      itemstyle:
        "background: #f2f3f5;font-size:0.8rem;color: #323233;padding:8px;margin-left:6px;white-space:nowrap;margin-top:4px;border-radius: 4px;border:1px solid #f2f3f5;",
      itemstyleA:
        "background: #ffeded;font-size:0.8rem;color: #ee0a24;padding:8px;margin-left:6px;white-space:nowrap;margin-top:4px;border-radius: 4px;border:1px solid #ee0a24;"
    };
  },
  methods: {
    // 选择规格
    clickSpec(index, index2, item) {
      this.$emit("clickSpec", index, index2, item);
    }
  }
};
</script>
<style scoped lang='less'>
@import url("../style/base");
.SpecItem {
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
      .selectedStock {
        font-size: 0.8rem;
        line-height: 1rem;
      }
      .selectedSpec {
        font-size: 0.8rem;
        line-height: 1rem;
      }
    }
  }
  .goodsBuyOperate {
    padding: 0.5rem;
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