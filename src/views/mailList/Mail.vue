<template>
  <div class="wrap">
    <van-cell-group>
        <department></department>
    </van-cell-group>
  </div>
</template>

<script>
import department from '@c/department'

export default {
    components: {
        department
    },
    data () {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
.vant {
    font-size: 18px;
    .van-cell__title {
        margin-left: 8px;
    }
}
</style>