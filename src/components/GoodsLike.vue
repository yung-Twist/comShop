<template>
  <div class="GoodsDetailLike">
    <img :src="pic" alt class="GoodsDetailLikeImg" />
    <p class="GoodsDetailLikeTitle">{{name}}</p>
    <p class="GoodsDetailLikePrice">¥{{price.toFixed(2)}}</p>
  </div>
</template>
<script>
export default {
  name: "GoodsDetailLike",
  props: {
    name: String,
    price: String | Number,
    pic: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang='less'>
@import url("../style/base");
.GoodsDetailLike {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  .GoodsDetailLikeImg {
    width: 100%;
  }
  .GoodsDetailLikeTitle {
    margin: 0.5rem 0;
  }
  .GoodsDetailLikePrice {
    color: @mainColor;
  }
}
</style>