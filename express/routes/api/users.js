const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, '+password').then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        login: req.body.login.toLowerCase(),
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/search
// @desc    Search user by id
// @access  Public
router.post('/search', (req, res) => {
  User.findOne({ login: req.body.text }).then(user => {
    if (user) {
      return res.json(user);
    } else {
      return res.json({ msg: 'User not found' });
    }
  });
});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/follow
// @desc    Follow user by id
// @access  Private
router.post(
  '/follow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({
      _id: req.user.id
    }).then(user => {
      User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { following: req.body.userId } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { followers: req.user.id } },
            { new: true }
          )
            .then(user => res.json({ userId: req.body.userId }))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
);

// @route   POST api/users/unfollow
// @desc    Unfollow user by id
// @access  Private
router.post(
  '/unfollow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({
      _id: req.user.id
    }).then(user => {
      User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { following: req.body.userId } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { _id: req.body.userId },
            { $pull: { followers: req.user.id } },
            { new: true }
          )
            .then(user => res.json({ userId: req.body.userId }))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
);

// @route   POST api/users/:id
// @desc    Edit user
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userFields = {};
    userFields.user = req.user.id;
    if (req.body.login) userFields.login = req.body.login;
    if (req.body.email) userFields.email = req.body.email;

    //TODO: Add func - change password

    User.findOne({
      _id: req.params.id
    }).then(user => {
      if (user._id != req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      } else {
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: true }
        )
          .then(user => res.json(user))
          .catch(err => console.log(err));
      }
    });
  }
);

// @route   GET api/users/
// @desc    Return current user
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      login: req.user.login,
      email: req.user.email,
      following: req.user.following,
      followers: req.user.followers
    });
  }
);

module.exports = router;
