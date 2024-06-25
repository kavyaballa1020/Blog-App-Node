const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Home Route
router.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index', { posts: posts });
});

module.exports = router;
