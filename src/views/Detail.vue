<template>
    <van-loading class="loading" v-if="loading" type="spinner"/>
    <div v-else style="background-color: #f9fcff; min-height: 100%; padding-bottom: 80px">
        <keep-alive>
            <router-view :dataSon="data" :dataTra="dataRoute" :dataUser="dataUserList" :dataListKey='listKey' />
        </keep-alive>
        <van-tabbar v-model="active">
            <van-tabbar-item to="dispatchDoc" replace>
                <span>办文单</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="require(props.active ? '@assets/image/detail-icon/发文单-选中@3x.png' : '@assets/image/detail-icon/发文单-未选中@3x.png')"
                >
            </van-tabbar-item>
            <van-tabbar-item to="suggestion" replace>
                <span>意见</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="require(props.active ? '@assets/image/detail-icon/意见-选中@3x.png' : '@assets/image/detail-icon/意见-未选中@3x.png')"
                >
            </van-tabbar-item>
            <van-tabbar-item to="submit" replace v-if="isSubmit">
                <span>提交</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="require(props.active ? '@assets/image/detail-icon/提交-选中@3x.png' : '@assets/image/detail-icon/提交-未选中@3x.png')"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { getList } from '@api/getList.js';
import { trajectory, getUsersJs } from '@api/Submit.js'

const iconPath = '@assets/image/detail-icon/'
export default {
    props: ['dataSon', 'dataTra', 'dataUser', 'dataListKey'],
    data () {
        return {
            data: {
                flowsend: {}
            },
            loading: true,
            isSubmit: true,
            dataRoute: {},
            dataUserList: {},
            routevalue: {},
            listKey: this.$route.query,
            active: 0,
            tabIcon: {
                dispatchDoc: {
                    active: '@assets/image/detail-icon/发文单-选中@3x.png',
                    normal: iconPath + '发文单-未选中@3x.png'
                },
                suggestion: {
                    active: iconPath + '意见-选中@3x.png',
                    normal: iconPath + '意见-未选中@3x.png'
                },
                submit: {
                    active: iconPath + '提交-选中@3x.png',
                    normal: iconPath + '提交-未选中@3x.png'
                }
            },
            parameter: {}
        }
    },
    methods: {
        async fetchData () {
            const res = await getList({
                type: 'viewdoc',
                query: {
                    key: this.listKey.appid,
                    dbpath: this.listKey.dbpath,
                    unid: this.listKey.unid
                }
            });
            this.$store.commit('SET_TITLE', res.data.viewtitle)
            this.data = res.data;
            this.isSubmit = !!((this.data.flowsend.fldIsEditType === '1' || this.data.flowsend.rm_type === 'leadopin'))

            if (this.data.flowsend.fldIsEditType === '1' && this.data.flowsend.rm_type !== 'leadopin') {
                this.parameter = {
                    listKey: this.listKey, // 列表数据
                    contentData: this.data // 详情内容
                }
                const resRoute = await trajectory(this.parameter);
                this.dataRoute = resRoute.data.items;
                
                switch (this.dataRoute.length) {
                case 0:
                    this.isSubmit = false;
                    break;
                default:
                    this.parameter.routevalue = this.dataRoute[0]
                    const resUserList = await getUsersJs(this.parameter);
                    this.dataUserList = resUserList.data.userlist;
                    break;
                }
            }
            this.loading = false;
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
.loading /deep/ .van-loading__spinner {
    height: 30px;
}
</style>
