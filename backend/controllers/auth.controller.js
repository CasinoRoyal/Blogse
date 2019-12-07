const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user.model');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        status: 'fail',
        message: 'This email is already exist'
      });
    }

    const username = shortId.generate();
    const profile = `${process.env.CLIENT_URL}/profile/${username}`;
    const newUser = new User({ name, email, password, profile, username });

    await newUser.save();

    res.status(201).json({
      status: 'success',
      message: 'New user was created',
      user: newUser
    })

  } catch(err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: err
      });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !user.auth(req.body.password)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and/or password are wrong'
      });
    }
    const { _id, username, name, email, role } = user;
    const token = jwt.sign(
      {id: user._id}, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { expiresIn: '1d' });

    res.status(200).json({
      status: 'success',
      token,
      user: { _id, username, name, email, role }
    });

  } catch(err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: err
      });
  }    
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ status: 'success', message: 'Logged out was success' });
}

exports.protect = expressJwt({
  secret: process.env.JWT_SECRET_KEY
});
