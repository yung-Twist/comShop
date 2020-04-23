<template>
  <div class="Shopcar">
    <Head :rightworld="manage?'':'完成'" @onClickRight="manage = true"></Head>
    <!-- 删除 -->
    <div class="delShopCom">
      <p v-if="manage">共{{carlist.length}}件商品</p>
      <p v-else>批量删除</p>
      <van-button type="danger" plain round size="mini" @click="manage = false" v-if="manage">管理</van-button>
      <van-button type="danger" plain round size="mini" @click="delShopcarCom" v-else>删除</van-button>
    </div>
    <van-divider v-if="carlist.length == 0">购物车暂无商品，快去选择添加吧！</van-divider>
    <!-- 购物车列表 -->
    <div class="carlist" v-if="carlist.length > 0">
      <van-checkbox-group v-model="result">
        <div class="caritem" v-for="(item, index) in carlist" :key="index">
          <van-checkbox :name="item" checked-color="#ee0a24"></van-checkbox>
          <div class="item_info">
            <img :src="item.pic" alt />
            <div class="item_info_right">
              <h1>{{item.name}}</h1>
              <p>{{item.itro}}</p>
              <p></p>
              <div class="item_info_price_num">
                <span>￥{{item.price.toFixed(2)}}</span>
                <van-stepper v-model="item.cartNumber" @change="editcarnum(item)" />
              </div>
            </div>
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <!-- 计算 -->
    <div class="paybill">
      <van-submit-bar
        :price="totalmoney"
        button-text="提交"
        @submit="topayorder"
        style="background-color:#ee0a24;"
      >
        <van-checkbox v-model="checkedall" @change="checkedallorder" checked-color="#ee0a24">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopcar",
  data() {
    return {
      manage: true,
      carlist: [],
      list: [],
      result: [],
      checkedall: false,
      storeList: [],
      storeId: "",
      show: false,
      showStore: false,
      addressList: [],
      showAddress: {},
      buyNum: {},
      showQrcode: false,
      qrCodePic: "",
      editType: 1 //1：加入购物车 2：立即购买
    };
  },
  computed: {
    totalmoney() {
      let allmoney = 0;
      for (let e of this.result) {
        allmoney += e.price * e.cartNumber;
      }
      return allmoney * 100;
    }
  },
  mounted() {
    this.getdata();
    // this.getStoreList()
    // this.getBuyNum()
  },
  methods: {
    // 获取数据
    getdata() {
      this.$axios.post("/api/shopCarGoods", {}).then(res => {
        this.carlist = res;
      });
    },
    // 提交订单
    topayorder() {
      let carlist = [];
      for (let e of this.result) {
        carlist.push(e.cartId);
      }
      // console.log(carlist)
      if (carlist.length == 0) {
        this.$toast("请添加购物车");
      } else {
        this.$router.push({
          path: "/submitorder",
          query: {
            cartList: carlist
          }
        });
      }
    },
    // 全选
    checkedallorder() {
      if (this.checkedall) {
        for (let e of this.carlist) {
          if (this.result.indexOf(e) == -1) {
            this.result.push(e);
          }
        }
      } else {
        this.result = [];
      }
    },
    //增加减少购物车数
    editcarnum(row) {
      console.log(row);
    },
    // 从购物车中删除商品
    delgoods(row) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要将该商品从购车车中删除吗？"
        })
        .then(() => {
          // axios
          //   .post("/index/cart/del.html", {
          //     cart_id: row.cart_id
          //   })
          //   .then(res => {
          //     this.$toast.success(res.msg);
          //     this.getdata();
          //   });
        })
        .catch(() => {
          this.$toast("已取消");
        });
    },
    // 批量删除
    delShopcarCom() {
      if (this.result.length == 0) {
        this.$toast("您的购物车已经是空的了~");
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除购物车吗？"
          })
          .then(() => {
            // for (let e of this.result) {
            // this.$axios
            //   .post("/v1/index/cart/del", { cartId: e.cartId })
            //   .then(res => {
            //     this.getdata();
            //     this.result = [];
            //   });
            // }
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 收货地址
    getAddress() {
      this.$axios.post("/v1/index/address/addressList", {}).then(res => {
        // console.log(res)
        this.addressList = res;
        this.showAddress = res.length > 0 ? res[0] : {};
      });
    },
    // 选择收货地址
    setAddress(item) {
      this.showAddress = item;
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/base.less");

@flexrow : {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
};

.Shopcar {
  box-sizing: border-box;
  padding-bottom: 10vh;

  .delShopCom {
    padding: 0 2vw;
    background-color: @mainColor;
    height: 4vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p {
      color: #fff;
      font-size: 0.8rem;
    }
  }

  .carlist {
    overflow: scroll;
    width: 96vw;
    margin: auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;

    .caritem {
      // margin-bottom: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebedf0;
      box-sizing: border-box;
      padding: 1rem;

      .item_info {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 0.5rem;

        img {
          width: 20vw;
          height: 20vw;
        }

        .item_info_right {
          flex: 1;
          height: 20vw;
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
          justify-content: space-between;

          h1 {
            color: #333;
            font-family: "PingFang SC";
          }

          p {
            color: #999;
            font-size: 0.8rem;
          }

          .item_info_price_num {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            span {
              font-size: 0.8rem;
              color: #ff5339;
            }
          }
        }
      }

      .van-checkbox {
        .van-icon {
          border-color: @mainColor;
        }

        span {
          color: #fff;
        }
      }
    }
  }

  .paybill {
    height: 8vh;
    width: 100vw;
    // background-color: #fff;
    position: fixed;
    bottom: 0;

    .topay {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-right: 1rem;

      p {
        margin-right: 1rem;
      }
    }

    .van-checkbox {
      margin-left: 0.5rem;

      .van-icon {
        border-color: #fff;
      }

      span {
        color: #fff;
      }
    }

    .van-button--danger {
      height: 60%;
      color: @mainColor;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 1rem;
      padding: 0.5rem 0;
      line-height: 60%;
    }

    .van-submit-bar__button--danger {
      background: #fff;
    }

    .van-submit-bar__text {
      span {
        color: #fff;
      }
    }
  }

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
  .selectStoreAddress {
    width: 96vw;
    padding: 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: auto;
  }
  .deliveryAddress {
    width: 96vw;
    padding: 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: auto;
  }
}
</style>
