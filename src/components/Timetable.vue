<template>
    <div id="timetable" v-touch:swipe="changeStation">
        <div id="stationName">
            <img v-bind:src="pre.logo" v-on:click="changeStation('right')">
            <img class="active" v-bind:src="active.logo">
            <img v-bind:src="next.logo" v-on:click="changeStation('left')">
        </div>
        <div class="ajust">
            <ProgramCardSlot v-bind:date="date" v-bind:station="station"></ProgramCardSlot>
        </div>
        <Footer v-on:update="load"></Footer>
    </div>
</template>

<script>
import ProgramCardSlot from './slot/ProgramCardSlot'
import Footer from './Footer'
import axios from 'axios'
import settings from '../data/settings'

export default {
    components: {
        ProgramCardSlot,Footer
    },
    data: function(){
        return {
            date: 0,
            station: "",
            stations: [],
            activeIndex: -1,
            active: "",
            pre: "",
            next: ""
        }
    },
    methods: {
        load: function(payload){
            this[payload.type] = payload.selected      
            console.log("[Timetable] load: " + JSON.stringify({date: this.date, station: this.station}))
        },
        changeStation: function(direction){
            if(direction==="left"){
                if(this.activeIndex===15){
                    this.activeIndex = 0
                }else{
                    this.activeIndex += 1
                }
            }else if(direction==="right"){
                if(this.activeIndex===0){
                    this.activeIndex = 15
                }else{
                    this.activeIndex -= 1
                }
            }
            this.station = this.stations[this.activeIndex].id
        },
        fetch: function(){
            axios.get(settings.radiobase.stations)
            .then((res)=>{
                const stations = res.data
                this.stations = stations
                this.activeIndex = 0
                this.station = stations[this.activeIndex].id
            })
        }
    },
    watch: {
        activeIndex: function(){
            this.active = this.stations[this.activeIndex]
            if(this.activeIndex===0){
                this.pre = this.stations[this.stations.length-1]
            }else{
                this.pre = this.stations[this.activeIndex-1]
            }
            if(this.activeIndex===this.stations.length-1){
                this.next = this.stations[0]
            }else{
                this.next = this.stations[this.activeIndex+1]
            }
        }
    },
    mounted: function(){
        this.fetch()
    }
}
</script>

<style scoped>
#timetable {
    margin-bottom: 60px;
}
img {
    height: 25px;
    width: 50px;
}
.active {
    height: 50px;
    width: 100px;
}
#stationName {
    position: fixed;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 348px;
    background-color: white;
    color: #333333;
}
.ajust {
    padding-top: 50px;
}
</style>