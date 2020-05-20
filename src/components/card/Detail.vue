<template>
    <div id="detail">
        <div class="center">
            <img v-bind:src="stationLogo" id="stationLogo"><br>
            <img v-bind:src="program.img" id="programLogo"><br>
            <h1>{{program.title}}</h1>
            <h2>{{program.performer}}</h2>
            <span v-bind:class="statusColor">{{program.status}}</span>
            <span v-bind:class="progressColor">{{progress}}</span>
            <h3>{{time}}</h3>
            <h4>{{program.desc}}</h4>
            <h4 v-html="info"></h4>
            <div id="buttons">
                <div v-if="program.status==='DEFAULT'">
                    <div v-if="progress==='WAITING'">
                        <button v-on:click.stop="reserve(program.id)">RESERVE</button>
                    </div>
                    <div v-if="progress==='BROADCASTING'">
                        <button v-on:click.stop="recording(program.id)">RECORDING</button>
                    </div>
                </div>
                <div v-if="program.status==='RECORDING'">
                    <button v-on:click.stop="stop(program.id)">STOP</button>
                </div>
                <div v-if="program.status==='RESERVED'">
                    <button v-on:click.stop="cancel(program.id)">CANCEL</button>
                    <AutoReserveSelector v-bind:id="program.id"></AutoReserveSelector>
                </div>
                <div v-if="program.status==='RECORDED'">
                    <button v-on:click.stop="download(program.id)">DOWNLOAD</button><br>
                    <button v-on:click.stop="remove(program.id)" class="btn-mini">DEL</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import settings from '../../data/settings'
import axios from 'axios'
import * as moment from "moment/moment.js"
import AutoReserveSelector from '../selector/AutoReserveSelector'

export default {
    components: {
        AutoReserveSelector
    },
    props: {
        data: Object
    },
    data: function(){
        return {
            timetable: settings.radiobase.timetable,
            stations: settings.radiobase.stations,
            audio: settings.radiobase.audio,
            stationLogo: "",
            info: "",
            station: "",
            program: this.data.program,
            progress: this.data.progress,
            time: this.data.time
        }
    },
    methods: {
        fetch: function(id){
            axios.get(this.timetable+id)
            .then((res)=>{
                this.info = res.data[0].info
                this.station = res.data[0].station

                axios.get(this.stations)
                .then((res)=>{
                    const station = res.data.stations.station
                    for (let i=0; i<Object.keys(station).length; i++){
                        if (station[i].id[0] === this.station){
                            this.stationLogo = station[i].logo[0]._
                        }
                    }
                })
            })
        },
        recording: function(id){
            axios.post(this.timetable+id+"/_recording").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        stop: function(id){
            axios.delete(this.timetable+id+"/_recording").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        reserve: function(id){
            axios.post(this.timetable+id+"/_reservation").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        cancel: function(id){
            axios.delete(this.timetable+id+"/_reservation").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        download: function(id){
            location.href = this.audio+id+"/_download"
        },
        remove: function(id){
            const result = confirm("番組データを完全に削除しますか?")
            if (result){
                axios.delete(this.audio+id).then((res)=>{console.log(res)})
                this.$emit('deleted')
            }
        },
        update: function(id){
            axios.get(this.timetable+id+"?fields=status").then((res)=>{
                const raw = res.data[0]
                if (raw.status) {
                    console.log("new status: " + raw.status) 
                    this.program.status = raw.status
                }
            })
            this.now = parseInt(moment().format('YYYYMMDDhhmmss'))
        }
    },
    computed: {
        progressColor: function(){
            return {
                waiting: this.progress === "WAITING",
                broadcasting: this.progress === "BROADCASTING",
                broadcasted: this.progress === "BROADCASTED" 
            }
        },
        statusColor: function(){
            return {
                default: this.program.status === "DEFAULT",
                recording: this.program.status === "RECORDING",
                recorded: this.program.status === "RECORDED",
                reserved: this.program.status === "RESERVED",
                error: this.program.status === "ERROR"
            }
        }
    },
    mounted: function(){
        this.fetch(this.program.id)
    }
}
</script>

<style scoped>
#detail {
    position: absolute;
    width: 95%;
    max-height: 90%;
    background: white;
    z-index: 2;
    opacity: 1;
    pointer-events: all;
    overflow: auto;
}
#stationLogo {
    width: 33%;
}
#programLogo {
    width: 240px;
}
.center {
    text-align: center;
}
/* -------------------------- */
.waiting {
    border: solid #005FFF;
    background-color: #CCFFFF;
}
.broadcasting {
    border: solid #FF4F02;
    background-color: #FFFFDD;
}
.broadcasted {
    border: solid #333333;
    background-color: #DDDDDD;
}
.default {
    border: solid #77EEFF;
    background-color: #D7EEFF
}
.recording {
    border: solid #FF9900;
    background-color: #FF9999
}
.recorded {
    border: solid #00FF3B;
    background-color: #93FFAB
}
.reserved {
    border: solid #00ECFF;
    background-color: #8EF1FF
}
.error {
    border: solid #660000;
    background-color: #663366
}
/* -------------------------- */
h1 {
    font-size: 20px;
}
h2 {
    font-size: 16px;
}
h3 {
    font-size: 16px;
}
h4 {
    font-size: 8px;
}
button {
    background-color: #DDDDDD;
    width: 150px;
    height: 50px;
    margin-bottom: 5px;
}
.btn-mini{
    position: absolute;
    right: 0px;
    top: 0px;
    background-color: #993300;
    width: 40px;
    height: 30px;
    padding: 0px;
    margin: 10px;
}
</style>