const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtsecret = require('../../jwtsecret');
/**
 * POST /login
 */
function login(req, res, next) {
  console.log(req.body)
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const token = jwt.sign(payload, jwtsecret, { expiresIn: '2d' }); //здесь создается JWT
    
    return res.json({user: user.name, token: 'JWT ' + token});
  })(req, res, next);
}

/**
 * POST /logout
 */
function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}

function checkAuth(req, res, next) {
  passport.authenticate('jwt', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    
    return res.json(user);
  })(req, res, next);
}

/**
 * POST /signup
 * Create a new local account
 */
function signUp(req, res, next) {
  console.log(req.body.name);
  const user = new User({
    name:req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return res.json(user);
    });
  });
}

function getAll(req, res) {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    if (users) {
      return res.json(users);
    }

    return res.json([]);
  });
}

function remove(req, res) {
  const query = { _id: req.params.id };
  User.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }


    return res.send(req.params.id);
  });
}

function update(req, res) {
  const query = { _id: req.params.id };
  const data = req.body;
  User.findOneAndUpdate(query, data, (err) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }

    return res.json(data);
  });
}


module.exports = {
  login: login,
  logout: logout,
  signUp: signUp,
  getAll: getAll,
  delete: remove,
  update: update,
  checkAuth: checkAuth
};