<template>
    <div id="card" v-bind:class="color" v-on:click="switchModal" v-if="deleted===false">
        <div id="modal" v-if="modal">
            <Detail v-bind:data="{program,progress,time}" v-on:deleted="remove"></Detail>
        </div>

        <div class="container">
            <div class="item">
                <img v-bind:src="program.img">
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
import Detail from './Detail'
import * as moment from "moment/moment.js"
import axios from 'axios'
import settings from '../../data/settings'

export default {
    components: {
        Detail
    },
    props: {
        program: Object
    },
    data: function(){
        return {
            modal: false,
            now: parseInt(moment().format('YYYYMMDDHHmmss')),
            radioBase: settings.radiobase.timetable,
            audio: settings.radiobase.audio,
            deleted: false
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
            return this.reduce(this.program.title,22)
        },
        performer: function(){
            return this.reduce(this.program.performer,26)
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
        switchModal: function(){
            if (this.modal){
                this.modal = false
                console.log("[ProgramCard] switchModal: true > false (" + this.program.id + ")")
            } else if (!this.modal){
                this.modal = true
                console.log("[ProgramCard] switchModal: false > true (" + this.program.id + ")")
            }
        },
        remove: function(){
            this.switchModal()
            this.deleted = true
        }
    }
}
</script>

<style scoped>
/* ---------------------------------- */
#modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;
}
/* ---------------------------------- */
#card {
    margin: 1px;
    width: 345px;
}
.waiting {
/*    border: solid #005FFF; */
/*    background-color: #CCFFFF; */
    background-color: #D7EEFF;
}
.broadcasting {
/*    border: solid #FF4F02; */
    background-color: #FFFFDD;
}
.broadcasted {
/*    border: solid #333333; */
    background-color: #DDDDDD;
}
/* ---------------------------------- */
#statusBadge {
    display: flex;
    font-weight: bold;
    font-size: 5px;
    height: 15px;
    width: 50px;
    margin-top: 4px;
    justify-content: center;
    align-items: center;
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
    color: gray;
    font-weight: bold;
    margin: 4px 0px 2px 1px;
}
</style>>