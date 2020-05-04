<template>
    <div id="card" v-on:click="reverse" v-bind:class="color">
        <div class="container">
            <div class="item">
                <img v-bind:src="program.img" v-if="state==='head'">
                <div class="buttonCover" v-if="state==='tail'">
                    <div v-if="program.status==='DEFAULT'">
                        <div v-if="progress==='WAITING'">
                            <button v-on:click="reserve(program.id)">RESERVE</button>
                        </div>
                        <div v-if="progress==='BROADCASTING'">
                            <button v-on:click="recording(program.id)">RECORDING</button>
                        </div>
                    </div>
                    <div v-if="program.status==='RECORDING'">
                        <button v-on:click="stop(program.id)">STOP</button>
                    </div>
                    <div v-if="program.status==='RESERVED'">
                        <button v-on:click="cancel(program.id)">CANCEL</button>
                    </div>
                    <div v-if="program.status==='RECORDED'">
                        <button v-on:click="download(program.id)">DOWNLOAD</button>
                    </div>
                </div>
            </div>
            <div class="item">
                <h1>{{title}}</h1>
                <h2>{{performer}}</h2>
                <h3>{{time}}</h3>
                <div id="statusBadge" v-bind:class="statusBadge">{{program.status}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as moment from "moment/moment.js"
import axios from 'axios'
import settings from '../../data/settings'

export default {
    props: {
        program: Object
    },
    data: function(){
        return {
            state: "head",
            now: parseInt(moment().format('YYYYMMDDHHmmss')),
            radioBase: settings.radiobase.timetable
        }
    },
    computed: {
        time: function(){
            moment.locale('ja')
            const date = moment(this.program.date,'YYYYMMDD').format('YYYY年MM月DD日(ddd)')
            const start = moment(this.program.startTime,'YYYYMMDDHHmmss').format('HH:mm')
            const end = moment(this.program.endTime,'YYYYMMDDHHmmss').format('HH:mm')
            return date + " " + start + "-" + end
        },
        title: function(){
            return this.reduce(this.program.title,18)
        },
        performer: function(){
            return this.reduce(this.program.performer,20)
        },
        progress: function(){
            if (this.now < this.program.startTime){
                return "WAITING"
            } else if (this.now > this.program.startTime && this.now < this.program.endTime){
                return "BROADCASTING"
            } else if (this.now > this.program.endTime){
                return "BROADCASTED"
            }
        },
        color: function(){
            return {
                waiting: this.progress === "WAITING",
                broadcasting: this.progress === "BROADCASTING",
                broadcasted: this.progress === "BROADCASTED" 
            }
        },
        statusBadge: function(){
            return {
                default: this.program.status === "DEFAULT",
                recording: this.program.status === "RECORDING",
                recorded: this.program.status === "RECORDED",
                reserved: this.program.status === "RESERVED",
                error: this.program.status === "ERROR"
            }
        }
    },
    methods: {
        reduce: function(string,maxLength){
            const origin = string.split('')
            if (origin.length > maxLength){
                const newString = Array()
                for (let i=0; i<maxLength; i++){
                    newString.push(origin[i])
                }
                newString.push('..')
                return newString.join('')
            } else {
                return origin.join('')
            }
        },
        reverse: function(){
            if (this.state == "head"){
                this.state = "tail"
            } else if (this.state == "tail"){
                this.state = "head"
            }
            console.log("status:" + this.program.status)
            console.log("progress:" + this.progress)
            console.log("now:" + this.now)
            console.log("startTime:" + this.program.startTime)
            console.log("endTime:" + this.program.endTime)
            console.log("[ProgramCard] newState: " + this.state + " (" + this.title + ")")
        },
        recording: function(id){
            axios.post(this.radioBase+id+"/_recording").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        stop: function(id){
            axios.delete(this.radioBase+id+"/_recording").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        reserve: function(id){
            axios.post(this.radioBase+id+"/_reservation").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        cancel: function(id){
            axios.delete(this.radioBase+id+"/_reservation").then((res)=>{
                console.log(res)
                this.update(id)
            })
        },
        download: function(id){
            location.href = this.radioBase+id+"/_download"
        },
        update: function(id){
            axios.get(this.radioBase+id+"?fields=status").then((res)=>{
                const raw = res.data[0]
                if (raw.status) {
                    console.log("new status: " + raw.status) 
                    this.program.status = raw.status
                }
            })
            this.now = parseInt(moment().format('YYYYMMDDhhmmss'))
        }
    }
}
</script>

<style scoped>
/* ---------------------------------- */
#card {
    margin: 3px;
}
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
/* ---------------------------------- */
#statusBadge {
    font-weight: bold;
    font-size: 5px;
    height: 10px;
    width: 50px;
    text-align: center;
    margin-top: 4px;
}
.default {
    background-color: #D7EEFF
}
.recording {
    background-color: #FF9999
}
.recorded {
    background-color: #93FFAB
}
.reserved {
    background-color: #8EF1FF
}
.error {
    background-color: #663366
}
/* ---------------------------------- */
.container {
    display: flex;
}
.item {
    margin: 2px;
}
.buttonCover {
    display: flex;
    align-items: center;
    height: 75px;
    width: 120px;
}
button{
    height: 70px;
    width: 115px;
}
img {
    width: 120px;
    vertical-align: bottom;
}
h1 {
    font-size: 10px;
    margin: 4px 0px 2px 1px;
}
h2 {
    font-size: 8px;
    color: gray;
    margin: 4px 0px 2px 1px;
}
h3 {
    font-size: 9px;
    color: #00CCFF;
    font-weight: bold;
    margin: 4px 0px 2px 1px;
}
</style>>