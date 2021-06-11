const User = require('../users/users-model');
// const Post = require('../posts/posts-model');

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

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'There was a problem finding the user.'
    })
  }
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