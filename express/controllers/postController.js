const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.getPosts = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    Post.find({ 'user.id': { $in: req.query.following } })
      .sort({ createdAt: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ msg: 'Posts not found' }));
  } else {
    Post.find()
      .sort({ createdAt: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ msg: 'Posts not found' }));
  }
};

exports.addPost = (req, res) => {
  const newPost = new Post({
    user: { id: req.user.id, login: req.user.login },
    text: req.body.text
  });

  newPost.save().then(post => {
    req.io.emit('newPost', post);
    res.json(post);
  });
};

exports.getPostsByUserId = (req, res) => {
  Post.find({ 'user.id': req.params.userid })
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ msg: 'Posts not found' }));
};

exports.editPost = (req, res) => {
  const postFields = {};
  postFields.user = req.user.id;
  if (req.body.text) postFields.text = req.body.text;

  Post.findOne({ user: req.user.id }).then(post => {
    if (post.user != req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    } else {
      // Update
      Post.findOneAndUpdate(
        { user: req.user.id },
        { $set: postFields },
        { new: true }
      ).then(post => res.json(post));
    }
  });
};
