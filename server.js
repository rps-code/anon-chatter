const { Server } = require('socket.io')

const io = new Server(3000, {
    cors: {
        origin: 'http://localhost:5173', // Your Vite server
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    console.log('New client connected')

    socket.on('send-message', message => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})
