const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')
const pool = require('./../db')

router.get('/', (req, res) => {
    console.log(req.user)
    const sql = 'SELECT * FROM dishes;'

    pool.query(sql, (err, dbRes) => {
        // console.log(err)
        // console.log(dbRes.rows[0])
        res.render('home', {
            dishes: dbRes.rows, 
            email: req.session.email
        })
    })
})

router.get('/dishes/new', (req, res) => {
    res.render('new_dish')
})

router.get('/dishes/:id', ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id=$1`
    pool.query(sql, [req.params.id], (err, dbRes) => {
        const dish = dbRes.rows[0]
        console.log(dish)
        res.render('dish_detail', { dish })

    })
})

// get post redirect
// route is http method + path
router.post('/dishes', (req, res) => {
    console.log(req.body)
    const sql = `
        INSERT INTO dishes (title, image_url, user_id) 
        VALUES ($1, $2, $3);
        `

    pool.query(sql, [req.body.title, req.body.image_url, req.session.userId], (err, dbRes) => {
        res.redirect('/') // redirect always GET
    })
})

router.get('/dishes/:dish_id/edit', (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id=$1;`
    pool.query(sql, [req.params.dish_id], (err, dbRes) => {
        if (err) {
            console.log(err)
            process.exit(1)
        } else {
            const dish = dbRes.rows[0]
            const dishUrl = dbRes.image_url
            res.render('edit_dish', { dish, dishUrl })
        }
    })
})

router.put('/dishes/:dish_id', (req, res) => {
    console.log(req.body.title)
    const sql = `UPDATE dishes SET title = $1, image_url = $2 WHERE id = $3;`
    console.log(sql)
    pool.query(sql, [req.body.title, req.body.image_url, req.params.dish_id], (err, dbRes) => {
        res.redirect(`/dishes/${req.params.dish_id}`) // redirect always GET
    })
})

router.delete('/dishes/:dish_id', (req, res) => {
    const sql = `DELETE FROM dishes WHERE id = $1;`

    pool.query(sql, [req.params.dish_id], (err, dbRes) => {
        res.redirect('/')
    })
} )

module.exports = router