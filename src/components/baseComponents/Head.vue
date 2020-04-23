<template>
<div class="head_wrap">
    <!-- <van-nav-bar :title="$route.meta.title"  :right-text="rightworld" left-arrow @click-left="goback" @click-right="onClickRight" /> -->
    <van-nav-bar :title="$route.meta.title" :right-text="rightworld" @click-right="onClickRight" fixed>
        <div class="headLeft" slot="left" v-if="!noback">
            <van-icon name="arrow-left" size="1.2rem" @click="goback" color="#fff"/>
            <!-- <span>返回</span> -->
        </div>
        <van-icon v-if="rightIcon" :name="rightIcon" slot="right" size="1.4rem" @click="onClickRightICon" color="#fff"/>
    </van-nav-bar>
</div>
</template>

<script>
export default {
    props:{
        rightworld: String,
        rightIcon: String,
        noback:Boolean,
    },
    data() {
        return {

        }
    },
    methods: {
        goback() {
            // if(window.history.length <= 1){
            //     this.$router.push('/home')
            // }else{
            //     this.$router.go(-1)
            // }
            this.$back()
        },
        onClickRight(){
            this.$emit('onClickRight')
        },
        onClickRightICon(){
            this.$emit('onClickRightICon')
        }
    }
}
</script>

<style lang="less">
@import url('../../style/base.less');
.head_wrap {
    height: 46px;
    .headLeft{
        span{
            display: inline-block;
            margin: 0 -16px;
            padding: 0 16px;
            color: #fff;
            vertical-align: middle;
        }
    }
    .van-nav-bar{
        background-color: @mainColor;
    }
    .van-nav-bar__title {
        color: rgb(255, 255, 255);
        font-weight: bold;
    }
    .van-hairline--bottom::after {
        border-bottom-width: 0;
    }
    .van-nav-bar__text{
        color: #fff;
    }
}
</style>
<style>
</style>