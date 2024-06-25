const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

router.post('/create', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    author: req.session.userId,
    image: req.file ? `/uploads/${req.file.filename}` : null
  });
  await post.save();
  res.redirect('/blog');
});

router.get('/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('editPost', { post });
});

router.post('/edit/:id', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const updateData = { title, content };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }
  await Post.findByIdAndUpdate(req.params.id, updateData);
  res.redirect('/blog');
});

router.post('/delete/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/blog');
});

module.exports = router;
