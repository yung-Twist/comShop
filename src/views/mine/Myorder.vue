<template>
  <div class="Myorder">
    <Head />
    <van-tabs
      v-model="orderStatus"
      color="#ee0a24"
      title-active-color="#ee0a24"
      @click="changeOrderStatus"
    >
      <van-tab title="全部订单"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待成团"></van-tab>
      <van-tab title="已成团/待取货"></van-tab>
      <van-tab title="已完成"></van-tab>
      <van-tab title="已取消"></van-tab>
      <van-tab title="已退款"></van-tab>
    </van-tabs>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getdata">
      <div class="orderList">
        <div v-for="(item, index) in carlist" :key="index" class="orderListItem">
          <div class="orderListHeader">
            <p class="storeAddress">
              艾欧尼亚
              <van-icon name="arrow" />
            </p>
            <p
              class="orderStatus"
              @click="orderGoodsDetaile(item)"
            >{{item.orderStatus == 1 ? '待付款' :(item.orderStatus == 2 ? '待成团' : (item.orderStatus == 3 ? '已成团/待支付' : (item.orderStatus == 4 ? '已完成' : (item.orderStatus == 5 ? '已取消' : (item.orderStatus == 6 ? '已退款' : '')))))}}</p>
          </div>
          <div
            class="orderListContent"
            v-for="(item2, index2) in item.orderGoodsList"
            :key="index2"
          >
            <div class="orderListContentLeft" @click="godetail(item2)">
              <img :src="item2.orderGoodsImagePath" alt />
            </div>
            <div class="orderListContentRight">
              <div class="orderListContentTitle">
                <h1>{{item2.orderGoodsGoodsName}}</h1>
                <p>{{item2.orderGoodsPrice.toFixed(2)}}</p>
              </div>
              <div class="orderListContentIntro">
                <h1>{{item2.orderGoodsSpecContent}}</h1>
                <div class="rderListContentNumber">
                  <!-- <p class="rderListContentNumberOriginPrice">{{item2.goods_price}}</p> -->
                  <p>x{{item2.orderGoodsNumber}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="orderListBottom">
            <p class="orderNumber">订单号:{{item.orderNumber}}</p>
            <p class="orderPrice">
              <span>合计:</span>
              ￥{{item.orderPrice.toFixed(2)}}
            </p>
          </div>
          <div class="orderListBottom">
            <p></p>
            <div>
              <van-button
                type="info"
                size="small"
                @click="cancleOrder(item)"
                v-if="item.orderStatus == 1"
                style="margin-right:0.5rem"
              >取消订单</van-button>
              <!-- <van-button
                type="primary"
                size="small"
                @click="verificationOrder(item)"
                v-if="item.orderStatus < 3"
              >核销</van-button>-->
              <van-button
                type="primary"
                size="small"
                @click="groupProcess(item)"
                v-if="item.orderStatus == 3"
              >待成团</van-button>
            </div>
          </div>
        </div>
        <!-- 核销弹出框 -->
        <van-dialog v-model="showVerification" title="核销订单" @confirm="submitVerification">
          <van-field v-model="goodsCode" center clearable label="取货码" placeholder="请输入取货码">
            <!-- <template #button>
              <van-button size="small" type="primary" @click="submitVerification">确定</van-button>
            </template>-->
          </van-field>
        </van-dialog>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Myorder",
  data() {
    return {
      orderStatus: 0,
      carlist: [],
      orderStatus: this.$route.query.orderStatus || 0,
      loading: false,
      finished: false,
      page: 0,
      limit: 10,
      showVerification: false,
      goodsCode: ""
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.page += 1;
      let params = {
        orderStatus: this.orderStatus,
        page: this.page,
        limit: this.limit
      };
      this.$axios.post("/api/orderlist", params).then(res => {
        // 加载状态结束
        this.loading = false;
        this.carlist = [...this.carlist, ...res];
        // this.carlist = res.data
        //   if (res.data.length == 0) {
        //     this.finished = true;
        //   } else {
        //     this.carlist = [...this.carlist, ...res.data];
        //   }
      });
    },
    changeOrderStatus(e) {
      this.orderStatus = e;
      this.page = 0;
      this.carlist = [];
      this.finished = false;
      this.getdata();
    },
    // 取消订单
    cancleOrder(row) {
      this.$dialog
        .confirm({
          title: "提醒",
          message: "确认要取消订单吗？"
        })
        .then(() => {
          //   this.$axios
          //     .post("/v1/index/user/cancelOrder", { orderId: row.orderId })
          //     .then(res => {
          //       this.page = 0;
          //       this.carlist = [];
          //       this.$toast("订单取消成功");
          //       this.getdata();
          //     });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 核销
    verificationOrder(row) {
      this.showVerification = true;
    },
    // 提交核销
    submitVerification() {
      this.$toast("核销成功");
    },
    // 商品详情
    godetail(item) {
      // console.log(item)
      this.$router.push({
        path: "/goodsdetail",
        query: {
          goodsId: item.orderGoodsGoodsId
        }
      });
    },
    groupProcess() {
      this.$router.push("/goodsGroupProcess");
    },
    orderGoodsDetaile(item) {
      // this.$router.push({
      //   path: "/orderGoodsDetail",
      //   query: {
      //     orderStatus: item.orderStatus
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/base");

@flexRowBetween: {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
};

.Myorder {
  .orderList {
    box-sizing: border-box;
    padding: 1rem 0.5rem;
    background-color: #f8f6f6;
    .orderListItem {
      // border-bottom: 1px solid #ddd;
      border-radius: 10px;
      margin-bottom: 0.5rem;
      box-sizing: border-box;
      padding: 1rem 0.5rem;
      background-color: #fff;
      .orderListHeader {
        @flexRowBetween();
        padding-bottom: 8px;
        border-bottom: @comborder;
        .storeAddress {
          font-size: 0.8rem;
          color: #000;
          letter-spacing: 1px;
          line-height: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .orderStatus {
          color: @mainColor;
          font-size: 0.8rem;
          white-space: nowrap;
        }
      }

      .orderListContent {
        @flexRowBetween();
        // border-bottom: 1px solid #ddd;
        align-items: center;
        padding: 1rem 0;

        .orderListContentLeft {
          img {
            width: 20vw;
            height: 20vw;
          }
        }

        .orderListContentRight {
          flex: 1;
          padding-left: 1rem;

          .orderListContentTitle {
            @flexRowBetween();

            h1 {
              color: #1a1a1a;
            }

            p {
              color: #999;
            }
          }

          .orderListContentIntro {
            @flexRowBetween();
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: #999;

            .rderListContentNumber {
              .rderListContentNumberOriginPrice {
                text-decoration: line-through;
              }
            }
          }
        }
      }

      .orderListBottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #000;
        margin: 0.5rem 0;
        .orderPrice {
          color: #f40;

          span {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
