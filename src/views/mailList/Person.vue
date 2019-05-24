<template>
    <div>
        <!-- 部门人员列表 -->
        <person></person>
    </div>
</template>
<script>
import person from '@c/person'

export default {
    components: {
        person
    },
    data () {
        return {
        }
    },
    methods: {
        // toInformation (items) {
        //     this.$router.push({
        //         path: '/information',
        //         query: items
        //     })
        // },
        // async Ajax () {
        //     let res = {}
        //     res = await getMailList({
        //         type: 'telbookorgdetail',
        //         query: {
        //             docid: this.$route.params.id
        //         }
        //     })
        //     this.data = res.data.data
        // }
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