<template>
    <div class="wrap">
        <!-- 部门列表组件 -->
        <search />
        <div v-if="!store && !state">
            <!-- 支行部门、支行网点 -->
            <van-cell class="vant"
                v-for="(item,index) in data"
                @click="handleClickToPerson(item)"
                :key="index"
                :title="item.text"
                :value="item.value"
                style="line-height: 40px;" 
            >
                <van-icon size="40px" slot="icon" :name="require('@assets/image/mail-icon/默认头像@3x.png')" />
            </van-cell>
        </div>
        <div v-else>
            <!-- 部门列表 -->
            <van-cell class="vant"
                v-for="(item,index) in data"
                @click="handleClickToDepart(item)"
                :key="index"
                :title="item.text"
                :value="item.value"
                style="line-height: 40px;" 
            >
                <van-icon size="40px" slot="icon" :name="require('@assets/image/mail-icon/默认头像@3x.png')" />
            </van-cell>
        </div>
    </div>
</template>

<script>
import QUERY from '@u/QUERY'
import search from '@c/search'
import store from '@/store'
import { getMailList } from '@api/mail.js'
export default {
    components: {
        search
    },
    data () {
        return {
            isRoot: '',
            mail: [
                {
                    text: '总行',
                    type: 'Zong',
                    icon: require('@assets/image/mail-icon/默认头像@3x.png')
                },
                {
                    text: '支行',
                    type: 'Zhi',
                    icon: require('@assets/image/mail-icon/默认头像@3x.png')
                }
            ],
            subMail: [
                {
                    text: '支行部门',
                    type: 'person',
                    isleaf: 'false',
                    icon: require('@assets/image/mail-icon/默认头像@3x.png')
                },
                {
                    text: '支行网点',
                    type: 'depart',
                    isleaf: 'true',
                    icon: require('@assets/image/mail-icon/默认头像@3x.png')
                }
            ],
            data: [],
            // 判断跳转到静态支行部门、网点的两个变量
            store: false,
            state: true,
            // 判断跳转到支行网点夏季的部门列表的变量
            dot: false
        }
    },
    created () {
        this.data = this.mail
    },
    watch: {
        '$route': {
            handler: function () {
                this.isRoot = QUERY.parse(location.href).isRoot
                if (this.isRoot === '1') {
                    // 通讯录初始页面
                    this.data = this.mail
                } else if (this.store && this.state) {
                    // 跳转到支行部门、支行网点监听
                    this.data = this.subMail
                    this.store = this.state = false
                } else if (store.state.mailSubTwo && store.state.mailSubTwo.length && this.dot) {
                    // 支行网点部门列表监听
                    this.data = store.state.mailSubTwo
                    this.dot = false
                } else if (store.state.mailSubOne && store.state.mailSubOne.length) {
                    // 管辖支行跳转部门列表监听
                    this.store = true
                    this.data = store.state.mailSubOne
                } else {
                    // 跳转总行部门、支行部门一级列表监听
                    this.Ajax()
                }
            },
            immediate: true
        }
    },
    methods: {
        handleClickToDepart (items) {
            if (this.isRoot === '1') {
                this.$store.commit('SET_TITLE', '通讯录')
            } else {
                this.$store.commit('SET_TITLE', items.text)
            }
            // 跳转部门人员列表
            if (!this.store) {
                if (items.isleaf === 'true') {
                    // isleaf为真，跳转到人员列表
                    this.$router.push({
                        path: '/person',
                        query: { 
                            id: items.id,
                            text: items.text,
                            type: items.type,
                            code: Math.random().toString(36).substring(2)
                        }
                    })
                } else if (items.suborg && items.suborg.length) {
                    // isleaf为假，跳转到当前点击部门下的suborg
                    this.$store.commit('SET_MAILONE', items.suborg)
                    this.$router.push({
                        path: '/mail',
                        query: {
                            text: items.text,
                            type: items.type,
                            code: Math.random().toString(36).substring(2)
                        }
                    })
                } else {
                    // 支行跳转下路管辖支行、村镇银行、融农公司
                    this.$router.push({
                        path: '/mail',
                        query: { 
                            text: items.text,
                            type: items.type,
                            code: Math.random().toString(36).substring(2)
                        }
                    })
                }
            } else {
                // 跳转静态支行网点、支行部门
                this.$store.commit('SET_MAILTWO', items.suborg)
                this.$router.push({
                    path: '/mail',
                    query: {
                        id: items.id,
                        code: Math.random().toString(36).substring(2)
                    }
                })
            }
        },
        handleClickToPerson (items) {
            if (items.type === 'person' && items.isleaf === 'false') {
                // 支行部门跳转人员列表
                this.$router.push({
                    path: '/person',
                    query: {
                        id: this.$route.query.id,
                        code: Math.random().toString(36).substring(2)
                    }
                })
            } else if (items.type === 'depart' && items.isleaf === 'true') {
                // 支行网点跳转三级部门列表
                this.dot = true
                this.$router.push({
                    path: '/mail',
                    query: {
                        code: Math.random().toString(36).substring(2)
                    }
                })
            } else if (!this.dot && items.isleaf === 'true') {
                // 支行网点下级部门跳转人员列表
                this.$router.push({
                    path: '/person',
                    query: {
                        id: items.id,
                        code: Math.random().toString(36).substring(2)
                    }
                })
            } else {
                alert('网点路径错误')
            }
        },
        async Ajax () {
            let res = {}
            if (this.$route.query.type === 'Zong') {
                res = await getMailList({
                    type: 'telbookviewlist',
                    query: {
                        scope: 'zonghang'
                    }
                })
            } else {
                res = await getMailList({
                    type: 'telbookviewlist',
                    query: {
                        scope: 'zhihang'
                    }
                })
            }
            this.data = res.data.showlist
        }
    }
}
</script>

<style lang="less" scoped>
.list {
    font-size: 18px;
}
.van-cell__title {
    margin-left: 8px;
}
</style>