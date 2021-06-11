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

router.delete('/:id', validateUserId, async (req, res, next) => {
  // Deletes a user by ID and sends a confirmation msg
  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // Returns array of user posts
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // verify user id & check that post is valid
  try {
    const result = await Post.insert({
      user_id: req.params.id, text: req.text
    })
    res.status(201).json(result)
  } catch(err){next(err)}
});

// Gabe's error-handling middleware
router.use((err, req, res) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic occurred',
    message: err.message,
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router;