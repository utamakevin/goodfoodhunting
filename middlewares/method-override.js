const methodOverride = require('method-override')


// methodOverride is a function that returns another function
const mOMiddleware = methodOverride(function (req, res, next) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  })


module.exports = mOMiddleware