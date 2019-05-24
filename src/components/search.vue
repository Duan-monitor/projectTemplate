<template>
    <div>
        <van-search placeholder="搜索" v-model="a"  input-align="center" background="#FAFAFA"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            a: ''
        }
    }
}
</script>

<style lang="less" scoped>
.van-search {
    .van-search__content {
        background: white
    }
    /deep/ .van-field__left-icon {
        position: absolute;
        left: 38%;
    }
}
</style>
