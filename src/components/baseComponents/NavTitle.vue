<template>
  <div class="navTitle">
    <p class="navTitle-title">{{title}}</p>
    <div class="navTitle-more" v-if="more">
      <p @click="toClassify">查看更多</p>
      <img src="@/assets/imgs/go.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "navTitle",
  props: {
    title: String,
    more: Boolean
  },
  data() {
    return {};
  },
  methods: {
    toClassify() {
      this.$emit("toClassify");
    }
  }
};
</script>

<style lang='less' scoped>
@import url("../../style/base.less");
.navTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1vw 0;
  border-left: 3px solid @mainColor;
  margin-top: 1rem;
  .navTitle-title {
    font-size: 1rem;
    color: #000;
    margin-left: 1rem;
  }
  .navTitle-more {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      color: #999;
      margin-right: 0.2rem;
      font-style: 0.8rem;
    }
    img {
      width: 1rem;
    }
  }
  background-color: #fff;
}
</style>