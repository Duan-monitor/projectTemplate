<template>
  <van-loading class="loading" v-if="loading" type="spinner"/>
  <div v-else class="wrap">
    <noData v-if="noData"></noData>
    <div
      class="list-item"
      v-for="(item, index) in list"
      :key="index"
      @click="handleClickToDetail(item)"
    >
      <p class="title">{{item.title || '空'}}</p>
      <div class="desp">
        <p style="float: left">
          <span>{{item.user}}</span>
        </p>
        <p style="float: right">{{item.time}}</p>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="btn-group">
      <van-button
        :disabled="form.pagenum === 1"
        class="pre"
        round
        type="primary"
        @click="handleChangePage(-1)"
      >上一页</van-button>
      <van-button
        :disabled="Math.ceil(total / 8) === form.pagenum"
        class="next"
        round
        type="primary"
        @click="handleChangePage(1)"
      >下一页</van-button>
    </div>
  </div>
</template>
<script>
import noData from '@c/noData'
import QUERY from '@u/QUERY' // 获取当前url的传参
import menu from '@j/twoLevelMenu.js' // 
import { getList } from '@api/getList.js' // 公文管理列表接口
import { getNotice } from '@api/notice.js' // 通知公告列表接口

export default {
    name: 'list',
    components: {
        noData
    },
    data () {
        return {
            loading: true,
            form: {
                // 公文管理传递参数
                pagenum: 1,
                pagesize: 8,
                totalcount: 0
            },
            noData: false,
            oneLevel: '',
            total: 8,
            allData: [], // 假分页数据
            list: [] // 真分页数据
        };
    },
    async created () {
        this.form.key = this.$store.state.key
        // 获取url中传递的参数（index = GongWen）
        this.oneLevel = QUERY.parse(location.search).index
        this.$store.commit('SET_TITLE', this.$route.query.label)
        if (menu[this.oneLevel].truethPage) { // 假分页
            this.$watch('$store.state.user.fullname', {
                handler: function () {
                    if (this.$store.state.user.fullname) {
                        this.fetchData();
                    }
                },
                immediate: true
            })
        } else {
            this.$watch('form.pagenum', {
                handler: function () {
                    this.fetchData();
                },
                immediate: true
            })
        }
    },
    methods: {
        async fetchData () {
            let res = {};
            this.loading = true
            if (this.oneLevel === 'GongWen' || this.oneLevel === 'YinZhang' || this.oneLevel === 'DuBan') {
                res = await getList({
                    query: this.form,
                    type: 'viewlist',
                    dir: this.$store.state.user.dir,
                    scope: this.$store.state.user.scope,
                    fullname: this.$store.state.user.fullname
                })
            } else if (this.oneLevel === 'ZaiBan' || this.oneLevel === 'DaiBan') {
                res = await getList({
                    fullname: this.$store.state.user.fullname,
                    type: this.$store.state.user.scope === '1' ? menu[this.oneLevel].type.Zong : menu[this.oneLevel].type.Zong
                })
            } else if (this.oneLevel === 'ZongDaiBan') {
                res = await getList({
                    fullname: this.$store.state.user.fullname,
                    type: menu[this.oneLevel].type
                })
            } else if (this.oneLevel === 'BaoBiao' || this.oneLevel === 'DianZi' || this.oneLevel === 'YinHang') {
                this.$store.commit('SET_RECORDTYPE', '1')
                this.form.key = menu[this.oneLevel].key
                res = await getList({
                    query: this.form,
                    type: 'viewlist'
                })
            } else if (this.oneLevel === 'notice') {
                res = await getNotice(menu[this.oneLevel].json)
            } else if (this.oneLevel === 'XingCheng') {
                this.$router.replace({
                    path: menu[this.oneLevel].routingJump,
                    query: {
                        label: menu[this.oneLevel].title,
                        isRoot: '1'
                    }
                })
                return
            } else {
                console.log('类型未配置')
            }
            setTimeout(() => {
                this.loading = false;
            }, 100);
            if (!res.data.showlist) {
                this.noData = true
            } else {
                if (menu[this.oneLevel].truethPage) {
                    this.allData = res.data.showlist.sort((a, b) => 
                        Date.parse(b.time) - Date.parse(a.time)
                    );
                    this.total = this.allData.length
                } else {
                    this.form.totalcount = res.data.totalcount
                    this.list = res.data.showlist.sort((a, b) => 
                        Date.parse(b.time) - Date.parse(a.time)
                    );
                }
            }
            this.total = res.data.totalcount
            this.handleChangePage()
        },
        handleChangePage (page = 0) {
            this.form.pagenum = this.form.pagenum + page;
            if (menu[this.oneLevel].truethPage) {
                this.list = this.allData.slice(this.form.pagesize * (this.form.pagenum - 1), this.form.pagesize * this.form.pagenum)
            }
        },
        handleClickToDetail (detail) {
            this.$router.push({
                path: menu[this.oneLevel].routingJump,
                query: detail
            });
        }
    }
};
</script>
<style lang="less" scoped>
.loading {
  margin: 40% auto;
}
.wrap {
  padding-top: 31px;
  padding-bottom: 30px;
  .list-item {
    padding: 0 16px;
    margin-bottom: 18px;
    .title {
      font-size: 15px;
      line-height: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .desp {
      font-size: 13px;
      color: #9d9d9d;
      margin-top: 10px;
    }
  }
  .btn-group {
    width: 80%;
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    .pre {
      background-color: @blue;
    }
    .next {
      background-color: #ebc251;
    }
  }
  .btn-group /deep/ .van-button--primary {
    border: 0;
    width: 118px;
  }
}
.loading /deep/ .van-loading__spinner {
    height: 30px;
}
</style>