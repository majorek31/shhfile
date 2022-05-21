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

router.get('/status', async (req, res) => {
    try {
        fileCount = await prisma.file.count()
        return res.json({
            data: {
                storedFiles: fileCount
            }
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

router.post('/upload', async (req, res) => {
    if (!req.files.file)
        return res.sendStatus(400)
    file = req.files.file
    internalName = crypto.randomUUID()
    extension = file.name.split('.').pop()
    fileName = internalName + "." + extension
    try {
        fs.mkdirSync(path.join(__dirname, '../../data/', internalName))
        fs.writeFileSync(path.join(__dirname, '../../data/', internalName, file.name), file.data)
        createdFile = await prisma.file.create({
            data: {
                internalName: internalName,
                fileName: fileName,
                uploadedName: file.name,
                url: `http://localhost:8080/files/${internalName}`,
                size: file.size,
                hash: file.md5
            }
        })
        return res.json({
            data: {
                id: createdFile.internalName,
                url: createdFile.url,
                size: createdFile.size,
                hash: createdFile.hash,
                createdAt: createdFile.createdAt,
            }
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

module.exports = router