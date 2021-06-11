function logger(req, res, next) {
  // logger() logs to the console the following information about each request:
  // request method, request url, and a timestamp
  // runs on every request made to the API
  const timeFormat = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  };
  const timestamp = new Date().toLocaleString('en-UK', timeFormat)  
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}]: ${method} request to ${url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUserId middleware')
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
    console.log('validatePost middleware')
    next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
