<template>
<div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div id="nav">
        <Tarbar v-if="$route.meta.showtar"></Tarbar>
    </div>
</div>
</template>
<script>
export default {
    mounted(){
        let theme=localStorage.getItem('app_theme');
        document.getElementById('app').className=theme;
    }
}
</script>
<style lang="less">
@import url('./style/reset.less');
@import url('./style/base.less');
@import url('./style/color.less');

#app {
    font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    // padding: 46px 0 10vh 0;
    padding-bottom: 10vh;
    .change{
     /deep/.van-icon .van-icon-arrow-left .van-nav-bar__arrow{
         color:white;
     }
     /deep/.van-nav-bar__text{
         color:white;
     }
     /deep/.van-nav-bar__title{
         color:white;
     }
}
}
</style>
<style>
    .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: .3s;
  }
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: .3s;
  }
.fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: .3s;
  }
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: .3s;
  }
</style>