<template>
  <div class="CountDown">
    <van-count-down :time="secondStartTime" @finish="countdownfinish">
      <template v-slot="timeData">
        <!-- <span class="item">{{ timeData.days }}</span>天 -->
        <span class="item">{{ timeData.hours }}</span>小时
        <span class="item">{{ timeData.minutes }}</span>分钟
        <span class="item">{{ timeData.seconds }}</span>秒
      </template>
    </van-count-down>
  </div>
</template>
<script>
export default {
  name: "CountDown",
  data() {
    return {};
  },
  props: {
    secondStartTime: String | Number
  },
  methods: {
    countdownfinish() {
      this.$emit("countDownFinish");
    }
  }
};
</script>
<style scoped lang='less'>
.CountDown {
  .item {
    display: inline-block;
    width: 22px;
    margin-right: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
  }
}
</style>