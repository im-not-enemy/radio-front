<template>
    <div id="AutoReserveCard">
        <div class="viewer" v-on:click="switchEditer">
            <div v-if="reservationSetting.default">+</div>
            <div v-else>
                <div>検索タイトル: {{reservationSetting.title}}</div>
                <div>開始時刻: {{timer.all}}</div>
                <div>曜日: {{daysOfWeek}}</div>
            </div>
        </div>
        <Editer v-if="editer" v-bind:reservationSetting="reservationSetting" v-on:update="update"></Editer>
    </div>
</template>

<script>
import axios from 'axios'
import settings from '../../data/settings'
import Editer from '../editer/AutoReserveEditer'

export default {
    components: {
        Editer
    },
    props: {
        reservationSetting: {}
    },
    data: function(){
        return {
            editer: false
        }
    },
    methods: {
        switchEditer: function(){
            this.editer = !this.editer
        },
        update: function(){
            this.editer = false
            this.$emit('update')
        }
    },
    computed: {
        timer: function(){
            const hour = this.reservationSetting.timer.slice(0,2)
            const minute = this.reservationSetting.timer.slice(2,4)
            const second = this.reservationSetting.timer.slice(4,6)
            return {
                hour: hour,
                minute: minute,
                second: second,
                all:`${hour}:${minute}:${second}` 
            }
        },
        daysOfWeek: function(){
            const jArray = ['日','月','火','水','木','金','土']
            let jDaysOfWeek = ""
            for (let i in this.reservationSetting.daysOfWeek.sort()){
                jDaysOfWeek += `${jArray[this.reservationSetting.daysOfWeek[i]]} `
            }
            return jDaysOfWeek
        }
    }
}
</script>

<style scoped>
#AutoReserveCard {
    width: 345px;
    color: #333333;
    margin: 1px 0px 2px 0px;
}
.viewer {
    background-color: #D7EEFF;
}
</style>