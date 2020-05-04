<template>
    <div>
        <ProgramCard v-for="program in programs" v-bind:key="program.id" v-bind:program="program"></ProgramCard>
    </div>
</template>

<script>
import ProgramCard from '../card/ProgramCard'
import axios from 'axios'
import settings from '../../data/settings'

export default {
    components: {
        ProgramCard
    },
    props: {
        date: Number,
        station: String
    },
    data: function(){
        return {
            programs: []
        }
    },
    methods: {
        fetch: function(){
            axios.post(settings.radiobase.timetable + '_search?fields=id,title,status,performer,date,startTime,endTime,img',{station:"^"+this.station+"$",date:this.date})
            .then((res)=>{
                res.data.sort((a,b)=>{
                    if(a.startTime < b.startTime) return -1
                    if(a.startTime > b.startTime) return 1
                    return 0
                })
                this.programs = res.data
                //console.log(res.data)
            })
        }
    },
    mounted: function(){
        this.fetch()
        console.log("[ProgramCardSlot] date: " + this.date)
        console.log("[ProgramCardSlot] station: " + this.station)
    },
    watch: {
        date: function(){
            this.fetch()
            console.log("[ProgramCardSlot] date: " + this.date)
            console.log("[ProgramCardSlot] station: " + this.station)
        },
        station: function(){
            this.fetch()
            console.log("[ProgramCardSlot] date: " + this.date)
            console.log("[ProgramCardSlot] station: " + this.station)
        }
    }
}
</script>

<style scoped>

</style>