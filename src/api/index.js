const express = require('express')
const router = express.Router()
const prisma = require('@prisma/client')
const fs = require('fs')

router.get('/info', (req, res) => {
    if (!req.query.id)
        return res.json({
            status: 1,
            data: {
                message: "You must provide a file's id in order to retrive info about it."
            }
        })
})

//TODO: return data about size of stored file, number of them, etc
router.get('/status', (req, res) => {

})

router.post('/upload', (req, res) => {
    if (!req.body.file)
        return res.json({
            status: 2,
            data: {
                message: "You must provide a file in order to upload it."
            }
        })
    
})

module.exports = router