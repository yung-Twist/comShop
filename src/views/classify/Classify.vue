<template>
  <div class="Classify">
    <Head></Head>
    <div class="classifyContent">
      <div class="classifyWrap">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item :title="item.name" v-for="(item, index) in categoryList" :key="index" />
        </van-sidebar>
      </div>
      <div class="classifyGoodsWrap">
        <div class="secondCategory">
          <van-tabs v-model="activeName" @change="changeSecondCategory" sticky>
            <van-tab
              :title="item.name"
              :name="item.name"
              v-for="(item, index) in secondCategoryList"
              :key="index"
            ></van-tab>
          </van-tabs>
        </div>
        <div class="classifyGoodsItem">
          <GoodsItem
            v-for="(item, index) in dataList"
            :key="index"
            :title="item.name"
            :pic="item.pic"
            :intro="item.itro"
            :price="item.price"
            :originPrice="item.originPrice"
            :sale="item.sale"
            :buyNum="item.buyNum"
            @addBtn="showSpecContent(item)"
            @toGoodsDetail="toGoodsDetail(item)"
          />
        </div>
      </div>
    </div>
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
          <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/shopcar')" />
          <van-goods-action-button type="warning" text="加入购物车" @click="addToshopCar" />
          <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
        </van-goods-action>
      </div>
    </van-popup>
    <!-- <PageShopCar :badge="badge" @submitOrder="submitOrder" /> -->
  </div>
</template>

<script>
export default {
  name: "Classify",
  data() {
    return {
      dataList: [],
      categoryList: [],
      secondCategoryList: [],
      activeKey: 0,
      activeName: "",
      showGoodsInfo: false,
      goods: {},
      specTemp: [],
      goodsSpec: [],
      buyNum: 1
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
  components: {
    GoodsItem: () => import("@/components/GoodsItem"),
    PageShopCar: () => import("@/components/PageShopCar"),
    SpecItem: () => import("@/components/SpecItem")
  },
  methods: {
    async getdata() {
      await this.$axios.post("/api/categoryGoods", {}).then(res => {
        // console.log(res);
        this.dataList = res;
      });
    },
    // 获取分类列表
    async getCategoryList() {
      await this.$axios.post("/api/categoryList", {}).then(res => {
        this.categoryList = res;
      });
    },
    //获取二级分类
    async getSecondCategoryList() {
      await this.$axios.post("/api/categoryList", {}).then(res => {
        this.secondCategoryList = res;
      });
    },
    // 一级分类改变事件
    onChange(e) {
      // console.log(this.categoryList[e]);
      this.getdata();
      this.getSecondCategoryList();
      this.activeName = "";
    },
    // 二级分类改变事件
    changeSecondCategory(e) {
      // console.log(e);
      this.getdata();
    },
    // 商品详情
    toGoodsDetail(item) {
      // console.log(123);
      this.$router.push("/goodsdetail");
    },
    // 增加数量
    addNum() {
      this.buyNum += 1;
    },
    // 减少数量
    reduceNum() {
      if (this.buyNum > 0) {
        this.buyNum -= 1;
      }
    },
    submitOrder() {
      this.$router.push("/submitorder");
    },
    // 显示规格
    showSpecContent(item) {
      this.goods = item;
      this.showGoodsInfo = true;
      this.goodsSpec = item.goodsSpec;
      // console.log(this.goods);
      this.specEdit(item.goodsSpec);
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
    }
  },
  mounted() {
    this.getCategoryList();
    this.getdata();
    this.getSecondCategoryList();
  }
};
</script>

<style lang='less' scoped>
.Classify {
  width: 100vw;
  .classifyContent {
    display: flex;
    flex-direction: row;
    width: 100%;
    .classifyGoodsWrap {
      width: 80vw;
      .secondCategory {
        width: 100%;
      }
      .classifyGoodsItem {
        width: 100%;
      }
    }
  }
}
</style>