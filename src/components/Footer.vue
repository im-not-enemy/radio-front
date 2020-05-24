<template>
    <div id="footer">
        <div class="container">
            <DateSelector v-on:selected="sendDate"></DateSelector>
<!--            <StationSelector v-on:selected="sendStation"></StationSelector> -->
        </div>
    </div>
</template>

<script>
import DateSelector from './selector/DateSelector'
import StationSelector from './selector/StationSelector'

export default {
    components: {
        DateSelector, StationSelector
    },
    methods: {
        sendDate: function(payload){
            console.log("[Footer] send: " + JSON.stringify(payload))
            this.$emit('update',payload)
        },
        sendStation: function(payload){
            console.log("[Footer] send: " + JSON.stringify(payload))
            this.$emit('update',payload)
        }
    }
}
</script>

<style scoped>
#footer {
    position: fixed;
    bottom: 0px;
    height: 60px;
    width: 100%;
    background-color: white;
}
.container {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
}
</style>