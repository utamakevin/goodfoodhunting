
const pool = require('./../db') // require a folder without a file, by default look for a file named index.js

function setCurrentUser(req, res, next) {
    const { userId } = req.session

    res.locals.currentUser = {}

    if(userId) {
        // user is logged in - setup currentUser object
        const sql = `SELECT id, email FROM users WHERE id = ${userId}`

        pool.query(sql, (err, dbRes) => {
            if(err) {
                console.log(err)
            } else {
                res.locals.currentUser = dbRes.rows[0]
                next()
            }
        })
    } else {
        next()
    }
}

module.exports = setCurrentUser