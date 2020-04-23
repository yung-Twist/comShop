<template>
  <div class="Mine">
    <Head noback />
    <div class="userInfo">
      <div class="userInfoHeader">
        <div class="userInfo-avatar">
          <img :src="userinfo.userHeadImageUrl" alt />
          <p class="userInfo-nickName">{{userinfo.userNickName}}</p>
          <div class="userAuth">
            <!-- <p class="userAuthType">{{userinfo.userType == 3 ? "企业认证" : (userinfo.userType == 2 ? "个人认证" : "未认证")}}</p> -->
            <!-- <p class="userAuthStatus">认证状态：{{userinfo.userAuthStatus == 1 ? "未申请" : (userinfo.userAuthStatus == 2 ? "待审核" : (userinfo.userAuthStatus == 3 ? "已认证":(userinfo.userAuthStatus == 4 ? "已驳回" : '')))}}</p> -->
          </div>
        </div>
      </div>
      <div class="myorder">
        <div class="myorderHeader">
          <h1>我的订单</h1>
          <div class="allorder" @click="$router.push('/myorder')">
            <p>全部订单</p>
            <van-icon name="arrow" color="#999" />
          </div>
        </div>
      </div>
    </div>
    <div class="orderStatus">
      <div
        class="orderStatusItem"
        v-for="(item, index) in orderData"
        :key="index"
        @click="toMyOrder(item)"
      >
        <img :src="item.icon" alt />
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="userInfoOthers">
      <van-cell title="地址管理" is-link @click="$router.push('/site')">
        <van-icon slot="icon" :name="iconList.site" size="1.8rem" style="margin-right:.5rem;" />
      </van-cell>
      <van-cell title="分享海报" is-link @click="showPosterDialog">
        <van-icon slot="icon" :name="iconList.share" size="1.8rem" style="margin-right:.5rem;" />
      </van-cell>
      <van-cell title="手机验证" is-link @click="$router.push('/authphone')">
        <van-icon slot="icon" :name="iconList.certify" size="1.8rem" style="margin-right:.5rem;" />
      </van-cell>
    </div>
    <!-- 分享海报弹出 -->
    <div
      id="posterHtml"
      v-show="showShare"
      @click.stop="closeSavePoster"
      :style="{backgroundImage: 'url(' + posterBgImg + ')', backgroundSize:'contain'}"
      crossorigin="anonymous"
    >
      <vue-qr :text="config.value" :size="400" style="width:50vw;"></vue-qr>
    </div>
    <div v-if="posterImg != '' && showSave" class="savePoster" @click.stop="closeSavePoster">
      <img :src="posterImg" alt />
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import html2canvas from "html2canvas";
export default {
  name: "Mine",
  data() {
    return {
      iconList: {
        site: require("../../assets/imgs/定位.png"),
        share: require("../../assets/imgs/海报.png"),
        certify: require("../../assets/imgs/信息认证.png")
      },
      userinfo: {},
      orderData: [
        {
          icon: require("../../assets/imgs/未支付.png"),
          title: "待付款",
          orderStatus: 1
        },
        {
          icon: require("../../assets/imgs/未支付.png"),
          title: "待成团",
          orderStatus: 2
        },
        {
          icon: require("../../assets/imgs/已支付.png"),
          title: "待取货",
          orderStatus: 3
        },
        {
          icon: require("../../assets/imgs/订单完成.png"),
          title: "已完成",
          orderStatus: 4
        },
        {
          icon: require("../../assets/imgs/订单完成.png"),
          title: "已取消",
          orderStatus: 5
        },
        {
          icon: require("../../assets/imgs/订单完成.png"),
          title: "已退款",
          orderStatus: 6
        }
      ],
      isAuth: false,
      showShare: false,
      showSave: false,
      posterBgImg: "",
      config: {
        value: "" //显示的值、跳转的地址
      },
      posterImg: ""
    };
  },
  components: {
    VueQr
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      this.userinfo = await this.$axios.post("/api/userinfo", {});
      console.log(this.userinfo);
    },
    // 前往订单
    toMyOrder(item) {
      this.$router.push({
        path: "/myorder",
        query: {
          orderStatus: item.orderStatus
        }
      });
    },
    // 显示二维码
    showPosterDialog() {
      this.showShare = true;
      this.config.value = `${location.protocol}//${location.hostname}/home?userRefereeUserId=${this.userinfo.userId}`;
      setTimeout(() => {
        this.createPoster();
      }, 200);
    },
    createPoster() {
      // 生成海报

      const that = this;
      const domObj = document.getElementById("posterHtml");
      html2canvas(domObj, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true
        // onclone(doc) {
        //     let e = doc.querySelector('#posterHtml')
        //     e.style.display = 'block'
        // }
      }).then(function(canvas) {
        // 在微信里,可长按保存或转发
        // let posterImg = canvas.toDataURL('image/png')
        that.posterImg = canvas.toDataURL("image/png");
        that.showShare = false;
        that.showSave = true;
      });
    },
    // 关闭二维码
    closeSavePoster() {
      this.showShare = false;
      this.showSave = false;
      this.posterImg = "";
    },
    toqrcode() {
      location.replace(`${location.protocol}//${location.hostname}/followwx`);
    },
    // 获取海报背景图
    getPosterbg() {
      this.$axios.post("/api/shareImage", {}).then(res => {
        // console.log(res)
        this.posterBgImg = res.share_image_path;
      });
    }
  },
  mounted() {
    this.getUserInfo();
    this.getPosterbg();
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/base.less");

.Mine {
  background-color: #f7f7f7;
  // height: 100vh;
  position: relative;

  .userInfo {
    width: 100vw;
    height: 20vh;
    box-sizing: border-box;
    // background-image: url("../../assets/imgs/mybg.png");
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    background-color: #f40;
    position: relative;

    .userInfoHeader {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 2vw;

      .userInfo-avatar {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 14vw;
          height: 14vw;
          border-radius: 50%;
        }

        .userInfo-nickName {
          color: #fff;
          margin-left: 0.5rem;
          font-size: 1.2rem;
        }
      }

      .userAuth {
        height: 100%;
        font-size: 0.8rem;
        color: #f40;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .userAuthType {
          margin-bottom: 0.5rem;
        }
      }
    }

    .myorder {
      position: absolute;
      bottom: 0;
      left: 2vw;
      background-color: #fff;
      width: 96vw;
      border-radius: 0.5rem 0.5rem 0 0;

      .myorderHeader {
        height: 6vh;
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e3e3e3;

        h1 {
          color: #323232;
        }

        .allorder {
          color: #999;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }

  .orderStatus {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 96vw;
    background-color: #fff;
    border-radius: 0 0 0.5rem 0.5rem;
    margin-left: 2vw;

    .orderStatusItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 8vw;
        height: 8vw;
        margin: 0.4rem 0;
      }

      p {
        font-size: 0.8rem;
        margin-bottom: 0.4rem;
      }
    }
  }

  .userInfoOthers {
    padding: 2vw;

    .van-cell {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  #posterHtml {
    width: 80vw;
    height: 70vh;
    margin: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    box-sizing: border-box;
    // background-image: url('../../assets/imgs/resbgc.png');
    // background-repeat: no-repeat;
    // background-size: 100%;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .savePoster {
    width: 100vw;
    height: 100vh;
    img {
      margin: auto;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
      border-radius: 4px;
      width: 80vw;
      height: 70vh;
    }
  }
}
</style>
