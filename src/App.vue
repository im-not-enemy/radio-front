<template>
    <div>
        <div class="header">
            <h1>Radio-front</h1>
            <router-link to="/timetable">timetable</router-link>  |
            <router-link to="/search">search</router-link><br>
            <router-link to="/recording">recording</router-link>  |
            <router-link to="/reserved">reserved</router-link>  |
            <router-link to="/recorded">recorded</router-link>
        </div>
        <div class="content">
            <router-view>
            </router-view>
        </div>
    </div>
</template>

<script>
export default {
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