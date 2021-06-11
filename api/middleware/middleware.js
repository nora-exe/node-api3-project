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
  // checks the database to make sure there is a user with that id.
  // if id valid, stores user object as `req.user` and allows the request to continue
  // if id invalid, responds with status `404` and `{ message: "user not found" }`
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
  // Validates body on a request to create or update user
  // if req body lacks required name field, responds with 400 and { message: "missing required name field" }
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({ message: 'missing required name field' })
  } else {
    req.name = name.trim()
    next()
  }
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