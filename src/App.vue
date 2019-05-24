<template>
  <div id="app">
    <Header />
    <router-view class="main"/>
  </div>
</template>

<script>
import Header from '@c/Header';
import { getUser } from '@api/getUser';
import { getSSOToken } from '@u/mxApi';

export default {
    components: {
        Header
    },
    data () {
        return {
            keepAlive: ''
        }
    },
    async created () {
        this.$store.commit('SET_TOKEN', await getSSOToken(this.$store.state.mx_app_id))
        this.fetchUser()
    },
    methods: {
        async fetchUser () {
            const env = (await this.$http.get(`${location.protocol}//${location.host}${location.pathname}/config.json`.replace('/index.html', ''))).body[0]
            this.$store.commit('SET_ENV', env)
            const res = await getUser(env.minIp, {
                type: 'getuserinfo'
            })
            this.$store.commit('SET_USER', res.data.result)
        }
    }
}
</script>

<style lang="css">
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main {
  box-sizing: border-box;
  border-top: 46px solid rgba(255, 255, 255, 0) /* no */
}
</style>
