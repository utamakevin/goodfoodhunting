
const { Client } = require('pg') // need to save to database

const bcrypt = require('bcrypt')

const db = new Client({
    database: 'goodfoodhunting',
    user: 'postgres',
    password: process.env.PASSWORDGFH
})

db.connect()

const email = 'dt@ga.co'
const plainTextPassword = 'pudding'

bcrypt.genSalt(10, (err, salt) => {

    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        // the digested password is what we want to save in db
        
        const sql = `
            INSERT INTO users (email, password_digest)
            VALUES ('${email}', '${digestedPassword}');
            `
        
        
        
        db.query(sql, (err, dbRes) => {
            console.log(err)
            db.end()
        })
    })
})