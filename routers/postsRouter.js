const router = require('express').Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
  const { name, body } = req.body;
  if (!name || !body) {
    return res.status(400).send({ error: 'Field is missing' });
  }
  if (name.length > 20 || body.length > 300) {
    return res
      .status(401)
      .json({ error: "Can't accept more than 200 character" });
  }

  const post = new Post({
    name,
    body,
  });

  const savedPost = await post.save();
  res.json(savedPost.toJSON());
});

router.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.json(posts.map((post) => post.toJSON()));
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, body } = req.body;
  const post = {
    name,
    body,
  };

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost.toJSON());
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = router;
