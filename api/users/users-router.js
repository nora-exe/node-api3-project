const express = require('express');
const router = express.Router();
const User = require('./users-model');
const Post = require('../posts/posts-model');
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');

router.get('/', (req, res, next) => {
  // returns array of users
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // validateUserId() checks if id exists
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // validateUser() checks if request body is valid
  User.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // Returns updated user object
  // validateUserId() verifies user id, validateUser() checks request body
  User.update(req.params.id, {name: req.name})
    .then(() => {
      return User.getById(req.params.id)
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});

// Gabe's error-handling middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic occurred',
    message: err.message,
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router;