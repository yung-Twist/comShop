<template>
  <div class="AuthPhone">
    <Head />
    <van-cell-group>
      <van-field v-model="phone" required label="手机号" placeholder="请输入手机号" />
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="primary" size="large" style="margin-top:1rem;">确定</van-button>
  </div>
</template>
<script>
export default {
  name: "AuthPhone",
  data() {
    return {
      sms: "",
      phone: ""
    };
  },
  methods: {}
};
</script>
<style scoped lang='less'>
.AuthPhone {
}
</style>