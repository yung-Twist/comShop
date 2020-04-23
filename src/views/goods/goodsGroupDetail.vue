<template>
  <div class="GoodsGroupdetail">
    <!-- <Head /> -->
    <!-- 轮播图 -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      @change="onSwiperChange"
      v-if="goods.banner"
    >
      <van-swipe-item v-for="(item, index) in goods.banner" :key="index">
        <div class="home-bannerImg">
          <img :src="item.image" alt />
        </div>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1}}/{{goods.banner.length}}</div>
      </template>
    </van-swipe>
    <div class="goodsInfo" v-if="goods.price">
      <div class="goodsPrice">
        <p class="goodsNewPrice">¥{{goods.price.toFixed(2)}}</p>
        <p class="goodsOriginPrice">¥{{goods.originPrice.toFixed(2)}}</p>
      </div>
      <div class="goodsName">
        <p>{{goods.name}}</p>
      </div>
      <div class="goodsSaleInfo">
        <p>已售:{{goods.sale}}件</p>
      </div>
    </div>
    <van-divider>产品参数</van-divider>
    <div class="goodsParam">
      <van-cell-group>
        <van-cell title="品牌" value="诺基亚" />
        <van-cell title="型号" value="N97" />
        <van-cell title="材质" value="钛合金" />
        <van-cell title="产地" value="mide in china" />
      </van-cell-group>
    </div>
    <!-- 拼团列表 -->
    <div class="groupList">
      <div class="groupHeader">
        <span>5人正在拼团，可直接参与</span>
        <!-- <p>
          <span>查看更多</span>
          <van-icon name="arrow" color="#bbbbbb" size="1rem" />
        </p>-->
      </div>
      <div class="groupListWrap">
        <div class="groupListItem" v-for="(item, index) in groupList" :key="index">
          <div class="userInfo">
            <img :src="item.avator" alt />
            <p>{{item.userName}}</p>
          </div>
          <div class="groupInfo">
            <div class="groupCount">
              <div class="groupNowCount">
                还差
                <span>{{item.groupCount - item.hasJoinGroup.length}}人</span>拼成
              </div>
              <div class="groupItemCountDown">
                <p>剩余</p>
                <van-count-down
                  millisecond
                  :time="Date.parse(new Date('2020/4/21 23:50:00')) - Date.parse(new Date())"
                  format="HH:mm:ss:S"
                />
              </div>
            </div>
            <van-button type="danger" size="small" @click="JoinGroup(item)">去拼团</van-button>
          </div>
        </div>
      </div>
    </div>
    <van-divider>商品详情</van-divider>
    <div class="goodsDetailContent">
      <img :src="goods.pic" alt />
    </div>

    <!-- 同类商品推荐 -->
    <van-divider>猜你喜欢</van-divider>
    <div class="guessYouLikeWrap">
      <div
        class="guessYouLikeItem"
        v-for="(item, index) in goodslist"
        :key="index"
        @click="toGoodsDetail(item)"
      >
        <GoodsLike :name="item.name" :price="item.price" :pic="item.pic" />
      </div>
    </div>
    <!-- 去拼团遮罩层 -->
    <van-overlay :show="showJoinGroup" @click="showJoinGroup = false">
      <div class="wrapper">
        <div class="joinGroupInfo" @click.stop>
          <p class="joinGroupInfoHeader">参与{{joinGroupItemData.userName}}的拼团</p>
          <div class="joinGroupIItemCount">
            <div class="joinGroupInfoContent">
              仅剩
              <span
                v-if="joinGroupItemData.hasJoinGroup"
              >{{joinGroupItemData.groupCount - joinGroupItemData.hasJoinGroup.length}}</span>个名额，
              <van-count-down
                millisecond
                :time="Date.parse(new Date('2020/4/21 23:50:00')) - Date.parse(new Date())"
                format="HH:mm:ss:S"
              />后结束
            </div>
          </div>
          <div class="hasJoinUser">
            <img
              :src="item.avator"
              alt
              v-for="(item, index) in joinGroupItemData.hasJoinGroup"
              :key="index"
            />
            <div class="ItemGroupResidueWrap" v-if="joinGroupItemData.hasJoinGroup">
              <div
                class="ItemGroupResidueItem"
                v-for="(item, index) in joinGroupItemData.groupCount - joinGroupItemData.hasJoinGroup.length"
                :key="index"
              >
                <span>?</span>
              </div>
            </div>
          </div>
          <van-button type="danger" size="large" @click="joinGroup">参与拼单</van-button>
        </div>
      </div>
    </van-overlay>
    <!-- 商品规格弹出 -->
    <van-popup v-model="showGoodsInfo" position="bottom" :style="{ height: '70%' }">
      <div>
        <SpecItem
          :pic="selectdImg"
          :title="goods.name"
          :selectVipPrice="selectVipPrice"
          :originPrice="goods.originPrice"
          :itro="goods.itro"
          :specTemp="specTemp"
          :selectedSpec="selectedSpec"
          :selectedStock="selectedStock"
          :buyNum="buyNum"
          @clickSpec="clickSpec"
        />
        <van-row
          type="flex"
          justify="space-between"
          align="center"
          style="border-bottom:1px solid #ddd;padding:1rem;"
        >
          <van-col span="8">
            <p style="color:#000">购买数量</p>
          </van-col>
          <van-col span="8" style="text-align:right;">
            <van-stepper
              v-model="buyNum"
              min="1"
              :max="selectedStock > buyNum ? selectedStock : buyNum"
            />
          </van-col>
        </van-row>
        <van-goods-action>
          <!-- <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/shopcar')" /> -->
          <!-- <van-goods-action-button type="warning" text="加入购物车" @click="addToshopCar" /> -->
          <!-- <van-goods-action-button type="danger" text="立即购买" @click="buyNow" /> -->
          <van-button type="danger" size="large" @click="submitGroup">确定</van-button>
        </van-goods-action>
      </div>
    </van-popup>
    <!-- 底部按钮 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="shopcar" />
      <van-goods-action-button type="warning" text="单独购买" @click="addtoshopcar" />
      <van-goods-action-button type="danger" text="立即开团" @click="buynow" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  name: "Goodsgroupdetail",
  data() {
    return {
      goods: {},
      current: 0,
      goodslist: [],
      groupList: [],
      showJoinGroup: false,
      joinGroupItemData: {},
      buyNum: 1,
      buytype: "", //1:单独购买，2：开团购买，3:拼团购买
      specTemp: [],
      goodsSpec: [],
      buyNum: 1,
      showGoodsInfo: false
    };
  },
  computed: {
    badge() {
      let badges = 0;
      for (let e of this.dataList) {
        badges += e.buyNum;
      }
      return badges;
    },
    // 选择的规格
    selectedSpec() {
      if (this.goodsSpec.length > 0) {
        let spec = "";
        for (let e of this.specTemp) {
          for (let f of e.spec_checked) {
            if (f.ischecked) {
              spec += e.spec_key + ":" + f.size + ",";
            }
          }
        }
        return spec.substring(0, spec.lastIndexOf(","));
      } else {
        return "";
      }
    },
    // 库存
    selectedStock() {
      if (this.goodsSpec.length > 0) {
        for (let e of this.goodsSpec) {
          if (e.specContent == this.selectedSpec) {
            return e.specStock;
          }
        }
      } else {
        return this.goods.goodsStock;
      }
    },
    // 会员价
    selectVipPrice() {
      if (this.goodsSpec.length > 0) {
        for (let e in this.goodsSpec) {
          if (this.goodsSpec[e].specContent == this.selectedSpec) {
            return this.goodsSpec[e].specPrice;
          } else if (
            e == this.goodsSpec.length - 1 &&
            this.goodsSpec[e].specContent == this.selectedSpec
          ) {
            return this.goodsSpec[e].specPrice;
          } else if (e == this.goodsSpec.length - 1) {
            return this.goods.price;
          }
        }
      } else {
        return this.goods.price;
      }
    },
    // 图片地址
    selectdImg() {
      if (this.goodsSpec.length > 0) {
        for (let e in this.goodsSpec) {
          if (this.goodsSpec[e].specContent == this.selectedSpec) {
            return this.goodsSpec[e].specImg;
          } else if (
            e == this.goodsSpec.length - 1 &&
            this.goodsSpec[e].specContent == this.selectedSpec
          ) {
            return this.goodsSpec[e].specImg;
          } else if (e == this.goodsSpec.length - 1) {
            return this.goods.pic;
          }
        }
      } else {
        return this.goods.pic;
      }
    },
    // 规格id
    getSpecId() {
      if (this.goodsSpec.length > 0) {
        for (let e in this.goodsSpec) {
          if (this.goodsSpec[e].specContent == this.selectedSpec) {
            return this.goodsSpec[e].specId;
          } else if (
            e == this.goodsSpec.length - 1 &&
            this.goodsSpec[e].specContent == this.selectedSpec
          ) {
            return this.goodsSpec[e].specId;
          } else if (e == this.goodsSpec.length - 1) {
            return 0;
          }
        }
      } else {
        return 0;
      }
    }
  },
  methods: {
    // 获取商品详情
    getdata() {
      this.$axios.post("/api/goodsdetail", {}).then(res => {
        // console.log(res);
        this.goods = res;
      });
    },
    // 获取猜你喜欢
    getLikeData() {
      this.$axios.post("/api/secondGoods", {}).then(res => {
        // console.log(res);
        this.goodslist = res;
      });
    },
    // 获取拼团列表
    getGroupList() {
      this.$axios.post("/api/groupList", {}).then(res => {
        this.groupList = res;
        // console.log(res);
      });
    },
    // 轮播图改变事件
    onSwiperChange(index) {
      this.current = index;
    },
    // 购物车
    shopcar() {
      this.$router.push("/shopcar");
    },
    // 去拼团
    JoinGroup(row) {
      // console.log(row);
      this.joinGroupItemData = row;
      this.showJoinGroup = true;
    },
    // 单独购买
    addtoshopcar() {
      this.showGoodsInfo = true;
      this.buytype = 1;
      this.goodsSpec = this.goods.goodsSpec;
      this.specEdit(this.goodsSpec);
    },
    // 立即开团
    buynow() {
      this.showGoodsInfo = true;
      this.buytype = 2;
      this.goodsSpec = this.goods.goodsSpec;
      this.specEdit(this.goodsSpec);
    },
    // 参与拼团
    joinGroup() {
      this.showGoodsInfo = true;
      this.buytype = 3;
    },
    // 商品详情
    toGoodsDetail(item) {
      this.getdata();
      window.scrollTo(0, 0);
    },
    // 确认购买
    submitBuy() {
      // console.log(123);
      if (this.buytype == 1) {
        this.$router.push("/submitorder");
      } else {
        this.$router.push("submitgrouporder");
      }
    },
    // 显示规格
    showSpecContent() {
      this.showGoodsInfo = true;
      this.goodsSpec = this.goods.goodsSpec;
      // console.log(this.goods);
      this.specEdit(this.goodsSpec);
    },
    // 规格转化
    specEdit(goodsSpec) {
      // 获取规格组
      let spec_group = [];
      let temp_content = goodsSpec[0].specContent.split(",");
      for (let e of temp_content) {
        let temp_sopc = e.split(":");
        spec_group.push(temp_sopc[0]);
      }
      // spec_group = ["颜色", "大小", "型号"]
      // 获取规格对象集
      let spec_value = [];
      for (let j of spec_group) {
        // spec_value[`${j}`] = []
        spec_value.push({
          spec_key: j,
          spec_value: [],
          spec_checked: []
        });
      }
      for (let v of goodsSpec) {
        for (let k of v.specContent.split(",")) {
          let temp_sopc = k.split(":");
          // console.log(temp_sopc)
          for (let l of spec_value) {
            if (l.spec_key == temp_sopc[0]) {
              if (l.spec_value.indexOf(temp_sopc[1]) == -1) {
                l.spec_value.push(temp_sopc[1]);
              }
            }
          }
        }
      }
      for (let e of spec_value) {
        for (let f of e.spec_value) {
          e.spec_checked.push({
            size: f,
            ischecked: false
          });
        }
      }
      this.specTemp = spec_value;
      // console.log(this.specTemp);
      // 默认第一个规格
      for (let e of this.specTemp) {
        e.spec_checked[0].ischecked = true;
      }
    },
    // 选择规格
    clickSpec(index, index2, item) {
      for (let e of this.specTemp[index].spec_checked) {
        if (item.size == e.size) {
          this.specTemp[index].spec_checked[index2].ischecked = true;
        } else {
          e.ischecked = false;
        }
      }
    },
    // 加入购物车
    addToshopCar() {
      this.$toast("加入购物车成功");
      this.showGoodsInfo = false;
    },
    // 立即购买
    buyNow() {
      this.$toast("立即购买");
      this.showGoodsInfo = false;
    },
    //规格确定按钮
    submitGroup() {
      if (this.buytype == 1) {
        this.$router.push("/submitorder");
      } else {
        this.$router.push("submitgrouporder");
      }
    }
  },
  mounted() {
    this.getdata();
    this.getLikeData();
    this.getGroupList();
  },
  components: {
    Swiper: () => import("@/components/Swiper"),
    GoodsLike: () => import("@/components/GoodsLike")
  }
};
</script>
<style scoped lang='less'>
@import url("../../style/base");
.GoodsGroupdetail {
  .home-bannerImg {
    text-align: center;
    img {
      width: 100vw;
      height: 100vw;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .goodsInfo {
    padding: 1rem;
    .goodsPrice {
      display: flex;
      flex-direction: row;
      align-items: center;
      .goodsNewPrice {
        font-size: 1.4rem;
        @price();
      }
      .goodsOriginPrice {
        @originPrice();
      }
    }
    .goodsName {
      margin-top: 0.5rem;
      p {
        color: #000;
      }
    }
    .goodsSaleInfo {
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }
  }
  .groupList {
    .groupHeader {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: @comborder;
      span {
        color: #000;
      }
      p {
        display: flex;
        align-items: center;
        span {
          color: #bbb;
        }
      }
    }
    .groupListWrap {
      display: flex;
      flex-direction: column;
      .groupListItem {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0.5rem;
        border-bottom: @comborder;
        .userInfo {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
          }
          p {
            color: #000;
            margin-left: 0.5rem;
          }
        }
        .groupInfo {
          display: flex;
          flex-direction: row;
          .groupCount {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-right: 10px;
            .groupNowCount {
              color: #323233;
              font-size: 14px;
              line-height: 20px;
              span {
                color: @mainColor;
                font-size: 14px;
              }
            }
            .groupItemCountDown {
              display: flex;
              flex-direction: row;
              color: #323233;
              font-size: 14px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
  .goodsDetailContent {
    width: 100vw;
    overflow: hidden;
    // padding: 15.15% 0 0;
    position: relative;
    /deep/img {
      // position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .guessYouLikeWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .guessYouLikeItem {
      width: 50%;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .joinGroupInfo {
      width: 80vw;
      background-color: #fff;
      border-radius: 10px;
      text-align: center;
      padding: 1rem;
      .joinGroupInfoHeader {
        color: #000;
      }
      .joinGroupIItemCount {
        font-size: 14px;
        line-height: 20px;
        .joinGroupInfoContent {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin: 0.5rem;
          span {
            color: @mainColor;
          }
        }
      }
      .hasJoinUser {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 1rem 0;
        img {
          width: 10vw;
          height: 10vw;
          border-radius: 50%;
          border: 1px solid #ffb549;
          margin-left: 10px;
        }
        .ItemGroupResidueWrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          .ItemGroupResidueItem {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #bbb;
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
            border: 1px dashed #bbb;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .showGoodsInfoContent {
    height: 50vh;
    position: relative;
    .goodsInfoContentHeader {
      display: flex;
      flex-direction: row;
      border-bottom: @comborder;
      padding: 1rem;
      img {
        width: 20vw;
        height: 20vw;
      }
      .goodsInfoTitlePrice {
        margin-left: 1rem;
        .goodsInfoTitle {
          margin-top: 1rem;
        }
        .goodsInfoPrice {
          color: @mainColor;
          margin-top: 1rem;
        }
      }
    }
    .buyGoodsNum {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: @comborder;
      padding: 1rem;
    }
    .goodsInfoContentBtn {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>