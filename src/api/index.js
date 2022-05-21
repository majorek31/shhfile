const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const prisma = new PrismaClient()

router.get('/info', async (req, res) => {
    if (!req.query.id)
        return res.sendStatus(400)
    try {
        file = await prisma.file.findFirst({
            where: {
                internalName: req.query.id
            }
        })
        if (!file) 
            return res.sendStatus(404)
        return res.json({
            data: {
                url: file.url,
                size: file.size,
                hash: file.hash,
                createdAt: file.createdAt,
            }
        })    
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

router.get('/status', (req, res) => {
    return prisma.file.count().then(data => {
        return res.json({
            status: 0,
            data: {
                storedFiles: data
            }
        })
    })
})

router.post('/upload', (req, res, next) => {
    if (!req.files.file)
        return res.json({
            status: 1,
            data: {
                message: "You must provide a file in order to upload it."
            }
        })
    file = req.files.file
    internalName = crypto.randomUUID()
    extension = file.name.split('.').pop()
    fileName = internalName + "." + extension
    fs.mkdirSync(path.join(__dirname, '../../data/', internalName))
    fs.writeFile(path.join(__dirname, '../../data/', internalName, file.name), file.data, (err) => {
        if (err)
            return res.json({
                status: 4,
                data: {
                    message: "Internal server error"
                }
            })
        prisma.file.create({
            data: {
                internalName: internalName,
                fileName: fileName,
                uploadedName: file.name,
                url: `http://localhost:8080/files/${internalName}`,
                size: file.size,
                hash: file.md5
            }
        }).then((data) => {
            res.json({
                status: 0, 
                data: {
                    url: data.url,
                    size: data.size,
                    hash: data.hash,
                    createdAt: data.createdAt,
                }
            })
        }).catch((err) => {
            if (err) throw err
            return res.json({
                status: 4,
                data: {
                    message: "Internal server error"
                }
            })
        })
    })
})

module.exports = router