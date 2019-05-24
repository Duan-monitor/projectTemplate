/* eslint-disable */ 
import store from '@/store'
function MXApi(callbacks) {
    var deviceReady = false;
    var taskQueue = [];
    document.addEventListener('deviceready', function deviceReadyHandler() {
        deviceReady = true;
        taskQueue.forEach(function(task) {
            applyApi.apply(null, task);
        })
        callbacks.ready && callbacks.ready();
        document.removeEventListener('deviceready', deviceReadyHandler, false);
    }, false)

    function applyApi(namespace, api, args) {
        if (window[namespace] && window[namespace][api]) {
            callbacks.beforeApply && callbacks.beforeApply(namespace, api, args);
            window[namespace][api].apply(null, args);
        } else if (!deviceReady){
            taskQueue.push([namespace, api, args]);
        } else {
            callbacks.error && callbacks.error(['该终端没有', namespace, '.', api, '方法!'].join(''), namespace, api);
            throw new Error(['该终端没有', namespace, '.', api, '方法!'].join(''));
        }
    }
    return applyApi;
}

const applyApi = MXApi({
    ready: function() {
        console.log('device ready!!');
    },
    error: function(err) {
        console.log(err);
    },
    beforeApply: function(namespace, api, args) {
    }
});


const makeApi = namespace => (api, ...args) => applyApi(namespace, api, args);
const MXCommon = makeApi('MXCommon');
const MXWebui = makeApi('MXWebui');
const MXContacts = makeApi('MXContacts');

export const getSSOToken = (app_id) => {
    return new Promise((resolve, reject) => {
        MXCommon('getSSOToken', app_id, resolve);
    })
}

export const showOptionMenu = () => {
    return MXWebui('showOptionMenu');
}

export const hideWebViewTitle = () => {
    return MXWebui('hideWebViewTitle');
}

export const openUrlPage = url => {
    return new Promise((resolve, reject) => {
        MXCommon('openUrlPage', url, () => {
            alert(1111)
            resolve()
        });
    })
}

export const setCustomHeaderMenu = (...args) => {
    return MXWebui('setCustomHeaderMenu', ...args);
}

export const getCurrentUser = callback => {
    return new Promise((resolve, reject) => {
        MXCommon('getCurrentUser', resolve);
    })
}

export const getServerUrl = () => {
    return new Promise((resolve, reject) => {
        MXCommon('getServerUrl', resolve);
    })
}

export const getPersonInfo = async loginName => {
    const server_url = await getServerUrl()
    return new Promise((resolve, reject) => {
        MXCommon('getPersonInfo', loginName, res => {
            const data = {
                ...res,
                avatar_url: res.avatar_url.indexOf('http') === 0 ? res.avatar_url : server_url + res.avatar_url
            }
            resolve(data)
        });
    })
}
export const MXSelectUsers = userIds => {
    return new Promise((resolve, reject) => {
        MXContacts('selectUsers', function(result) {
            resolve(result);
        }, {
            customUserIDS: userIds,
            enableSelectDept: false,
            canSelectSelf: true
        })
    })
}
export const MXSelectUser = userIds => {
    return new Promise((resolve, reject) => {
        MXContacts('selectUser', function(result) {
            resolve(result);
        }, {
            
        })
    })
}

export const ajax = async params => {
    return new Promise((resolve, reject) => {
        const { token, mx_app_id } = store.state
        const { scope, dir, fullname } = store.state.user
        params.data.json = { ...params.data.json, token, mx_app_id }
        if (store.state.user.scope) {
            params.data.json = { ...params.data.json, scope, dir, fullname }
        }
        // console.log('请求地址》》》》》》'+JSON.stringify(params.url))
        params = Object.assign({}, params, {
            url: `${params.url}`,
            async: true,
            success: function(data, status, xhr) {
                if (data.status === 'error') {
                    console.log(`error>>>>> \n 接口: ${params.url} \n msg:${data}\n ${JSON.stringify(data)}`)
                }
                // console.log('data>>>>>>>>'+data)
                resolve({ data: JSON.parse(data), status });
            },
            error: function(data, status, xhr) {
                console.log(`error>>>>> \n 接口: ${params.url} \n msg:${data}\n ${JSON.stringify(data)}`)
                reject({ data, status });
            }
        })
        // 发送的参数
        MXCommon('ajax', params);
    })
}

const queryString = function (obj) {
    var str =  Object.keys(obj).reduce(function(acc,cur){
        return acc = acc + cur + '=' + obj[cur] + '&'
    },'')  
    str = str.substring(0,str.length-1);
    return str
 }
export const ajaxGet = (url, query) => {
    url = query ? `${url}?${queryString(query)}` : url;
    const params = {
        type: 'GET',
        url,
    }
    return ajax(params);
} 

export const ajaxPost = (url, data) => {
    return ajax({
        type: 'POST',
        url,
        data,
    })
}

export const ajaxPut = (url, data) => {
    return ajax({
        type: 'PUT',
        url,
        data
    })
}

export const ajaxDelete = (url, id) => {
    return ajax({
        type: 'DELETE',
        url: `${url}/${id}`
    })
}




