<template>
    <div id="timetable">
        <ProgramCardSlot v-bind:date="date" v-bind:station="station"></ProgramCardSlot>
        <Footer v-on:update="load"></Footer>
    </div>
</template>

<script>
import ProgramCardSlot from './slot/ProgramCardSlot'
import Footer from './Footer'

export default {
    components: {
        ProgramCardSlot,Footer
    },
    data: function(){
        return {
            date: 0,
            station: ""
        }
    },
    methods: {
        load: function(payload){
            this[payload.type] = payload.selected      
            console.log("[Timetable] load: " + JSON.stringify({date: this.date, station: this.station}))
        }
    }
}
</script>

<style scoped>
#timetable {
    margin-bottom: 60px;
}
</style>