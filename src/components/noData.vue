<template>
    <div class="wrap">
        <div class="pic">
            <img src="@assets/image/noData.png" alt="">
        </div>
        <p>没有更多数据了</p>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.wrap {
    padding-top: 50px;
    text-align: center;
    .pic {
        margin: 0 auto;
        img {
            width: 20%;
        }
    }
    p {
        color: #666
    }
}
</style>