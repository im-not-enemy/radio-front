<template>
    <div id="search">
        <div id="cardSlot">
            <ProgramCard v-for="program in programs" v-bind:key="program.id" v-bind:program="program"></ProgramCard>
            <div v-if="programs.length==0" class="noContent">No content.</div>
        </div>
        <div id="footer" class="container">
            <div class="container">
                <div>
                    <input v-model="keyword" placeholder="type keyword"><br>
                    <button v-on:click="search">submit</button>
                </div>
                <div>
                    <button v-on:click="switchOption">option</button>
                </div>
                <div id="options" v-if="showOption">
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
                    </div>
                </div>
            </div>
        </div>
        <!--
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
        -->
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
            showOption: false,
        }
    },
    methods: {
        search: function(){
            const now = parseInt(moment().format('YYYYMMDDHHmmss'))
            let startTimeComparison = {}
            let endTimeComparison = {}
            let status

            if (!this.keyword) return -1
            if (this.status === "all"){
                status = ""
            } else {
                status = this.status
            }
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
                status: status,
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
        switchOption: function(){
            this.showOption = !this.showOption
        }
    }
}
</script>

<style scoped>
.noContent {
    text-align: center;
    width: 360px;
    color: gray;
    padding-bottom: 50%;
    padding-top: 50%;
}
#footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 60px;
    width: 100%;
    background-color: white;
    padding-left: 10px;
}
#cardSlot {
    padding-bottom: 60px;
}
#options {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    right: 10px;
    bottom: 50px;
    height: 100px;
    width: 220px;
    background-color: #EEEEEE;
    padding-left: 5px;
}
.container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
input {
    margin: 0px 10px 0px 0px;
}
button {
    margin: 5px 10px 0px 0px;
    background: white;
}
</style>