const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('./../db')
const { render } = require('ejs')
const { route } = require('./dish_controller')


router.get('/login', (req,res) => {
    res.render('login')
})

router.post('/sessions', (req, res) => {

    // creating a new session - logging in
    const { email, password } = req.body // destructured version
    // const email = req.body.email
    // const password = req.body.password

    // do you even exist in the users table

    const sql = `SELECT * FROM users WHERE email = '${email}';`

    pool.query(sql, (err, dbRes) => {

        // did we get a record back?
        if(dbRes.rows.length === 0) {
            // no good, user does not exist in the users table, stay at login page
            res.render('login')
            return
        }

        const user = dbRes.rows[0]

        bcrypt.compare(password, user.password_digest, (err, result) => {
            if(result) {
                // checked your id
                // store in your 'locker box'
                req.session.userId = user.id

                res.redirect('/')
            } else {
                res.render('login')
            }
        })
    })
})

router.delete('/sessions', (req, res) => {
    req.session.destroy(() => { // destroy everything in the locker box
        res.redirect('/login')
    })
})


module.exports = router