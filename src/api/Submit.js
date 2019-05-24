import { oaflowsend } from '@api/getList.js';

// 点击路径获取
export const trajectory = async (parameter) => {
    const queryjson = getJsonHeader(parameter);
    const res = await oaflowsend({
        type: 'getrout',
        query: {
            strDeptID: parameter.contentData.flowsend.fldCurUserDeptID,
            strStepID: parameter.contentData.flowsend.fldCurLinkID,
            ...queryjson
        }
    });
    return res
}

// 设置数据请求的基本信息
const getJsonHeader = (parameter) => {
    return {
        rm_appid: parameter.listKey.appid,
        strUNID: parameter.listKey.unid,
        rm_dbpath: parameter.listKey.dbpath,
        strUserName: parameter.contentData.flowsend.fldCurUserName
    }
}

// 点击路径获取候选人员信息
export const getUsersJs = async (parameter) => {
    const queryjson = getJsonHeader(parameter);
    let jsonType = '';
    switch (parameter.routevalue.type) {
    case 'Normal':
        jsonType = 'getuserlist';// 正常提交
        break;
    case 'Back':
        jsonType = 'getuserlistback';// 退回
        break;
    case 'dirsend':
        jsonType = 'getuserlistper';// 退回上一处理人
        break;
    case 'LeaderPath':
        jsonType = 'getuserlistread';// 送阅示
        break;
    default:
        alert('路径类型暂不支持！');
    }
    
    const res = await oaflowsend({
        type: jsonType,
        query: {
            strDeptID: parameter.contentData.flowsend.fldCurUserDeptID,
            strStepID: parameter.routevalue.endid,
            ...queryjson
        }
    });
    return res
}

// 单人提交
const singlesubmit = async (parameter, strOpinion) => {
    let queryjson = getJsonHeader(parameter);
    let commonDataB = commonData(parameter);
    const getSelectedUserListB = getSelectedUserList(parameter);
    if (!getSelectedUserListB.isselected) {
        alert('请选择人员！');
        return false;
    }
    // 外出判断
    const agentcheckB = agentcheck(parameter, getSelectedUserListB.strAgent);
    let arr = [];
    for (let index in agentcheckB) {
        if (agentcheckB[index].isagent === '1') { // 外出isagent=="1"
            arr.push(agentcheckB[index]);
        }
    }
    for (var i = 0; i < getSelectedUserListB.reuserlist.length; i++) {
        let user = getSelectedUserListB.reuserlist[i];
        for (let j = 0; j < arr.length; j++) {
            let agent = arr[j];
            if (
                user.ROAMReUsers === agent.usernmae &&
            user.ROAMReUsersDeptID === agent.orgid
            ) {
                user.isagent = '1';// 人员外出
                user.ROAMReOldUsers = agent.agentuser;
                user.ROAMFirstUsers = agent.usernmae;
                user.ROAMFirstUsersDeptID = agent.orgid;
                user.ROAMReUsers = agent.agentuser;
                user.ROAMReFirstUsers = agent.usernmae;
                user.ROAMReUsersAltName = agent.newusecn;
            }
        }
    }
    
    let jsonType = {};
    if (parameter.routeData.some((item) => {
        return item.type === 'LeaderPath'
    })) {
        jsonType = 'sendread';
    } else {
        jsonType = 'singsubmit';
    }
    const res = await oaflowsend({
        type: jsonType,
        query: {
            strUserName: parameter.contentData.flowsend.fldCurUserName,
            ROAMReLinkID: parameter.routevalue.endid,
            ROAMSendID: parameter.routevalue.id,
            ROAMreceName: parameter.routevalue.name,
            ROAROpinText: strOpinion,
            reuserlist: getSelectedUserListB.reuserlist,
            ...queryjson,
            ...commonDataB
        }
    });
    return res
}

// 外出判断
const agentcheck = async (parameter, strAgent) => {
    const queryjson = getJsonHeader(parameter);
    const res = await oaflowsend({
        type: 'getagent',
        query: {
            strUNID: parameter.listKey.unid,
            strDeptID: parameter.contentData.flowsend.fldCurUserDeptID,
            strStepID: parameter.contentData.flowsend.fldCurLinkID,
            strUserName: parameter.contentData.flowsend.fldCurUserName,
            strAgent: strAgent,
            ...queryjson
        }
    });
    return res.data.items
}

// 多人提交
const mulsubmit = async (parameter, strOpinion) => {
    const mulcheckB = await mulcheck(parameter);
    if (mulcheckB.data.result === 'true') {
        // 校验成功，实际提交
        const queryjson = getJsonHeader(parameter);
        const res = await oaflowsend({
            type: 'mulsubmit',
            query: {
                ROAmOrgStrID: parameter.contentData.flowsend.fldCurUserDeptID,
                ROAmOrgStr: parameter.contentData.flowsend.fldCurUserDeptName,
                ROAMUserId: parameter.contentData.flowsend.fldCurUserName,
                ROAAppID: parameter.contentData.flowsend.fldAppID,
                ROAROpinText1: strOpinion,
                CurUser: parameter.contentData.flowsend.fldCurStepIsConsigned === '1' ? parameter.contentData.flowsend.fldCurConsignerName : '', // 判断被代理人
                ...queryjson
            }
        });
        return res
    } else {
        return {
            goBack: 'goBack'
        }
    }
}
        
// 多人提交检查
const mulcheck = async (parameter) => {
    const queryjson = getJsonHeader(parameter);
    const res = await oaflowsend({
        type: 'checkmullist',
        query: {
            strUNID: parameter.listKey.unid,
            strDeptID: parameter.contentData.flowsend.fldCurUserDeptID,
            strStepID: parameter.contentData.flowsend.fldCurLinkID,
            strUserName: parameter.contentData.flowsend.fldCurUserName,
            ...queryjson
        }
    });
    return res
}
        
// 阅示
const leaderopinion = async (parameter, strOpinion) => {
    const queryjson = getJsonHeader(parameter);
    const res = await oaflowsend({
        type: 'leadopin',
        query: {
            ROAmOrgStrID: parameter.contentData.flowsend.fldCurUserDeptID,
            ROAmOrgStr: parameter.contentData.flowsend.fldCurUserDeptName,
            ROAMUserId: parameter.contentData.flowsend.fldCurUserName,
            ROAAppID: parameter.contentData.flowsend.fldAppID,
            ROAROpinText1: strOpinion,
            CurUser: '', // 收文阅示，被代理人一直为空
            ...queryjson
        }
    });
    return res
}

// 判断选择类型执行不同方法
const getSelectedUserList = (parameter) => {
    let strAgent = [];
    let reuserlist = [];
    // 判断选择的类型    0是单人  1是多选
    switch (parameter.userTree.radiotype) {
    case '0':
        strAgent.push({ 
            username: parameter.selectedUsers.fullname, orgid: parameter.detpUser.deptId.split('↑')[parameter.detpUser.deptId.split('↑').length - 1]
        })
        reuserlist.push({
            ROAMReUsers: parameter.selectedUsers.fullname,
            ROAMReFirstUsers: parameter.selectedUsers.fullname,
            ROAMReUsersAltName: parameter.selectedUsers.name,
            ROAMReUsersDeptName: parameter.detpUser.deptName,
            ROAMReUsersDeptID: parameter.detpUser.deptId.split('↑')[parameter.detpUser.deptId.split('↑').length - 1],
            isagent: '0',
            ROAMFirstUsers: '',
            ROAMFirstUsersDeptID: '',
            ROAMReOldUsers: ''
        })
        break;
    case '1':
        parameter.selectedUsers.forEach(suserObj => {
            strAgent.push({
                username: suserObj.fullname,
                orgid: parameter.detpUser.deptId.split('↑')[parameter.detpUser.deptId.split('↑').length - 1]
            })
            reuserlist.push({
                ROAMReUsers: suserObj.fullname,
                ROAMReFirstUsers: suserObj.fullname,
                ROAMReUsersAltName: suserObj.name,
                ROAMReUsersDeptName: parameter.detpUser.deptName,
                ROAMReUsersDeptID: parameter.detpUser.deptId.split('↑')[parameter.detpUser.deptId.split('↑').length - 1],
                isagent: '0',
                ROAMFirstUsers: '',
                ROAMFirstUsersDeptID: '',
                ROAMReOldUsers: ''
            })
        })
        break;
    default:
        alert('选择类型暂不支持！');
    }
    return {
        isselected: !!parameter.detpUser.deptId,
        strAgent: strAgent,
        reuserlist: reuserlist
    }
}

// 提交部分共同数据
const commonData = (parameter) => {
    return {
        fldCurUserDeptID: parameter.contentData.flowsend.fldCurUserDeptID,
        fldCurUserDeptName: parameter.contentData.flowsend.fldCurUserDeptName,
        fldCurUserShortName: parameter.contentData.flowsend.fldCurUserShortName,
        fldCurUserHLDeptName: parameter.contentData.flowsend.fldCurUserHLDeptName,
        fldCurUserHLDeptID: parameter.contentData.flowsend.fldCurUserHLDeptID,
        fldCurStepIsConsigned: parameter.contentData.flowsend.fldCurStepIsConsigned,
        fldCurAgentName: parameter.contentData.flowsend.fldCurAgentName,
        fldCurConsignerDeptID: parameter.contentData.flowsend.fldCurConsignerDeptID,
        fldCurConsignerName: parameter.contentData.flowsend.fldCurConsignerName
        
    }
}

// 直接提交
const directsend = async (parameter, strOpinion) => {
    const queryjson = getJsonHeader(parameter);
    const commonDataB = commonData(parameter);
    const res = await oaflowsend({
        type: 'dsendsub',
        query: {
            fldCurUserName: parameter.contentData.flowsend.fldCurUserName,
            ROAROpinText: strOpinion,
            ...commonDataB,
            ...queryjson
        }
    });
    return res
}

// 提交按钮功能
export const okclickJs = (parameter) => {
    let strOpinion = '';
    if (parameter.contentData.flowsend.ROAMCanWriteOpinion === '1') { // 是否可填写意见,1可填写，0，不可填写
        if (parameter.contentData.flowsend.ROAMOpinIsAN === '0') { // 是否意见为空，
            if (parameter.suggestion === '') { // 意见不允许为空
                alert('请填写意见！');
                return false;
            }
        }
        strOpinion = parameter.suggestion.replace(/\n/g, '<br>');
    }

    if (parameter.contentData.flowsend.rm_type === 'leadopin') {
        if (parameter.suggestion === '') { // 意见不允许为空
            alert('请填写意见！');
            return false;
        }
        strOpinion = parameter.suggestion.replace(/\n/g, '<br>');
    }
    
    switch (parameter.contentData.flowsend.rm_type) { // 判断单人多人处理
    case 'singsubmit':
    // 真=>单人处理-普通提交  // 假=>单人处理-直接提交
        return parameter.flag === 'common' ? singlesubmit(parameter, strOpinion) : directsend(parameter, strOpinion);
    case 'mulsubmit':
        return mulsubmit(parameter, strOpinion);// 多人处理
    case 'leadopin':
        return leaderopinion(parameter, strOpinion);// 阅示意见
    default:
        alert('单人多人参数错误！');
        return false;
    }
}