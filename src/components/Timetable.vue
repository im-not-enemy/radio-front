<template>
    <div id="timetable" v-touch:swipe="changeStation">
        <div id="stationName">
            <span class="pre">{{pre}}</span> --- <span class="active">{{active}}</span> --- <span class="next">{{next}}</span>
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
                if(this.activeIndex===14){
                    this.activeIndex = 0
                }else{
                    this.activeIndex += 1
                }
            }else if(direction==="right"){
                if(this.activeIndex===0){
                    this.activeIndex = 14
                }else{
                    this.activeIndex -= 1
                }
            }
            this.station = this.stations[this.activeIndex].id
            console.log(this.activeIndex)
        },
        fetch: function(){
            axios.get(settings.radiobase.stations)
            .then((res)=>{
                const origin = res.data.stations.station
                const stations = Array()
                for (let i=0; i<origin.length; i++){
                    stations.push({
                        id: origin[i].id[0],
                        name: origin[i].name[0]
                    })
                }
                this.stations = stations
                this.activeIndex = 0
                this.station = stations[this.activeIndex].id
            })
        }
    },
    watch: {
        activeIndex: function(){
            this.active = this.stations[this.activeIndex].name
            if(this.activeIndex===0){
                this.pre = this.stations[this.stations.length-1].name
            }else{
                this.pre = this.stations[this.activeIndex-1].name
            }
            if(this.activeIndex===this.stations.length-1){
                this.next = this.stations[0].name
            }else{
                this.next = this.stations[this.activeIndex+1].name
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
#stationName {
    position: fixed;
    text-align: center;
    width: 361px;
    height: 30px;
    background-color: white;
    color: #333333;
}
.pre {
    font-size: 10px;
}
.active {
    font-size: 15px;
}
.next {
    font-size: 10px;
}
.ajust {
    padding-top: 30px;
}
</style>