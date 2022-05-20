const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

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
        res.sendFile(path.join(__dirname, '../../data/', internalName), data.uploadedName)
    }).catch(err => {
        return res.json({
            status: 4,
            data: {
                message: "Internal server error"
            }
        })
    })
})

module.exports = router