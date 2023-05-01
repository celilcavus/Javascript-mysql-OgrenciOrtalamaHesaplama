const mysql = require('mysql2')

var context = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'jscrud',
    password:'dbsifre'
})

module.exports = context