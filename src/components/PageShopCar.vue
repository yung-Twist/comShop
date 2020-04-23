<template>
  <div class="PageShopCar">
    <div class="shopCarNum">
      <div class="shopCarIcon">
        <van-icon
          name="cart-o"
          size="1.5rem"
          color="#fff"
          :badge="badge"
          @click="$router.push('/shopcar')"
        />
      </div>
    </div>
    <van-button type="danger" style="height:8vh;" size="normal" @click="submitOrder">去结算</van-button>
  </div>
</template>
<script>
export default {
  name: "PageShopCar",
  props: {
    badge: Number
  },
  data() {
    return {};
  },
  methods: {
    submitOrder() {
      this.$emit("submitOrder");
    }
  }
};
</script>
<style scoped lang='less'>
@import url("../style/base");
.PageShopCar {
  width: 100vw;
  background-color: #313131;
  height: 8vh;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  .shopCarNum {
    .shopCarIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: @mainColor;
      padding: 2px;
    }
  }
}
</style>