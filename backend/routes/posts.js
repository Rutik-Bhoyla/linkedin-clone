const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// POST /api/posts - create a post
router.post('/', auth, async (req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      userId: req.user.id,
      name: user.name,
      content: req.body.content
    });
    const post = await newPost.save();
    res.json(post);
  } catch(err){ res.status(500).send('Server error'); }
});


// GET /api/posts - get all posts (latest first)
router.get('/', async (req,res)=>{
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch(err){ res.status(500).send('Server error'); }
});

module.exports = router;