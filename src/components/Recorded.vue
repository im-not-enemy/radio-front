<template>
    <div>
        <ProgramCard v-for="program in programs" v-bind:key="program.id" v-bind:program="program"></ProgramCard>
    </div>
</template>

<script>
import axios from 'axios'
import ProgramCard from './card/ProgramCard'
import settings from '../data/settings'

export default {
    components: {
        ProgramCard
    },
    data: function(){
        return {
            programs: []
        }
    },
    methods: {
        fetch: function(){
            axios.post(settings.radiobase.timetable + '_search?fields=id,title,status,performer,date,startTime,endTime,img,downloaded',{status:"RECORDED"})
            .then((res)=>{
                res.data.sort((a,b)=>{
                    if(a.startTime > b.startTime) return -1
                    if(a.startTime < b.startTime) return 1
                    return 0
                })
                this.programs = res.data
                //console.log(res.data)
            })
        }
    },
    mounted: function(){
        this.fetch()
    }
}
</script>

<style scoped>

</style>