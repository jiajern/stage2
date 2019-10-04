const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const passport = require('passport');
const auth = require('../middleware/auth');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

userRouter.use(bodyParser.json());
// signup
userRouter.post('/signup', (req, res, next) => {
    Users.register(new User({ email: req.body.email }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                if (req.body.firstname)
                    user.firstname = req.body.firstname;
                if (req.body.lastname)
                    user.lastname = req.body.lastname;
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                });
            }
        });
});
// signin
userRouter.post('/signin', passport.authenticate('local'), (req, res) => {
    var token = auth.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ userId: req.user._id, success: true, token: token, status: 'You are successfully logged in!' });
});
// getting user profile
userRouter.get('/:userId', auth.verifyUser, (req, res, next) => {
    Users.findById(req.params.userId)
        .then((user) => {
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }
            else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: "User doesn't exist" });
            }
        }, (err) => {
            if (err.name === "CastError") {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: "Invalid user id" });
            }
            else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
        })
        .catch((err) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        })
});
// updating the user profile
userRouter.put('/:userId', auth.verifyUser, (req, res, next) => {
    var userId = req.params.userId;
    var currentUser = req.headers;
    var token = currentUser.authorization.split(" ")[1];
    currentUser = jwt.decode(token)._id;
    if (currentUser !== userId) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 403, message: "Not allowed" });
    }
    Users.findByIdAndUpdate(userId, {
        // TODO
        $set: req.body
    }, { new: true })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        }, (err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        })
});
module.exports = userRouter;