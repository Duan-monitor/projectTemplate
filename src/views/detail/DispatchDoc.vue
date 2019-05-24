<template>
    <van-loading class="loading" v-if="loading" type="spinner"/>
    <div v-else class="wrap">
        <van-cell-group v-if="dataSon.flowsend.RoaIsSendDirect == '1' 
            && $store.state.user.scope == '1'">
            <van-cell class="suggestion-title" title="填写意见" :border="false" />
            <van-field
                v-model="suggestion"
                type="textarea"
                placeholder="请输入留言"
                rows="3"
                autosize
            />
            <van-cell title="选择常用意见" is-link arrow-direction="down" @click="chooseSug = true" />
            <van-popup v-model="chooseSug" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="dataSon.commentideas ? dataSon.commentideas : []"
                    @cancel="chooseSug = false"
                    @confirm="onConfirm"
                />
            </van-popup>
            <van-button class="btn" type="info" size="large" @click="handleSubmit('direct')">提交</van-button>
        </van-cell-group>
        <!-- {{JSON.stringify(dataSon.draft)}} -->
        <div v-for="(block, blockIndex) in dataSon.draft" :key="blockIndex">
            <p class="block-title">{{block.blocklabel}}</p>
            <van-cell-group>
                <van-cell v-for="(item, index) in block.items" :key="index" :title="item.label" :class="`cell ${item.showtype === 'multi' ? 'multi-cell' : ''}`">
                    <span v-if="item.datatype === 'text'">
                        <span v-html="item.value.replace(/\n/g, '<br/>')" style="word-break:break-all"></span>
                    </span>

                    <span class="attach" v-else-if="item.datatype === 'body' && Object.keys(dataSon.worddoc).length" @click="handleClickCell(item, dataSon.worddoc)">
                        查看正文
                    </span>
                    
                    <span v-else-if="item.datatype === 'attach'">
                        <p class="title attach" v-for="(attachCom, index) in onAttachList(item.value)" :key="index" @click="handleClickCell(item, attachCom)" >
                            {{attachCom.name}}
                        </p>
                    </span>
                    <span v-else-if="item.datatype === 'show-attach'">
                        <p class="title attach" v-for="(attachCom, index) in item.value" :key="index" @click="handleClickCell(item, attachCom)" >
                            {{attachCom.name}}
                        </p>
                    </span>
                    <span v-else-if="item.datatype === 'group'">
                        <div style="padding: 10px 0" v-for="(_item, _index) in item.value" :key="_index" >
                            <div v-if="_item.type === 'attach'">
                                <p class="title attach" v-for="(attachCom, index) in onAttachList(_item.value)" :key="index" @click="handleClickCell(item, attachCom)" >
                                    {{attachCom.name}}
                                </p>
                            </div>
                            <div v-else-if="item.datatype === 'show-attach'">
                                <p class="title attach" v-for="(attachCom, index) in _item.value" :key="index" @click="handleClickCell(item, attachCom)" >
                                    {{attachCom.name}}
                                </p>
                            </div>
                            <div v-else>
                                <strong>{{_item.label}}</strong><span style="color: #969799">{{_item.value}}</span>
                            </div>
                        </div>
                    </span>
                </van-cell>
            </van-cell-group>
            </div>
            
        </div>
</template>
<script>
import { Toast } from 'vant';
import { getList } from '@api/getList.js';
import { openUrlPage } from '@u/mxApi';
import { okclickJs } from '@api/Submit.js';

export default {
    name: 'dispatchDoc',
    props: {
        dataSon: {
            default: {},
            type: Object
        }
    },
    data () {
        return {
            parameter: {},
            suggestion: '',
            attachlist: [],
            loading: false,
            chooseSug: false,
            listKey: this.$route.query
        }
    },
    methods: {
        async handleClickCell (attachType, attachData) {
            this.loading = true
            document.addEventListener('resume', () => {
                this.loading = false
            }, false);
            const res = await getList({
                type: 'showattach',
                query: {
                    name: attachData.attachname,
                    dbpath: attachData.dbpath,
                    unid: attachData.unid
                }
            });
            openUrlPage(`${this.$store.state.env.attachview}=${encodeURIComponent(res.data.url)}`);
        },
        onConfirm (value) {
            this.suggestion = value
            this.chooseSug = false
        },
        async handleSubmit (flag) {
            this.parameter = {
                listKey: this.listKey, // 列表数据
                contentData: this.dataSon, // 详情内容
                suggestion: this.suggestion, // 意见
                flag: flag // 单人处理-普通提交 // 单人处理-直接提交
            }
            const res = await okclickJs(this.parameter);
            if (res.data.status === 'success') {
                Toast('提交成功!');
                this.$router.replace({
                    path: '/list'
                });
            }
        }
    },  
    computed: {
        onAttachList () {
            return function (attachVal) {
                const test = arr => {
                    return arr.reduce((total, curr) => {
                        if (attachVal.split(';').indexOf(curr.type) > -1) {
                            total.push(curr);
                        }
                        return total;
                    }, []);
                };
                return test(this.dataSon.attachlist);
            };
        }
    }
}
</script>
<style lang="less" scoped>
.wrap {
    overflow: hidden;
}
.loading {
  margin: 40% auto;
}
.loading /deep/ .van-loading__spinner {
    height: 30px;
}
.btn {
    background-color: @blue;
    border: 1px solid @blue
}
.title{
    margin-bottom:6px;
}
.cell {
    display: block;
}
.cell /deep/ .van-cell__title {
    float: left;
    font-weight: bold;
}

.cell /deep/ .van-cell__value {
    float: left;
    text-align: left

}
.cell.multi-cell /deep/ .van-cell__value {
    width: 100%
}
.attach::after {
    content: '';
    display: inline-block;
    height: 15px;
    width: 15px;
    margin-left: 5px;
    background-image: url('~@assets/image/detail-icon/附件@3x.png');
    background-size: contain;
    background-repeat: no-repeat;
    vertical-align: middle;
}
.block-title {
    line-height: 30px;  /* no */
    font-size: 14px;    /* no */
    min-height: 10px;   /* no */
    padding-left: 15px; /* no */
    color: #8A8A8A;
}
</style>
