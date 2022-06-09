const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const todo = require('./data/todo');
const post = require('./data/post');

const cors = require('cors');
const corsConfig = {
  origin: true,
  credentials: true,
};

const refreshTokens = {};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ data: todo.todo })
});

app.get('/post', (req, res) => {
  res.json({ data: post.post(), total: 200, perPage: 15 })
});

app.get('/post-detail', (req, res) => {
  res.json(post.postDetail())
});

app.get('/protected-cookie', (req, res) => {
  const token = req.headers
  console.log('token', token);
  res.json({ message: 'protected-cookie' })
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization
  console.log('token3', token);
  try {
    var decoded = jwt.verify(token, 'secret');
    res.json({
      message: decoded
    })
  } catch (err) {
    // err
    res.status(401).json({
      message: 'error'
    })
  }
});

app.post('/login', (req, res) => {
  const token = jwt.sign({
    data: req.body
  }, 'secret', { expiresIn: 60 * 60 });
  res.json({
    token
  })
});

app.post('/login-refresh-token', (req, res) => {
  const token = jwt.sign({
    data: req.body
  }, 'secret', { expiresIn: 60 * 60 });

  const refresh_token = randtoken.generate(16);
  refreshTokens[refresh_token] = req.body
  res.json({
    token,
    refresh_token
  })
});

app.post('/login-cookie-http-only', (req, res) => {
  const token = jwt.sign({
    data: req.body
  }, 'secret', { expiresIn: 60 * 60 });

  res
    .status(200)
    .cookie('XSRF-TOKEN', token, {
      path: '/',
      expires: new Date(new Date().getTime() + 100 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      origin: 'http://localhost:3000',
    }).json({
      message: 'Ok'
    })
});

app.get('/refresh-token', (req, res) => {
  const refresh_token = req.headers.refreshtoken;
  const userData = refreshTokens[refresh_token]
  if (userData) {
    const token = jwt.sign({
      data: userData
    }, 'secret', { expiresIn: 60 * 60 });

    const new_refresh_token = randtoken.generate(16);
    refreshTokens[new_refresh_token] = userData;
    delete refreshTokens[refresh_token];
    res.json({
      token,
      refresh_token: new_refresh_token
    })
  } else {
    res.status(401).json({ message: 'err' })
  }

});

app.listen(5000);