<template>
    <van-loading class="loading" v-if="loading" type="spinner"/>
    <div v-else class="sche">
        <van-row class="hldListBox">
            <div v-for="(hld,index) in hldListFn(hldList)" :key="index" @click="hldBtn(hld,index)">
                <van-button size="small" :class="hld.isClass ? 'btnClass' : 'onBtnClass'" v-if="hld.username!==''">{{hld.username}}</van-button>
            </div>
        </van-row>
        <scheduling :data='data' sche='sche2'></scheduling>
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
            data: {},
            hldList: {}
        }
    },
    async created () {
        this.$store.commit('SET_TITLE', '领导日程');
        const res = await getScheduling({
            type: 'getleaders',
            query: {
                isissue: '0'
            }
        })
        this.hldList = res.data.leaders;
        this.hldList.forEach(item => {
            item.isClass = false;
        })
        this.hldList[0].isClass = true;
        this.hldListInforFn(this.hldList[0].fullname);
    },
    methods: {
        async fetchData () {
            console.log('')
        },
        hldBtn (hld) {
            this.loading = true;
            if (hld.username) {
                this.hldList.forEach(item => {
                    item.isClass = false;
                })
                hld.isClass = true;
                this.$forceUpdate();
                this.hldListInforFn(hld.fullname);
            }
        },
        async hldListInforFn (hldFullName) {
            const res = await getScheduling({
                type: 'getissueschedule',
                query: {
                    strtype: '0',
                    isissue: '1',
                    leadername: hldFullName
                }
            })
            this.data = res.data.result;
            this.loading = false;
        }
    },
    computed: {
        hldListFn () {
            return function (hldList) {
                if (hldList.length % 5 === 0) {
                    return hldList;
                } else {
                    let num = 5 - (hldList.length % 5);
                    for (let i = 0; i < num; i++) {
                        hldList.push({
                            username: '',
                            isClass: false
                        });
                    }
                    return hldList
                }
            };
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
}
.hldListBox{
    padding: 0 4px;
    text-align: center;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    *{
        border: none;
        margin-bottom: 4px;
        width: 20%;
    }
    .btnClass{
        background: #3D88FF;
        color: #FFFFFF;
    }
    .onBtnClass{
        background: #F7F7F7;
        color: rgba(102,102,102,1);
    }
}
</style>