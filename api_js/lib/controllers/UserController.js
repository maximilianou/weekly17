// UserController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dbconnect = require(`${process.cwd()}/lib/DB`);
// User register
exports.register = function (req, res) {
  const { username, email, password, passwordConfirmation } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'Please provide email or password' });
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ error: 'Password does not match' });
  }
  dbconnect();
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ error: 'Oops! Something went Wrong' });
    }
    if (existingUser) {
      return res.status(422).json({ error: 'User already exists' });
    } else {
      const user = new User({
        username,
        email,
        password,
      });

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            error: 'Oops! Something went Wrong',
          });
        }
        return res.status(200).json({ registered: true });
      });
    }
  });
};

exports.login = function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Please provide email or password' });
  }
  dbconnect();
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        error: 'Oops! Something went wrong',
      });
    }

    if (!user) {
      return res.status(422).json({ error: 'Invalid user' });
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        env.secret,
        { expiresIn: '1h' }
      );

      return res.json(json_token);
    } else {
      return res.status(422).json({ error: 'Wrong email or password' });
    }
  });
};
