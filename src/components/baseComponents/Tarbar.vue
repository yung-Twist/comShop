<template>
  <div class="Tarbar">
    <van-tabbar v-model="active" route active-color="#ee0a24">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tarbar",
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
.Tarbar {
}
</style>
