const express = require('express')

const app = express()

app.get('/', async (req, res) => {
    res.status(200)
    res.write('Hello, World!')
    res.end()
})

app.use((req, res, next) => {
    res.status(404)
    res.write('Huh... I can\'t find that...')
    res.end()
})

module.exports = app