<template>
    <div class="editer">
        title: <input v-model="title" class="input-long"><br>
        timer: <input v-model="timer.hour">:<input v-model="timer.minutes">:<input v-model="timer.seconds"><br>
        <div id="autoReserveSelector">
            <input type="checkbox" value=0 v-model="checked">日
            <input type="checkbox" value=1 v-model="checked">月
            <input type="checkbox" value=2 v-model="checked">火
            <input type="checkbox" value=3 v-model="checked">水
            <input type="checkbox" value=4 v-model="checked">木
            <input type="checkbox" value=5 v-model="checked">金
            <input type="checkbox" value=6 v-model="checked">土<br>
        </div>
        <button v-on:click="preview">preview</button>
        <span v-if="Default">
            <button v-on:click="create">create</button>
        </span>
        <span v-else>
            <button v-on:click="update">update</button>
        </span>
        <button v-on:click="remove">delete</button>
        <div v-if="showPreview">
            <div v-for="program in programs" v-bind:key="program.id">
                <ProgramCard v-bind:program="program"></ProgramCard>
            </div>
        </div>
    </div>
</template>

<script>
import settings from '../../data/settings'
import axios from 'axios'
import ProgramCard from '../card/ProgramCard'

export default {
    components: {
        ProgramCard
    },
    data: function(){
        return {
            checked: [],
            title: "",
            timer: {},
            programs: [],
            showPreview: false,
            Default: false
        }
    },
    props: {
        reservationSetting: {},
    },
    computed: {
        newSetting: function(){
            return {
                title: this.title,
                daysOfWeek: this.checked,
                timer: this.timer.hour + this.timer.minutes + this.timer.seconds
            }
        }
    },
    methods: {
        preview: function(){
            this.showPreview = true
            for (let i=0; i<this.newSetting.daysOfWeek.length; i++){
                if (typeof this.newSetting.daysOfWeek[i] === 'string'){
                    this.newSetting.daysOfWeek[i] = parseInt(this.newSetting.daysOfWeek[i])
                }
            }
            axios.post(settings.radiobase.auto.reserve + '_test',this.newSetting)
            .then((res,err)=>{
                this.programs = res.data
                console.log(res.data)
            })
        },
        update: async function(){
            for (let i=0; i<this.newSetting.daysOfWeek.length; i++){
                if (typeof this.newSetting.daysOfWeek[i] === 'string'){
                    this.newSetting.daysOfWeek[i] = parseInt(this.newSetting.daysOfWeek[i])
                }
            }
            await axios.put(settings.radiobase.auto.reserve + this.reservationSetting._id,this.newSetting)
            .then((res,err)=>{
                console.log(res)
                if (err) console.log(err)
            })
            this.$emit('update')
        },
        remove: async function(){
            await axios.delete(settings.radiobase.auto.reserve + this.reservationSetting._id)
            .then((res,err)=>{
                console.log(res)
                if (err) console.log(err)
            })
            this.$emit('update')
        },
        create: async function(){
            for (let i=0; i<this.newSetting.daysOfWeek.length; i++){
                if (typeof this.newSetting.daysOfWeek[i] === 'string'){
                    this.newSetting.daysOfWeek[i] = parseInt(this.newSetting.daysOfWeek[i])
                }
            }
            await axios.post(settings.radiobase.auto.reserve,this.newSetting)
            .then((res,err)=>{
                console.log(res)
                if (err) console.log(err)
            })
            this.$emit('update')
        }
    },
    mounted: function(){
        this.title = this.reservationSetting.title
        this.checked = this.reservationSetting.daysOfWeek
        this.Default = this.reservationSetting.default

        const hour = this.reservationSetting.timer.slice(0,2)
        const minutes = this.reservationSetting.timer.slice(2,4)
        const seconds = this.reservationSetting.timer.slice(4,6)
        this.timer = {
            hour: hour,
            minutes: minutes,
            seconds: seconds
        }
    }
}
</script>

<style scoped>
.editer {
    background-color: #EEEEEE;
}
input {
    width: 15px;
}
.input-long {
    width: 100px;
}
</style>