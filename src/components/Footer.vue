<template>
    <div id="footer">
        <div class="container">
            <DateSelector v-on:selected="sendDate"></DateSelector>
        </div>
    </div>
</template>

<script>
import DateSelector from './selector/DateSelector'

export default {
    components: {
        DateSelector
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
    left: 0px;
    bottom: 0px;
    height: 40px;
    width: 100%;
    background-color: white;
}
.container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
}
</style>