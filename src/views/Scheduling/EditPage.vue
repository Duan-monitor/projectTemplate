<template>
    <div class="edit">
        <div v-for="(item,index) in data.schedule" :key="'0'+index" class="conList">
            <div v-if="item.canedit === '0'">
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
        <!-- clearable  清除控件 -->
        <div v-for="(item,index) in dataN" :key="index" class="conList edit_bor">
            <div v-if="item.canedit === '1'">
                <p class="title">{{item.weekday}} ({{item.date.split('-').join('.')}})</p>
                <van-cell-group>
                    <van-field
                        v-model="item.shangwu.content"
                        label="上午 :"
                        placeholder="活动内容为空"
                        autosize
                        type="textarea"
                        @input="hldContent(item.shangwu.content, item.shangwu.unid)"
                    />
                    <van-field
                        v-model="item.xiawu.content"
                        label="下午 :"
                        placeholder="活动内容为空"
                        autosize
                        type="textarea"
                        @input="hldContent(item.xiawu.content, item.xiawu.unid)"
                    />
                    <van-field
                        v-model="item.wanshang.content"
                        label="晚上 :"
                        placeholder="活动内容为空"
                        autosize
                        type="textarea"
                        @input="hldContent(item.wanshang.content, item.wanshang.unid)"
                    />
                </van-cell-group>
            </div>
        </div>
        <van-button type="info" class="preservation" @click="preservation">保存</van-button>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { getScheduling } from '@api/getScheduling.js'
export default {
    data () {
        return {
            data: this.$route.query,
            dataN: {},
            dataNew: [],
            labelWidthSize: '20px'
        }
    },
    created () {
        this.$store.commit('SET_TITLE', '日程安排详情');
        this.dataN = this.data.schedule.reduce((total, curr) => {
            curr.shangwu.content = curr.shangwu.content.replace(/<br>/g, '\n')
            curr.xiawu.content = curr.xiawu.content.replace(/<br>/g, '\n')
            curr.wanshang.content = curr.wanshang.content.replace(/<br>/g, '\n')
            total.push(curr);
            return total;
        }, [])
    },
    methods: {
        async fetchData () {
            console.log('')
        },
        hldContent (con, unid) {
            let index = this.dataNew.findIndex((element) => (element.unid === unid));
            if (index === -1) {
                this.dataNew.push({
                    unid: unid,
                    content: con
                })
            } else {
                this.dataNew[index].content = con;
            }
        },
        async preservation () {
            if (this.dataNew.length) {
                const res = await getScheduling({
                    type: 'editschedule',
                    query: {
                        memo: this.data.memo,
                        memounid: this.data.memounid,
                        shedule: this.dataNew
                    }
                })
                if (res.data.status === 'success') {
                    Toast('提交成功!');
                    this.$router.replace({ path: '/scheduling' });
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.edit{
    margin-bottom: 60px;
}
.preservation{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    border-radius: 25px;
    background: @blue;
    border: none;
}
.conList{
    margin: 15px 0;
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
    /deep/ .van-field__label{
        max-width:50px;
        padding-top: 11px;
        font-size: 16px;
    }
    /deep/ .van-field__control{
        padding: 11px 4px;
        border: solid 1px #F8F8F8;
        font-size: 16px;
    }
    /deep/ .van-cell{
        padding-top: 5px;
        padding-bottom: 5px;
    }
    /deep/ .van-cell:not(:last-child)::after , [class*=van-hairline]::after{
        border: none;
    }

}
</style>
