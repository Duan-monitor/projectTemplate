<template>
    <div class="wrap">
        <div class="rich-text" style="color: #000; overflow: visible" v-html="article.find(item => item.datatype === 'html').value"></div>
        <van-cell-group>
            <van-cell v-for="(item, index) in article" :key="index" :title="item.label ? item.label + '：' : ''" :class="'cell ' + item.datatype">
                <div v-if="item.datatype !== 'html'">
                    {{item.value}}
                </div>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script>
import { getNotice } from '@api/notice.js'

export default {
    data () {
        return {
            json: {
                type: 'noticeviewdoc',
                query: {
                    key: 'notice',
                    unid: this.$route.query.unid,
                    dbpath: this.$route.query.dbpath
                }
            },
            data: [],
            article: []
        }
    },
    async created () {
        const res = await getNotice(this.json)
        this.article = res.data.draft
        this.data = res.data
    }
}
</script>
<style lang="less" scoped>
.wrap {
    box-sizing: border-box;
}
.wrap /deep/ img{
    width: 50%;
}

.wrap /deep/ p{
    width: 100%;
}
.cell {
    display: block;
    box-sizing: border-box;
}
.cell /deep/ .van-cell__title {
    float: left;
    font-weight: bold;
}
.cell /deep/ .van-cell__value {
    width: 100%;
    overflow-y: hidden;
    float: left;
    text-align: left;
}
.rich-text {
    zoom: 0.7;
}
.wrap {
    padding: 30px 10px;
    font-size: 16px;
}
</style>
