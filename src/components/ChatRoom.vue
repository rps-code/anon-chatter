<template>
    <p>Connected: {{ connected }}</p>
    <button @click="sendMessage">Send Message</button>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, inject } from 'vue'

    const socket = inject('$socket')
    const connected = ref(false)

    onMounted(() => {
        socket.on('connect', () => {
            connected.value = true
        })

        socket.on('disconnect', () => {
            connected.value = false
        })

        socket.on('message', data => {
            console.log(data)
        })

        socket.on('connect_error', error => {
            console.log('Connection Error', error)
        })
    })

    const sendMessage = () => {
        socket.emit('send-message', 'Hello, Server!')
    }

    onUnmounted(() => {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('message')
    })
</script>
