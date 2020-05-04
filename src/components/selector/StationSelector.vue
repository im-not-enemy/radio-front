<template>
    <div id="stationSelector">
        <select v-model="selected" v-on:change="$emit('selected',payload)">
            <option v-for="station in stations" :key="station">{{station}}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios'
import settings from '../../data/settings'

export default {
    data: function(){
        return {
            type: "station",
            selected: "JOAK",
            stations: [],
        }
    },
    computed: {
        payload: function(){
            return {
                type: this.type,
                selected: this.selected
            }
        }
    },
    mounted: function(){
        this.fetch()
        this.$emit('selected',this.payload)
    },
    methods: {
        fetch: function(){
            axios.get(settings.radiobase.stations)
            .then((res)=>{
                const origin = res.data.stations.station
                const stations = Array()
                for (let i=0; i<origin.length; i++){
                    stations.push(origin[i].id[0])
                }
                this.stations = stations
                //console.log(stations)
            })
        }
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