<template>
    <div class="wrap">
        <!-- 人员信息列表 -->
        <div class="userHead">
            <van-cell class="user" :title="queryData.xingming" style="line-height: 80px;">
                <van-icon size="80px" slot="icon" :name="require('@assets/image/mail-icon/default.png')" />
            </van-cell>
        </div>
        <van-cell-group>
            <van-cell class="info" title="单位" :value="queryData.danwei" />
            <van-cell class="info" title="内线" :value="queryData.neixian" />
            <van-cell class="info" title="外线" :value="queryData.waixian" />
            <van-cell class="info" title="传真" :value="queryData.chuanzhen" />
            <van-cell class="info" title="邮箱" :value="queryData.youxiang" />
            <van-cell class="info" title="房间号" :value="queryData.fangjianhao" />
            <van-cell class="info" title="手机" :value="queryData.shouji">
                <van-icon slot="right-icon" name="phone"  @click="phone(queryData.shouji)" v-if="queryData.shouji.length"/>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            queryData: []
        }
    },
    created () {
        this.queryData = this.$route.query
    },
    methods: {
        phone (value) {
            window.location.href = 'tel://' + value
        }
    }
}
</script>

<style lang="less" scoped>
.wrap {
    .userHead {
        border-bottom: solid 10px #FAFAFA;
        .van-icon--image {
            width: 55px;
            img {
                margin: auto 10px auto 0;
            }
        }
    }
    a {
        color: black
    }
    .user,.info {
        font-size: 20px;
    }
}
</style>
