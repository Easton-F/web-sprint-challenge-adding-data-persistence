// start your server here
const server = require('./api/server')

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`api running on port ${port}`)
})