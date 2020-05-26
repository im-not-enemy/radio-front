<template>
    <div>
        <div v-for="reservationSetting in reservationSettings" v-bind:key="reservationSetting._id">
            <AutoReserveCard v-bind:reservationSetting="reservationSetting" v-on:update="fetch"></AutoReserveCard>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import settings from '../data/settings'
import AutoReserveCard from './card/AutoReserveCard'

export default {
    components: {
        AutoReserveCard
    },
    data: function(){
        return {
            reservationSettings: [],
            default: {
                daysOfWeek: [],
                timer: "000000",
                title: "",
                _id: "",
                default: true
            }
        }
    },
    methods: {
        fetch: function(){
            axios.get(settings.radiobase.auto.reserve)
            .then((res,err)=>{
                res.data.push(this.default)
                this.reservationSettings = res.data
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