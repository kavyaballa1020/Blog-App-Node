const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// New Post Route
router.get('/new', (req, res) => {
    res.render('new');
});

// Create Post Route
router.post('/', async (req, res) => {
    await Post.create(req.body.post);
    res.redirect('/');
});

// Show Post Route
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('show', { post: post });
});

// Edit Post Route
router.get('/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post: post });
});

// Update Post Route
router.put('/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body.post);
    res.redirect(`/posts/${req.params.id}`);
});

// Delete Post Route
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
});

module.exports = router;
