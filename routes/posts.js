const express = require('express');
const router = express.Router();

const { postRest, userRest } = require('../logics');

const { verifyToken } = require('../middlewares');

router.get('/', verifyToken, (req, res, next) => {
  postRest
    .getPost()
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      console.log({ err });
      res.status(400).send(err);
    });
});

router.post('/', verifyToken, async (req, res, next) => {
  try {
    const post = await postRest.createPost(req.body, res.locals);
    const userData = await userRest.savePostId({ postId: post._id, userId: res.locals.userId });
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(err);
  }
});

module.exports = router;
