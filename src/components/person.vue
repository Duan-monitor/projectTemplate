<template>
    <div>
        <!-- 部门人员组件 -->
        <search />
        <noData  v-if="noData"/>
        <van-cell class="vant" v-for="(item,index) in data" 
            @click="toInformation(item)" 
            :key="index"
            :title="item.xingming" 
            :value="item.danwei" 
            style="line-height: 40px;"
        >
            <van-icon size="40px" slot="icon" :name="require('@assets/image/mail-icon/default.png')" />
        </van-cell>
    </div>
</template>

<script>
import search from '@c/search'
import noData from '@c/noData'
import { getMailList } from '@api/mail'

export default {
    components: {
        search,
        noData
    },
    data () {
        return {
            id: '',
            data: [],
            items: {},
            noData: false
        }
    },
    created () {
        this.id = this.$route.query.id
        this.Ajax()
    },
    methods: {
        toInformation (items) {
            this.$router.push({
                path: '/information',
                query: items
            })
        },
        async Ajax () {
            let res = {}
            res = await getMailList({
                type: 'telbookorgdetail',
                query: {
                    docid: this.id
                }
            })
            this.data = res.data.data
        }
    }
}
</script>

<style lang="less" scoped>
.vant {
    font-size: 18px;
}
.van-cell__title {
    margin-left: 8px;
}
</style>