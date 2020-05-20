<template>
    <div id="autoReserveSelector" v-on:click.stop="">
        AUTO RESERVE?<br>
        <input type="checkbox" value="1" v-model="checked">月
        <input type="checkbox" value="2" v-model="checked">火
        <input type="checkbox" value="3" v-model="checked">水
        <input type="checkbox" value="4" v-model="checked">木
        <input type="checkbox" value="5" v-model="checked">金
        <input type="checkbox" value="6" v-model="checked">土
        <input type="checkbox" value="0" v-model="checked">日<br>
        <button v-on:click="update">update</button>
    </div>
</template>

<script>
import settings from '../../data/settings'
import axios from 'axios'

export default {
    props: {
        id: Number
    },
    data: function(){
        return {
            checked: [],
            default: []
        }
    },
    methods: {
        fetch: function(){
            axios.get(settings.radiobase.timetable + this.id + '/_autoReservation')
            .then((res,err)=>{
                if (res.data[0]){
                    this.checked = res.data[0].daysOfWeek
                    this.default = res.data[0].daysOfWeek
                }
            })
        },
        update: function(){
            if (this.default == this.checked) return

            if (this.default.length === 0){
                axios.post(settings.radiobase.timetable + this.id + '/_autoReservation',{daysOfWeek: this.checked})
            }
            if (this.default.length > 0){
                if (this.checked.length === 0){
                    axios.delete(settings.radiobase.timetable + this.id + '/_autoReservation')
                } else {
                    axios.put(settings.radiobase.timetable + this.id + '/_autoReservation',{daysOfWeek: this.checked})
                }
            }
        }
    },
    mounted: function(){
        this.fetch()
    }
    
}
</script>

<style scoped>

</style>