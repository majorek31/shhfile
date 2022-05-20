const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const prisma = new PrismaClient()
const {forbiddenExtensions} = require('../../config.json')

router.get('/info', (req, res) => {
    if (!req.query.id)
        return res.json({
            status: 1,
            data: {
                message: "You must provide a file's id in order to retrive info about it."
            }
        })
    return prisma.file.findFirst({
        where: {
            internalName: req.query.id
        }
    }).then(data => {
        if (!data)
            return res.json({
                status: 3,
                data: {
                    message: "File not found."
                }
            })
        return res.json({
            status: 0, 
            data: {
                url: data.url,
                size: data.size,
                hash: data.hash,
                createdAt: data.createdAt,
            }
        })
    }).catch(err => {
        return res.json({
            status: 4,
            data: {
                message: "Internal server error"
            }
        })
    })
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
            status: 2,
            data: {
                message: "You must provide a file in order to upload it."
            }
        })
    let file = req.files.file
    let internalName = crypto.randomUUID()
    let extension = file.name.split('.').pop()
    /*forbiddenExtensions.forEach(forbidden => {
        if (extension === forbidden)
            return res.json({
                status: 5,
                data: {
                    message: "Forbidden extension."
                }
            })
    })*/
    let fileName = internalName + "." + extension
    fs.mkdirSync(path.join(__dirname, '../../files/', internalName))
    fs.writeFile(path.join(__dirname, '../../files/', internalName, file.name), file.data, (err) => {
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