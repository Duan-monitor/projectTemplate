<template>
  <van-loading class="loading" v-if="loading" type="spinner"/>
  <div v-else>
    <!-- <h2>文种列表</h2> -->
    <van-row class="menu">
      <van-col @click.native="handleClickItem(item)" v-for="(item, index) in menu" :key="index" class="menu-item" span="6">
        <img :src="require(`@assets/image/menu-icon/${item.icon}`)" alt="">
        <p>{{item.label}}</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import QUERY from '@u/QUERY'
import menu from '@j/twoLevelMenu.js'

export default {
    name: 'home',
    data () {
        return {
            menu: [],
            oneLevel: '',
            loading: true
        }
    },
    created () {
        this.loading = true
        this.$watch('$store.state.user', function (val) {
            if (val.fullname) {
                this.loading = false;
                this.setMenu()
            }
        }, {
            immediate: true
        })
    },
    methods: {
        handleClickItem (item) {
            this.$store.commit('SET_KEY', item.key)
            this.$store.commit('SET_RECORDTYPE', item.type)
            this.$router.push({
                path: 'list',
                query: item
            })
        },
        setMenu () {
            const scope = this.$store.state.user.scope
            this.oneLevel = QUERY.parse(location.search).index
            this.$store.commit('SET_TITLE', menu[this.oneLevel].title)
            if (menu[this.oneLevel].isDef) {
                this.menu = scope === '1' ? menu[this.oneLevel].Zong : menu[this.oneLevel].Zhi
            } else {
                this.menu = menu[this.oneLevel].noDef
            }
            if (!this.menu.length) {
                this.$router.replace({
                    path: 'list',
                    query: {
                        label: menu[this.oneLevel].title,
                        isRoot: '1'
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.loading {
  margin: 40% auto;
}
.menu {
  padding-top: 40px;
	.menu-item {
    text-align: center;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      margin-top: 8px;
      margin-bottom: 24px;
      font-size: 14px;
    }
	}
}
.loading /deep/ .van-loading__spinner {
    height: 30px;
}
</style>