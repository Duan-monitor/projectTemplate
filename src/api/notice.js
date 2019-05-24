import http from './config'
import store from '@/store'

export const getNotice = json => {
    return http.post(`http://${store.state.user.serverip}/mobile/minxingnew.nsf/mobilequery?openagent`, { json })
}