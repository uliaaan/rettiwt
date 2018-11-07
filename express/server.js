const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

io.on('connection', socket => {
  console.log(
    `Connected to Socket - ${socket.id}. IP - ${socket.handshake.address}`
  );
});

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  req.io = io;
  next();
});

mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/posts', posts);

app.use(express.static(path.join(__dirname, '../react-redux/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../react-redux/build/index.html'));
});
const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server start on port ${port}`));
