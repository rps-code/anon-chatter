import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { io } from 'socket.io-client'

const app = createApp(App)
const socket = io('http://localhost:1337')

app.provide('$socket', socket)
app.mount('#app')
