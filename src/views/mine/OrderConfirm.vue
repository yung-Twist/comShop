<template>
    <div class="OrderConfirm">
        <Head />
        <div class="content" v-if="confirmData.orderId">
            <!-- <TheCell :value="confirmData.orderId" title="订单ID"/> -->
            <TheCell :value="confirmData.orderNumber" title="订单号"/>
            <TheCell :value="confirmData.orderPrice" title="订单金额"/>
            <!-- <TheCell :value="confirmData.orderUserNickName" title="用户昵称"/> -->
            <TheCell :value="confirmData.orderStoreName" title="网点名称"/>
            <TheCell :value="confirmData.orderStoreAddress" title="网点地址"/>
            <TheCell :value="confirmData.orderStorePhone" title="网点电话"/>
            <!-- <TheCell :value="confirmData.orderStatus == 1 ? '待付款' : (confirmData.orderStatus == 2 ? '已付款' : (confirmData.orderStatus == 3 ? '已完成' : '已取消'))" title="状态"/> -->
            <van-divider>订单商品</van-divider>
        </div>
        <div class="orderListContent" v-for="(item2, index2) in confirmData.orderGoodsList" :key="index2" >
            <div class="orderListContentLeft" @click="godetail(item2)">
                <img :src="item2.orderGoodsImagePath" alt />
            </div>
            <div class="orderListContentRight">
                <div class="orderListContentTitle">
                    <h1>{{item2.orderGoodsGoodsName}}</h1>
                    <p>{{item2.orderGoodsPrice}}</p>
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
        <div class="confirmOrderBtn">
            <van-button type="info" size="large" @click="confirmOrder">确认核对</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderConfirm',
    data() { 
        return {
            confirmData:{}
        }
    },
    methods:{
        getdata(){
            this.confirmData = JSON.parse(this.$route.query.confirmData)
            // console.log(this.confirmData)
        },
        // 核对订单
        confirmOrder(){
            this.$dialog.confirm({
                title: '提醒',
                message: '确认已与商家当面核对了吗？'
            }).then(() => {
                this.$axios.post('/v1/index/user/confirmOrder',{orderId:this.confirmData.orderId}).then(res=>{
                    this.$toast('订单核对成功!')
                    this.$router.go(-1);
                })
            }).catch(() => {
            // on cancel
            });
        }
    },
    mounted(){
        this.getdata()
    }
}
</script>

<style lang='less' scoped>
@import url('../../style/base.less');
    @flexRowBetween: {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .OrderConfirm{
        .orderListContent {
            @flexRowBetween();
            border-bottom: 1px solid #ebedf0;
            align-items: center;
            padding: 1rem 10px;
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
        .confirmOrderBtn{
            position: fixed;
            bottom: 0;
            width: 100vw;
        }
    }
</style>