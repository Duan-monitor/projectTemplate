<template>
    <van-loading class="loading" v-if="loading" type="spinner"/>
    <div v-else class="sche">
        <van-row type="flex" justify="space-between" class="titleTop">
            <van-button size="small" style="color:#E89849;background:#FFE5CB" @click="onWeek('0')">本周</van-button>
            <van-button size="small" style='color:#8974FF;background:#F4F2FF' @click="onWeek('1')">上周</van-button>
            <van-button size="small" style='color:#3AAEA2;background:#E8FBF9' @click="onWeek('2')">下周</van-button>
            <van-button size="small" style='color:#4DA9EE;background:#EFF8FF' @click="toLeaderList('leaderOne')">领导日程</van-button>
            <van-button size="small" style='color:#EA7676;background:#FFEFEF' @click="toEditPage()">编辑</van-button>
        </van-row>
        <scheduling :data='data' sche='sche1'></scheduling>
    </div>
</template>
<script>
import { getScheduling } from '@api/getScheduling.js'
import scheduling from '@c/scheduling'
export default {
    components: {
        scheduling
    },
    data () {
        return {
            loading: true,
            isLiuRi: false,
            data: {},
            weekArr: [
                {
                    label: '本周',
                    isClass: false,
                    class: 'thisWeek',
                    type: '0'
                },
                {
                    label: '上周',
                    isClass: false,
                    class: 'lastWeek',
                    type: '1'
                },
                {
                    label: '下周',
                    isClass: false,
                    class: 'nextWeek',
                    type: '2'
                },
                {
                    label: '领导日程',
                    isClass: false,
                    class: 'agendaWeek',
                    type: 'agenda'
                },
                {
                    label: '编辑',
                    isClass: false,
                    class: 'editWeek',
                    type: 'edit'
                }
            ]
        }
    },
    created () {
        this.$store.commit('SET_TITLE', '行程安排');
        this.onWeek('0');
    },
    methods: {
        async fetchData () {
        },
        async onWeek (num) {
            this.loading = true;
            let strdate = {
                '0': '',
                '1': this.data.weekfirstday,
                '2': this.data.weeklastday
            }
            const res = await getScheduling({
                type: 'getschedule',
                query: {
                    strdate: strdate[num],
                    strtype: num,
                    isissue: '0'
                }
            })
            this.data = res.data.result;
            this.loading = false;
        },
        toLeaderList () {
            this.$router.push({
                path: '/schedule'
            })
        },
        toEditPage () {
            this.$router.push({
                path: '/editPage',
                query: this.data
            })
        }
    },
    watch: {
        'listKey': {
            handler: function () {
                this.fetchData();
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="less" scoped>
.loading {
  margin: 40% auto;
}
.sche{
    margin-bottom: 40px;
    .titleTop{
        width: 345px;
        text-align: center;
        align-items: center;
        padding: 14px 0;
        margin: auto;
        /deep/ *{
            width: 60px;
            height: 30px;
            border-radius: 2px;
            border: none;
            font-size: 15px;
            padding: 0;
        }
    }
}
</style>
