import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: '',
        token: '',
        key: '',
        mx_app_id: 'OA_Zonggongwen',
        user: {},
        env: {},
        recordType: ''
    },
    mutations: {
        SET_TITLE (state, title) {
            // 当前用户点击的文种
            state.title = title
        },
        SET_TOKEN (state, token) {
            // 敏行token
            state.token = token
        },
        SET_USER (state, user) {
            // 当前用户身份信息
            state.user = user
        },
        SET_KEY (state, key) {
            // 当前用户所在文种的key值
            state.key = key
        },
        SET_ENV (state, env) {
            state.env = env
        },
        SET_RECORDTYPE (state, recordType) {
            // 当前文种类型
            state.recordType = recordType
        },
        SET_MAILONE (state, mailSubOne) {
            // 通讯录管辖支行数据
            state.mailSubOne = mailSubOne
        },
        SET_MAILTWO (state, mailSubTwo) {
            // 通讯录管辖支行数据二级
            state.mailSubTwo = mailSubTwo
        }
    },
    actions: {

    }
})
