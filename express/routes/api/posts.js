const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load models
const User = require('../../models/User');

const postController = require('../../controllers/postController');

// @route   GET api/posts/
// @desc    Get all posts
// @access  Public
router.route('/').get(postController.getPosts);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    postController.addPost
  );

// @route   GET api/posts/:userid
// @desc    Get posts by user id
// @access  Public
router.route('/:userid').get(postController.getPostsByUserId);

// @route   POST api/posts/:id
// @desc    Edit post
// @access  Private
// TODO: EDIT METHOD

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
// TODO: DELETE METHOD

module.exports = router;
