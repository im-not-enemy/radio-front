<template>
    <div>
        <div class="header">
            <h1><span v-on:click="showTop">Radio-front</span></h1>
            <router-link to="/timetable"><span v-on:click="hideTop">timetable</span></router-link>  |
            <router-link to="/search"><span v-on:click="hideTop">search</span></router-link><br>
            <router-link to="/recording"><span v-on:click="hideTop">recording</span></router-link>  |
            <router-link to="/reserved"><span v-on:click="hideTop">reserved</span></router-link>  |
            <router-link to="/recorded"><span v-on:click="hideTop">recorded</span></router-link>
        </div>
        <div class="content">
            <router-view v-if="!topPage"></router-view>
            <Top v-if="topPage"></Top>
        </div>
    </div>
</template>

<script>
import Top from './components/Top'

export default {
    components: {
        Top
    },
    data: function(){
        return {
            topPage: true
        }
    },
    methods: {
        hideTop: function(){
            if (this.topPage) this.topPage = false
        },
        showTop: function(){
            if (!this.topPage) this.topPage = true
        }
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0px;
    height: 110px;
    width: 100%;
    text-align: center;
    margin: 0px 0px 10px 0px;
    padding: 0px;
    background-color: white;
}
.content {
    padding-top: 110px;
}
h1 {
    margin-top: 5px;
    margin-bottom: 3px;
}
</style>