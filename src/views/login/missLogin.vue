<template>
    <div class="misslogin">
        <!-- <div class="header">
            <img src="../assets/images/Invictus_Gaming_logo.png" alt="">
        </div>
        <div class="misslogin-contetn">
            <h1>登录后用户将获得以下权限</h1>
            <p><span></span> 获得你的公开信心(昵称、头像等)</p>
        </div>
        <div class="login-btn">
            <van-button type="primary" size="large" @click="login">授权登录</van-button>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    methods: {
        getdata(){
            this.$axios.post("/v1/index/common/wechatConfig", {}).then(res => {
                // console.log(res)
                let url = `${location.protocol}//${location.hostname}/#/login?redirect=${this.$route.query.redirect}`
                let uri = encodeURIComponent(url)
                location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.wechat_appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
            });
        }
    },
    mounted(){
       this.getdata()
    }
}
</script>

<style lang="less" scoped>
.login{
}
</style>
