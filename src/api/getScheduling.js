import http from './config'

export const getScheduling = (json) => {
    return http.post('http://139.199.99.136/mobile/minxingnew.nsf/mobilequery?openagent', { json })
}