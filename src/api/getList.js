/* eslint-disable */ 
import http from './config'
import store from '@/store'

// type: 文种类型
// user.scope: 用户身份
/* 根据json文件中的twoLevelMenu.js配置的type类型判断当前用户点击的文种类型 */
export const getList = json => {
    // 全行、总行、支行请求数据列表统一使用minxingnew.nsf数据库
    let requestUrl = ''
    if (store.state.recordType === '1') {
        requestUrl = 'minxingfull.nsf'
    } else {
        requestUrl = store.state.user.scope === '1' ? 'minxingnew.nsf' : 'mobilezh.nsf'
    }
    return http.post(`http://${store.state.user.serverip}/mobile/${requestUrl}/mobilequery?openagent`, { json })
}
export const oaflowsend = (json) => {
    // 提交接口中:
    /* 
    ip地址:  
        全行使用 public 中配置的静态ip
        总行、支行使用user中的serverip
    数据库地址:
        全行:minxingfull.nsf
        总行:minxingnew.nsf
        支行:mobilzh.nsf
    */
    // 文种类型：store.state.recordType
    // 用户身份：store.state.user.scope
    let requestUrl = ''
    if (store.state.recordType === '1') {
        requestUrl = 'minxingfull.nsf'
    } else {
        requestUrl = store.state.user.scope === '1' ? 'minxingnew.nsf' : 'mobilezh.nsf'
    }
    return http.post(`http://${store.state.user.serverip}/mobile/${requestUrl}/agRmoblienew?openagent`, { json })
}