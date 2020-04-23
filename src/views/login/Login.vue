<template>
    <div class="login">
        <!-- <div class="header">
            <img src="../assets/images/Invictus_Gaming_logo.png" alt="">
        </div>
        <div class="login-contetn">
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
            userinfo:{},
            disabled:false,
            urlquery:{}
        }
    },
    methods: {
        getcode(){
            let url = decodeURIComponent(this.$route.query.redirect)
            var hs = {}
            if (url.indexOf('?') != -1) {
                var cs = url.split('?')[1]
                var cs_arr = cs.split('&');
                for (var i = 0; i < cs_arr.length; i++) { //遍历数组，拿到json对象
                    hs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
                }
            }
            this.urlquery = hs
            // console.log(this.urlquery)
            this.login()
        },
        // 登录
        login(){
            let params = {
                code:this.$route.query.code,
                userRefereeUserId:this.urlquery.userRefereeUserId || 0,
            }
            this.$axios.post('/v1/index/login/index',params).then(res=>{
                localStorage.setItem('token',res.token);
                this.$store.state.token = res.token
                window.location.replace(decodeURIComponent(this.$route.query.redirect))
            })
        }
    },
    mounted(){
        this.getcode()
    }
}
</script>

<style lang="less" scoped>
.login{
    .header{
        text-align: center;
        padding: 2rem;
        border-bottom: 1px solid #ddd;
        margin-top: 10vh;
        img{
            width: 30vw;
            height: 30vw;
        }
    }
    .login-contetn{
        text-align: center;
        padding: 1rem;
        h1{
            font-size: 14px;
            font-weight: 400;
            color: rgb(0, 0, 0);
            font-family: 微软雅黑;
        }
        p{
            color: rgb(148, 148, 148);
            font-size: 12px;
            margin-top: .5rem;
            text-indent: 2rem;
            font-family: 微软雅黑;
            span{
                width: .5rem;
                height: .5rem;
                display: inline-block;
                background-color: rgb(148, 148, 148);
                border-radius: 50%;
                margin-right:1rem;
            }
        }
    }
    .login-btn{
        padding: 1rem;
    }
}
</style>
