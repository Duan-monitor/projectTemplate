import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import VueResource from 'vue-resource'
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import 'lib-flexible/flexible';
// import { hideWebViewTitle } from '@u/mxApi';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(VueResource)

// eslint-disable-next-line
// hideWebViewTitle()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
