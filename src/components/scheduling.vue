<template>
    <div>
        <!-- 组件中的内容  autosize自适应高度-->
        <div v-for="(item,index) in data.schedule" :key="'0'+index" class="conList">
            <div v-if="isShowWeek === item.weekday">
                <p class="title">{{item.weekday}} ({{item.date.split('-').join('.')}})</p>
                <div class="conter">
                    <div>上午 :</div>
                    <div v-html="item.shangwu.content"></div>
                </div>
                <div class="conter">
                    <div>下午 :</div>
                    <div v-html="item.xiawu.content"></div>
                </div>
                <div class="conter">
                    <div>晚上 :</div>
                    <div v-html="item.wanshang.content"></div>
                </div>
            </div>
        </div>
        <van-row type="flex" justify="space-around" class="foot">
            <van-button size="mini" :class="isToday === 1 ? 'btnBlue':'onBtnBlue'" @click="weekList(1,'yes')">星期一</van-button>
            <van-button size="mini" :class="isToday === 2 ? 'btnBlue':'onBtnBlue'" @click="weekList(2,'yes')">星期二</van-button>
            <van-button size="mini" :class="isToday === 3 ? 'btnBlue':'onBtnBlue'" @click="weekList(3,'yes')">星期三</van-button>
            <van-button size="mini" :class="isToday === 4 ? 'btnBlue':'onBtnBlue'" @click="weekList(4,'yes')">星期四</van-button>
            <van-button size="mini" :class="isToday === 5 ? 'btnBlue':'onBtnBlue'" @click="weekList(5,'yes')">星期五</van-button>
            <van-button size="mini" :class="isToday === 6 ? 'btnBlue hideBtn1':'onBtnBlue hideBtn1'" class="" @click="weekList(6,'yes')" v-if="isLiuRi">星期六</van-button>
            <van-button size="mini" :class="isToday === 7 ? 'btnBlue hideBtn2':'onBtnBlue hideBtn2'" @click="weekList(7,'yes')" v-if="isLiuRi">星期日</van-button>
            <van-button size="mini" :class="isToday === 8 ? 'btnBlue':'onBtnBlue'" @click="sunday">更多<img :src="moreImg" class="moreImgSize" ref="reference"></van-button>
        </van-row>
    </div>
</template>

<script>
export default {
    props: ['data', 'hldList', 'sche'],
    data () {
        return {
            dataNew: {},
            hldListInfor: {},
            isLiuRi: false,
            isShowWeek: '星期一',
            isToday: 0,
            moreIndex: 0,
            moreImg: require('@assets/image/scheduling-icon/tabar_icon_more@3x.png')
        }
    },
    async created () {
        if (this.sche === 'sche1') {
            this.isToday = new Date().getDay();
            this.weekList(new Date().getDay() === 0 ? 7 : new Date().getDay(), 'no')
        } else if (this.sche === 'sche2') {
            this.isToday = 1;
            this.weekList(1, 'no')
        }
    },
    methods: {
        sunday () {
            this.isLiuRi ? this.$refs.reference.style.transform = 'none' : this.$refs.reference.style.transform = 'rotate(180deg)'
            this.isLiuRi = !this.isLiuRi
            if (this.moreIndex === 6) {
                this.isToday = 6
            }
            if (this.moreIndex === 7) {
                this.isToday = 7
            }
        },
        weekList (n, yesOrNo) {
            if (yesOrNo === 'yes') {
                this.isToday = n;
                if (n > 5) {
                    this.moreIndex = n;
                    this.sunday();
                    this.isToday = 8;
                } else {
                    this.isLiuRi = false;
                }
            }
            let week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            this.isShowWeek = week[n - 1];
        }
    }
    
}
</script>

<style lang="less" scoped>
.conList{
    font-size: 16px;
    .title{
        font-size: 18px;
        margin: 12px 0 10px 15px;
    }
    .conter{
        display: flex;
        padding: 11px 15px;
        div:first-child{
            width: 50px;
            line-height: 24px;
        }
        div:last-child{
            width: 300px;
            line-height: 24px;
            margin-left: 6px;
        }
    }
}
.foot{
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0;
    padding: 0 4px;
    padding-bottom: 10px;
    box-sizing: border-box;
    *{
        width: 50px;
        height: 30px;
        line-height: 32px;
        font-size: 14px;
        border-radius: 2px;
        border: none;
    }
    .hideBtn1{
        position: absolute;
        left: 311px;
        bottom: 45px;
    }
    .hideBtn2{
        position: absolute;
        left: 311px;
        bottom: 80px;
    }
    .moreImgSize{
        width: 13px;
        height: 15px;
        vertical-align: middle;
    }
    .btnBlue{
        background: #3D88FF;
        color: #FFFFFF;
    }
    .onBtnBlue{
        background: #F7F7F7;
        color: rgba(102,102,102,1);
    }
}
</style>
