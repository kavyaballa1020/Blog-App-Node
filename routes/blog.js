const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
});

router.get('/', async (req, res) => {
  const posts = await Post.find({ author: req.session.userId });
  res.render('blog', { posts });
});

router.get('/create', (req, res) => {
  res.render('createPost');
});

router.post('/create', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.session.userId });
  await post.save();
  res.redirect('/blog');
});

router.get('/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('editPost', { post });
});

router.post('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, content });
  res.redirect('/blog');
});

router.post('/delete/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/blog');
});

module.exports = router;
