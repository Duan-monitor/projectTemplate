<template>
  <div>
    <van-cell-group v-if="dataSonNew.flowsend.ROAMCanWriteOpinion === '1' || dataSonNew.flowsend.rm_type === 'leadopin'">
      <van-cell class="suggestion-title" title="填写意见"/>
      <van-field v-model="form.suggestion" type="textarea" placeholder="请输入意见" rows="3" autosize/>
      <van-cell title="选择常用意见" is-link arrow-direction="down" @click="chooseSug = true"/>
      <van-cell>
        <div>
			<span style="color: red">*</span>
			<van-radio-group style="display: inline-block; vertical-align: middle;" v-model="radio">
				<van-radio style="float: left; margin-left: 5px" name="1">同意</van-radio>
				<van-radio style="float: left; margin-left: 100px" name="2">不同意</van-radio>
			</van-radio-group>
		</div>
      </van-cell>
      <van-popup v-model="chooseSug" position="bottom">
        <van-picker
          show-toolbar
          :columns="dataSon.commentideas ? dataSon.commentideas : []"
          @cancel="chooseSug = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </van-cell-group>

    <div v-if="dataSonNew.flowsend.rm_type === 'singsubmit'">
      <div class="block-title">路径列表</div>
      <van-radio-group v-model="form.path">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in dataTra"
            :key="index"
            :title="item.name"
            clickable
            @click="onPathChange(item, $event)"
          >
            <van-radio :name="item.endid" @click="onPathChange(item, $event)"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div class="block-title">处理人</div>
      <van-checkbox-group v-model="form.optUser" v-if="dataUserList.radiotype === '1'">
        <van-cell-group v-for="(detp, index) in userlist" :key="index">
          <van-cell
            :title="detp.deptName.split('↑').slice(1).join('↑')"
            is-link
            arrow-direction="down"
          />
          <van-cell
            v-for="(user, index) in detp.userList"
            clickable
            :key="index"
            :title="user.name"
            @click="onUserChange(detp, user, $event)"
          >
            <van-checkbox :name="user" ref="checkboxes" @click="onUserChange(detp, user, $event)">
              <img
                class="checkbox"
                slot="icon"
                slot-scope="props"
                :src="props.checked ? require('@assets/image/detail-icon/多选-选中@3x.png') : require('@assets/image/detail-icon/多选-未选中@3x.png')"
              >
            </van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

      <van-radio-group v-model="currUser" v-else>
        <van-cell-group v-for="(detp, index) in userlist" :key="index">
          <van-cell
            :title="detp.deptName.split('↑').slice(1).join('↑')"
            is-link
            arrow-direction="down"
          />
          <van-cell
            v-for="(user, index) in detp.userList"
            clickable
            :key="index"
            :title="user.name"
            @click="onUserChange(detp, user, $event)"
          >
            <van-radio :name="user" ref="radios" @click="onUserChange(detp, user, $event)"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <van-button class="btn" type="info" size="large" @click="handleSubmit('common')">确认提交</van-button>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { getList } from '@api/getList.js';
import { okclickJs, getUsersJs } from '@api/Submit.js';

export default {
    name: 'submit',
    props: ['dataSon', 'dataTra', 'dataUser', 'dataListKey'],
    data () {
        return {
            onArr: true,
            checked: true,
            dataSonNew: [],
            routevalue: {},
            detpUser: {},
            dataUserList: {},
            chooseSug: false,
            currUser: '',
            userlist: [],
            form: {
                suggestion: '',
                path: '1',
                optUser: []
            },
            parameter: {},
            radio: '1'
        };
    },
    created () {
    // 赋值
        this.dataSonNew = this.dataSon;
        if (this.dataTra.length) {
            this.fetchData();
        }
    },
    methods: {
        fetchData () {
            this.dataUserList = this.dataUser;
            this.userlist = this.tileUserList(this.dataUserList.items);

            this.form.path = this.dataTra[0].endid;
            this.routevalue = this.dataTra[0];
            if (this.dataUserList.radiotype === '0') {
                this.form.optUser = {};
                this.onArr = false;
                if (
                    this.userlist.length === 1 &&
          this.userlist[0].userList.length === 1
                ) {
                    // this.currUser是单选v-model的值   默认选中
                    // this.form.optUser是被选中人的信息
                    // this.detpUser被选中人的部门和信息
                    this.currUser = this.form.optUser = this.userlist[0].userList[0];
                    this.detpUser = this.userlist[0];
                }
            } else if (this.dataUserList.radiotype === '1') {
                this.form.optUser = [];
                this.onArr = true;
            }
        },
        onConfirm (value) {
            this.form.suggestion = value;
            this.chooseSug = false;
        },
        // 提交事件
        async handleSubmit (flag) {
            this.parameter = {
                listKey: this.dataListKey, // 列表数据
                contentData: this.dataSonNew, // 详情内容
                routevalue: this.routevalue, // 选中的路径对象
                routeData: this.dataTra, // 所有的路径对象
                userTree: this.dataUserList, // 所有的用户
                selectedUsers: this.form.optUser, // 选中的用户
                detpUser: this.detpUser, // userlist => dept
                suggestion: this.form.suggestion, // 意见
                flag: flag // 单人处理-普通提交 // 单人处理-直接提交
            };
            const res = await okclickJs(this.parameter);

            if (res.goBack === 'goBack') {
                Toast('其他用户正在办理,请重新提交!');
                const res = await getList({
                    type: 'viewdoc',
                    query: {
                        key: this.dataListKey.appid,
                        dbpath: this.dataListKey.dbpath,
                        unid: this.dataListKey.unid
                    }
                });
                this.dataSonNew = res.data;
            } else if (res.data.status === 'success') {
                Toast('提交成功!');
                this.$router.replace({
                    path: '/list'
                });
            } else {
                Toast('出错啦!');
            }
        },
        // 平铺数据(数据处理)
        tileUserList (list) {
            return list.reduce((total, curr) => {
                let newList = [...total];
                if (curr.userlist && curr.userlist.length) {
                    newList.push({
                        deptName: curr.name,
                        deptId: curr.id,
                        userList: curr.userlist.sort((a, b) => {
                            return a.sort - b.sort;
                        })
                    });
                }
                if (curr.items && curr.items.length) {
                    newList = newList.concat(this.tileUserList(curr.items));
                }
                return newList;
            }, []);
        },

        // 点击路径,获取数据
        async onPathChange (pathItem, e) {
            e.stopPropagation();
            this.form.path = pathItem.endid;
            this.routevalue = pathItem;
            this.parameter = {
                listKey: this.dataListKey, // 列表数据
                contentData: this.dataSonNew, // 详情内容
                routevalue: pathItem // 选中的路径对象
            };
            const resUserList = await getUsersJs(this.parameter);

            this.dataUserList = resUserList.data.userlist;
            this.userlist = this.tileUserList(this.dataUserList.items);
            if (this.dataUserList.radiotype === '0') {
                this.form.optUser = {};
                this.onArr = false;
                if (
                    this.userlist.length === 1 &&
          this.userlist[0].userList.length === 1
                ) {
                    // this.currUser是单选v-model的值   默认选中
                    // this.form.optUser是被选中人的信息
                    // this.detpUser被选中人的部门和信息
                    this.currUser = this.form.optUser = this.userlist[0].userList[0];
                    this.detpUser = this.userlist[0];
                }
            } else if (this.dataUserList.radiotype === '1') {
                this.form.optUser = [];
                this.onArr = true;
            }
        },

        // 单选用户
        onUserChange (detp, detpUser, e) {
            e.stopPropagation();
            if (!this.onArr) {
                this.form.optUser = detpUser;
                this.detpUser = detp;
                this.currUser = detpUser;
            } else {
                this.detpUser = detp;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.van-cell:not(:last-child)::after {
  display: none;
}
.btn {
  background-color: @blue;
  border: 1px solid @blue;
}
.block-title {
  font-size: 14px;
  color: #8a8a8a;
  padding: 11px 15px;
}
.checkbox {
  height: 20px;
}
</style>
