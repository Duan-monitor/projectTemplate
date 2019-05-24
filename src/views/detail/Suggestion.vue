<template>
    <div class="wrap">
        <van-cell class="item" v-for='(item,index) in opinions' :key="index">
            <p class="title">
                {{item.label}}
            </p>
            <div v-if="!item.value.length">
                <span>暂无意见</span>
            </div>
            <div v-else v-for="(_item, i) in item.value" :key="i">
                <p class="sugg">
                    <span v-html="_item.content"></span>
                </p>
                <p class="desp">
                    {{_item.user}}&emsp;{{_item.orgname}}（{{_item.time}}）
                </p>
               
            </div>
        </van-cell>
    </div>
</template>
<script>
export default {
    name: 'suggestion',
    props: ['dataSon'],
    data () {
        return {
            opinions: []
        }
    },
    created () {
        var idealabel = this.dataSon.idealabel // value
        var opinionlist = this.dataSon.opinionlist // type
        
        const opinions = idealabel.map(item => {
            let value = item.value.split(';').map(val => {
                return opinionlist.filter(_item => _item.type === val) 
            }).filter(_item => !!_item)
            value = [].concat.apply([], value)
            return {
                ...item,
                value
            }
        })
        this.opinions = opinions
    }
    
}
</script>
<style lang="less" scoped>
.wrap { 
    padding-top: 7px; 
    box-sizing: border-box;
    font-size: 17px;
    overflow: hidden;
    .item {
        margin-top: 13px;
        .title {
            font-weight: bold;
            line-height: 24px;
        }
        .sugg {
            color: #333;
            margin-top: 11px;
        }
        .desp {
            color: #929292;
            margin-top: 8px;
        }
    }
}

</style>
