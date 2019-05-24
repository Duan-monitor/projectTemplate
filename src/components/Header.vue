<template>
    <van-nav-bar @click-left="handleClickLeft" @click-right="handleClickRight" class="header" :title="$store.state.title" left-arrow fixed>
        <img class="close-btn" src="@assets/image/小程序@2x.png" slot="right">
    </van-nav-bar>
</template>
<script>
export default {
    methods: {
        handleClickLeft () {
            if (this.$route.path === '/' || this.$route.query.isRoot === '1') {
                // eslint-disable-next-line
                MXWebui.closeWindow();  
            } else {
                history.go(-1)
            }
        },
        handleClickRight () {
            // eslint-disable-next-line
            MXWebui.closeWindow();  
        }

    }
}
</script>
<style lang="less" scoped>
.header {
    background-color: @blue;
}
.header /deep/ .van-nav-bar__title {
    color: #fff
}

.header /deep/ .van-icon-arrow-left {
    color: #fff
}
.close-btn {
    height: 30px;   /* no */
    transform: translateY(9px)     /* no */
}
</style>
