<template>
    <div id="dateSelector">
        <select v-model="selected" v-on:change="$emit('selected',payload)">
            <option v-for="day in week" :key="day">{{day}}</option>
        </select>
    </div>
</template>

<script>
import * as moment from "moment/moment.js"

const today = moment().format('YYYYMMDD')
const week = new Array()

for (let i=-1; i<7; i++){
    week.push(i + parseInt(today))
}

export default {
    data: function(){
        return {
            type: "date",
            selected: today,
            week: week,
            today: today,
        }
    },
    computed: {
        payload: function(){
            return {
                type: this.type,
                selected: parseInt(this.selected)
            }
        }
    },
    mounted: function(){
        this.$emit('selected',this.payload)
    }
}
</script>

<style scoped>
select {
    height: 30px;
    background-color: white;
    padding: 5px;
    margin: 5px;
}
</style>