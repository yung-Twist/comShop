<template>
  <div class="Editsite">
    <Head />
    <van-form validate-first @submit="submit">
      <van-field
        v-model="addressForm.addressName"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required:true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="addressForm.addressPhone"
        label="手机"
        placeholder="手机"
        :rules="[{ pattern, message: '请填写正确的手机号' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="site"
        label="地址"
        placeholder="点击选择城市"
        @click="showPickerSite = true"
        :rules="[{ required:true, message: '请选择地址' }]"
      />
      <van-field
        v-model="addressForm.addressContent"
        label="详细地址"
        placeholder="详细地址"
        :rules="[{ required:true, message: '请填写详细地址' }]"
      />
      <van-field name="switch" label="设为默认地址">
        <template #input>
          <van-switch v-model="vanSwitch " @change="changeSwitch" size="20" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block color="#ee0a24">提交</van-button>
      </div>
    </van-form>
    <!-- 城市选择弹出层 -->
    <van-popup v-model="showPickerSite" position="bottom" style="width:100vw;">
      <van-area
        :area-list="areaList"
        @confirm="onSelected"
        @cancel="showPickerSite = false;"
        style="width:100vw!important;"
      />
    </van-popup>
  </div>
</template>
<script>
import areaList from "../../utils/area";
let addressForm = {
  addressName: "",
  addressPhone: "",
  addressProvince: "",
  addressCity: "",
  addressCounty: "",
  addressContent: "",
  addressIsDefault: ""
};
export default {
  name: "Editsite",
  data() {
    return {
      addressForm: Object.assign({}, addressForm),
      areaList,
      pattern: /^[1][3-9][0-9]{9}$/,
      value: "",
      showPickerSite: false,
      vanSwitch: false
    };
  },
  computed: {
    site() {
      return (
        this.addressForm.addressProvince +
        this.addressForm.addressCity +
        this.addressForm.addressCounty
      );
    }
  },
  created() {
    // console.log(this.$refs.AddressEdit);
    // this.getdata();
  },
  methods: {
    getdata() {
      this.$nextTick(() => {
        if (this.$route.query.id) {
          this.$axios
            .post("/v1/index/address/info", { addressId: this.$route.query.id })
            .then(res => {
              this.addressForm = res;
              if (this.addressForm.addressIsDefault == 1) {
                this.vanSwitch = true;
              } else {
                this.vanSwitch = false;
              }
            });
        }
      });
    },
    changeSwitch(value) {
      // console.log(value);
      if (value) {
        this.addressForm.addressIsDefault = 1;
      } else {
        this.addressForm.addressIsDefault = 0;
      }
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    onSubmit(values) {
      // console.log("submit", values);
    },
    // 选择地址
    onSelected(data) {
      // console.log(data)
      this.addressForm.addressProvince = data[0].name;
      this.addressForm.addressCity = data[1].name;
      this.addressForm.addressCounty = data[2].name;
      this.showPickerSite = false;
    },
    submit() {
      // console.log(this.$route.query.type);
      // if (this.$route.query.type == "add") {
      //   this.$axios
      //     .post("/v1/index/address/add", this.addressForm)
      //     .then(res => {
      //       this.$toast("添加地址成功");
      //       this.$router.back(-1);
      //     });
      // } else {
      //   this.$axios
      //     .post("/v1/index/address/edit", this.addressForm)
      //     .then(res => {
      //       this.$toast("编辑地址成功");
      //       this.$router.back(-1);
      //     });
      // }
    }
  }
};
</script>
<style scoped lang='less'>
.Editsite {
}
</style>