<template>
  <div class="Sitemanage">
    <Head />
    <ul class="addressWrap">
      <van-radio-group v-model="defaultAddressId" @change="defailtAddress">
        <li class="addressItem" v-for="(item, index) in addresslist" :key="index">
          <div class="addressItemHead">
            <p class="addressItemName">{{item.name}}</p>
            <p class="addressItemTel">{{item.tel}}</p>
          </div>
          <div
            class="addressItemcontent"
          >{{item.province}}{{item.city}}{{item.county}}{{item.addressDetail}}</div>
          <div class="addressItemBottom">
            <van-radio checked-color="#ee0a24" :name="item.addressId">默认地址</van-radio>
            <div class="addressItemEdit">
              <van-button plain hairline type="info" size="mini" @click="editSite(item)">编辑</van-button>
              <van-button
                plain
                hairline
                type="danger"
                size="mini"
                @click="delSite(item.addressId)"
              >删除</van-button>
            </div>
          </div>
        </li>
      </van-radio-group>
    </ul>
    <!-- 新增地址 -->
    <div class="addAddress">
      <van-button color="#ee0a24" size="large" @click="toAddAddress">新增地址</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sitemanage",
  data() {
    return {
      defaultAddressId: 1,
      addresslist: [
        {
          name: "谢鹏",
          tel: 13767617361,
          province: "福建省",
          city: "漳州市",
          county: "龙海市",
          addressDetail: "了空间阿飞",
          isDefault: 1,
          addressId: 1
        },
        {
          name: "小李",
          tel: 13767617361,
          province: "福建省",
          city: "漳州市",
          county: "龙文区",
          addressDetail: "万达写字楼",
          isDefault: 2,
          addressId: 3
        }
      ]
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    getData() {
      this.$axios.post("/v1/index/address/addressList", {}).then(res => {
        // console.log(res);
        this.addresslist = res;
        for (let item of res) {
          if (item.addressIsDefault == 1) {
            this.defaultAddressId = item.addressId;
            break;
          }
        }
      });
    },
    //   编辑地址
    editSite(item) {
      this.$router.push({
        path: "/editsite",
        query: {
          id: item.addressId,
          type: "edit"
        }
      });
    },
    // 新增地址
    toAddAddress() {
      this.$router.push({
        path: "/editsite",
        query: {
          type: "add"
        }
      });
    },
    //默认地址
    defailtAddress(id) {
      // console.log(id);
      const address = this.addresslist.find(item => {
        return item.addressIsDefault == 1;
      });
      // if (id != address.addressId) {
      //   this.$axios
      //     .post("/v1/index/address/setDefault", { addressId: id })
      //     .then(res => {
      //       this.$toast("默认地址设置成功");
      //     });
      // }
    },
    delSite(id) {
      // this.$axios.post("/v1/index/address/del", { addressId: id }).then(res => {
      //   this.$toast("删除地址成功");
      //   this.getData();
      // });
    }
  }
};
</script>
<style scoped lang='less'>
@flexrow : {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
};
.Sitemanage {
  background-color: #fafafa;
  height: 100vh;
  .addressWrap {
    .addressItem {
      background-color: #fff;
      box-sizing: border-box;
      padding: 1rem 0.5rem 0.5rem;
      margin-top: 1rem;
      .addressItemHead {
        @flexrow();
        color: #000;
      }
      .addressItemcontent {
        color: #999;
        font-size: 0.8rem;
        margin: 0.5rem 0;
      }
      .addressItemBottom {
        @flexrow();
      }
    }
  }
  .addAddress {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
}
</style>