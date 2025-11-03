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

// POST /api/posts/:id/comment - add comment
router.post('/:id/comment', auth, async (req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    const comment = { userId: req.user.id, name: user.name, text: req.body.text };
    post.comments.unshift(comment);
    await post.save();
    res.json(post.comments);
  } catch(err){ res.status(500).send('Server error'); }
});

// POST /api/posts/:id/like - toggle like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const userId = req.user.id;
    if (post.likes.includes(userId)) {
      // unlike
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      // like
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;