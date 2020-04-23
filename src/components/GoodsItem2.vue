<template>
  <div class="GoodsItem2">
    <img :src="pic" alt class="GoodsItem2Img" />
    <p class="GoodsItem2Title van-ellipsis">{{name}}</p>
    <p class="GoodsItem2Price">¥{{price.toFixed(2)}}</p>
  </div>
</template>
<script>
export default {
  name: "GoodsItem2",
  props: {
    name: String,
    price: String | Number,
    pic: String,
    originPrice: String | Number
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang='less'>
@import url("../style/base");
.GoodsItem2 {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .GoodsItem2Img {
    width: 100%;
    height: 24vh;
  }
  .GoodsItem2Title {
    margin: 0.5rem 0;
  }
  .GoodsItem2Price {
    color: @mainColor;
  }
}
</style>