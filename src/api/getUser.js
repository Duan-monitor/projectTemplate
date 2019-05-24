import http from './config'

export const getUser = (url, json) => {
    return http.post(`http://${url}/mobile/minxingnew.nsf/mobilequery?openagent`, { json })
}