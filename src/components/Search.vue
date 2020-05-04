<template>
    <div id="search">
        <div id="cardSlot">
            <ProgramCard v-for="program in programs" v-bind:key="program.id" v-bind:program="program"></ProgramCard>
        </div>
        <div id="footer" class="container">
            <div class="item">
                <input v-model="keyword" placeholder="type keyword"><br>
                <button v-on:click="search">submit</button>
            </div>
            <div class="item">
                <button v-on:click="open">option</button>
            </div>
        </div>

        <div id="options" v-if="openOption" class="container">
            <div class="item">
                target: 
                <select v-model="target">
                    <option>title</option>
                    <option>performer</option>
                    <option>info</option>
                    <option>desc</option>
                </select><br>

                status: 
                <select v-model="status">
                    <option>all</option>
                    <option>DEFAULT</option>
                    <option>RECORDING</option>
                    <option>RECORDED</option>
                    <option>RESERVED</option>
                    <option>ERROR</option>
                </select><br>

                progress: 
                <select v-model="progress">
                    <option>all</option>
                    <option>WAITING</option>
                    <option>BROADCASTING</option>
                    <option>BROADCASTED</option>
                </select><br>
                
                <button v-on:click="close">close</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProgramCard from './card/ProgramCard'
import * as moment from "moment/moment.js"
import settings from '../data/settings'

export default {
    components: {
        ProgramCard
    },
    data: function(){
        return {
            keyword: "",
            programs: [],
            target: "title",
            status: "all",
            progress: "all",
            openOption: false,
        }
    },
    methods: {
        search: function(){
            const now = parseInt(moment().format('YYYYMMDDHHmmss'))
            let startTimeComparison = {}
            let endTimeComparison = {}

            if (!this.keyword) return -1
            if (this.status === "all") this.status = ""
            if (this.progress === "all"){
                startTimeComparison = {$gt: 0}
                endTimeComparison = {$lt: 99999999999999}
            } else if (this.progress === "WAITING"){
                startTimeComparison = {$gt: now}
                endTimeComparison = {$lt: 99999999999999}
            } else if (this.progress === "BROADCASTING"){
                startTimeComparison = {$lt: now}
                endTimeComparison = {$gt: now}
            } else if (this.progress === "BROADCASTED"){
                startTimeComparison = {$gt: 0}
                endTimeComparison = {$lt: now}
            }

            const option = {
                [this.target] : this.keyword,
                status: this.status,
                startTime: startTimeComparison,
                endTime: endTimeComparison
            }

            axios.post(settings.radiobase.timetable + '_search?fields=id,title,status,performer,date,startTime,endTime,img,info,desc',option)
            .then((res)=>{
                res.data.sort((a,b)=>{
                    if(a.startTime < b.startTime) return -1
                    if(a.startTime > b.startTime) return 1
                    return 0
                })
                this.programs = res.data
                console.log("[Search] option: " + JSON.stringify(option))
                //console.log(res.data)
            })
        },
        open: function(){
            this.openOption = true
        },
        close: function(){
            this.openOption = false
        }
    }
}
</script>

<style scoped>
#footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 60px;
    width: 100%;
    background-color: slategray;
    padding-left: 10px;
}
#cardSlot {
    padding-bottom: 60px;
}
#options {
    position: fixed;
    bottom: 0px;
    right: 0px;
    height: 150px;
    width: 65%;
    padding-left: 20px;
    background-color: gray;
}
.container {
    display: flex;
    align-items: center;
}
input {
    margin: 0px 10px 0px 0px;
}
button {
    margin: 5px 10px 0px 0px;
    background: white;
}
</style>