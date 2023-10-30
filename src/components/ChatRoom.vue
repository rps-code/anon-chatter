<template>
    <p>Connected: {{ connected }}</p>
    <button @click="sendMessage">Send Message</button>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted, inject } from 'vue'
    import { Socket } from 'socket.io-client'

    const socket = inject('$socket') as unknown as Socket
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
