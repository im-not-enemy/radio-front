import Vue from 'vue'
import App from './App'
import router from './router'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
})