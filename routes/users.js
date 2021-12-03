const express = require('express');
const router = express.Router();

const { userRest } = require('../logics');

const { verifyToken } = require('../middlewares');

/* GET users listing. */
router.get('/', verifyToken, function (req, res) {
  userRest
    .getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/signup', function (req, res) {
  userRest
    .createUser(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log({ err });
      res.status(400).send(err);
    });
});

router.post('/login', function (req, res) {
  userRest
    .login(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error({ err });
      res.status(400).send(err.message);
    });
});

module.exports = router;
