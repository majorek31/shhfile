# ShhFile

ShhFile is a service that provides fast and free file sharing.
that i've made this just for my own pleasure and skills improvement

## Techstack
To create this i used: Express, NodeJS, Prisma, SQLite stack

## Installation
In order to set-up the server run those 3 commands
```
npm i
npx prisma db push
npm start
```
# API Docs

### Get server's status

Returns information about number of stored files.

##### Request

```json
GET /api/status
```
##### Example response
```
{
  data: {
    storedFiles: 1 // number of stored files
  }
}
```
### Get file's information

#### Request
```json
GET /api/info/:file
```
##### Example response
```
{
  data: {
    url: "http://localhost:8080/files/2c220011-19e4-48d8-9c6b-0150d9221c05",
    size: 3064, // size in BYTES of file
    hash: "b2b5f87eaef0a3f9f3fecd8ca529cbc2", // md5 file's hash
    createdAt: "1653075199601", // time of file creation in ISO 8601 format
  }
}
```
### Upload file to server

#### Request
```js
POST /api/upload
```
##### Example request
```bash
curl -F "file=@important-file.txt" http://localhost:8080/api/upload
```
##### Example response
```
{
  data: {
    id: 2c220011-19e4-48d8-9c6b-0150d9221c05, // id that is used in /api/info
    url: "http://localhost:8080/files/2c220011-19e4-48d8-9c6b-0150d9221c05",
    size: 3064, // size in BYTES of file
    hash: "b2b5f87eaef0a3f9f3fecd8ca529cbc2", // md5 file's hash
    createdAt: "1653075199601", // time of file creation in ISO 8601 format
  }
}
```
