# shhfile service

### shhfile is a service that provides fast and free file sharing.
I've made this just for my own pleasure and skills improvement

### Techstack
To create this i used: Express, NodeJS, Prisma, SQLite stack

## setup
in order to set-up the server run those 3 commands
```
npm i
npx prisma db push
npm start
```
# API

### Response codes
```
0 - OK
1 - Invalid params
3 - File not found
4 - Internal server error
```
For every status code diffrent than 0 ```data.message``` is specified
### Get server's status

#### Request
```js
GET /api/status
{
  status: 0,
  data: {
    storedFiles: 1 // number of stored files
  }
}
```
### Get file's information

#### Request
```js
GET /api/info/:file
{
  status: 0, // or 1, 3, 4
  data: {
    url: "http://localhost:8080/files/2c220011-19e4-48d8-9c6b-0150d9221c05",
    size: 3064, // size in BYTES of file
    hash: b2b5f87eaef0a3f9f3fecd8ca529cbc2, // md5 file's hash
    createdAt: "1653075199601", // time of file creation in ISO 8601 format
  }
}
```
### Upload file to server

#### Request
```js
POST /api/upload
{
  status: 0, // or 1, 4
  data: {
    url: "http://localhost:8080/files/2c220011-19e4-48d8-9c6b-0150d9221c05",
    size: 3064, // size in BYTES of file
    hash: b2b5f87eaef0a3f9f3fecd8ca529cbc2, // md5 file's hash
    createdAt: "1653075199601", // time of file creation in ISO 8601 format
  }
}
```
