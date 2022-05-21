const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const path = require('path')

router.get('/:file', (req, res) => {
    return prisma.file.findFirst({
        where: {
            internalName: req.params.file
        }
    }).then(data => {
        if (!data)
            return res.json({
                status: 3,
                data: {
                    message: "File not found."
                }
            })
        return res.download(path.join(__dirname, '../../data/', data.internalName, data.uploadedName))
    }).catch(err => {
        console.log(err)
        return res.json({
            status: 4,
            data: {
                message: "Internal server error"
            }
        })
    })
})

module.exports = router