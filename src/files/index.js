const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const path = require('path')

router.get('/:file', async (req, res) => {
    try {
        file = await prisma.file.findFirst({
            where: {
                internalName: req.params.file
            }
        })
        if (!file)
            return res.sendStatus(404) // file not found
        return res.download(path.join(__dirname, '../../data/', file.internalName, file.uploadedName)) // file found, sending it to client
    } catch (err) {
        return res.sendStatus(500) // something went wrong on server's side
    }
})

module.exports = router