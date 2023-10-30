<template>
    <div class="p-20 h-full w-full">
        <div class="p-4 bg-slate-300 rounded-md h-full flex flex-col w-full">
            <p class="text-lg font-semibold flex items-center">
                <span class="text-blue-600 me-2">Status:</span>
                <span :class="connected ? 'text-green-500' : 'text-red-500'">{{ connected ? 'Connected' : 'Disconnected' }}</span>
                <span
                    class="animate-ping inline-flex rounded-full ms-2 h-2 w-2 bg-green-500 opacity-75"
                    :class="connected ? 'bg-green-500' : 'bg-red-500'"
                    >&nbsp;</span
                >
            </p>
            <ul class="list-none list-inside mt-2 h-full">
                <li v-for="(message, index) in messages" :key="index" class="text-sm">{{ message }}</li>
            </ul>
            <div class="mt-4 flex items-center">
                <input v-model="newMessage" @keyup.enter="sendMessage" class="p-2 rounded-md border focus:border-blue-400 flex-grow" />
                <button @click="sendMessage" class="ml-2 p-2 bg-slate-500 text-white rounded-md">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted, inject } from 'vue'
    import { Socket } from 'socket.io-client'

    const socket = inject('$socket') as unknown as Socket
    const connected = ref(false)

    const newMessage = ref('')
    const messages = ref<string[]>([])

    onMounted(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server')
            connected.value = true
        })

        socket.on('new-message', message => {
            console.log('New message to socket server:', message)
            messages.value.push(message)
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server')
            connected.value = false
        })

        socket.on('message', data => {
            console.log('Message from socket server:', data)
        })

        socket.on('connect_error', error => {
            console.log('Connection Error', error)
        })
    })

    const sendMessage = () => {
        messages.value.push(newMessage.value)
        socket.emit('send-message', newMessage.value)
        newMessage.value = ''
    }

    onUnmounted(() => {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('message')
        socket.off('new-message')
    })
</script>
