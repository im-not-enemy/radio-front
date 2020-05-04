import Vue from 'vue'
import Router from 'vue-router'

import recording from './components/Recording'
import recorded from './components/Recorded'
import reserved from './components/Reserved'
import timetable from './components/Timetable'
import search from './components/Search'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/recording',
            component: recording
        },
        {
            path: '/reserved',
            component: reserved
        },
        {
            path: '/recorded',
            component: recorded
        },
        {
            path: '/timetable',
            component: timetable
        },
        {
            path: '/search',
            component: search
        }
    ]
})