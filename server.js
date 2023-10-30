let chalk

import('chalk').then(module => {
    chalk = module.default
})

const { Server } = require('socket.io')

const io = new Server(1337, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    console.log(chalk.green('(+) Client connected to socket'))

    socket.on('send-message', message => {
        io.emit('message', message)
        console.log(chalk.magenta(`(>) Message sent: ${message}`))
    })

    socket.on('disconnect', () => {
        console.log(chalk.red('(-) Client disconnected from socket'))
    })
})
