const express = require('express');
const router = express.Router();

//MongoDB User Model
const User = require('../models/User');

//MongoDB UserVerification Model
const UserVerification = require('../models/UserVerification');

//email handler
const nodemailer = require('nodemailer');

//unique string
const { v4: uuidv4 } = require('uuid');

//Password Handler
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    let { originalname, username, email, password } = req.body;
    originalname = originalname.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    if (!originalname || !username || !email || !password) {
      return res.status(400).json({ message: 'Please provide input in all the fields.' });
    }
    else if (!/^[a-zA-Z ]*$/.test(originalname)) {
      return res.status(400).json({ message: 'Invalid name entered.' });
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email entered.' });
    }
    else if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    else {
      User.find({ email }).then(user => {
        if (user.length >= 1) {
          return res.status(409).json({ message: 'Email exists' });
        }
        else {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              return res.status(500).json({ message: 'Error hashing password' });
            }
            let user = new User({ originalname, username, email, password: hash });
            await user.save();
            res.json({ message: 'User created successfully' });
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    //taking it as input as it can be wither username/email.
    email = email.trim();
    password = password.trim();
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide input in all the fields.' });
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email entered.' });
    }
    else if (password.length < 6) {
      return res.status(400).json({ message: 'Password cannot be less than 6 characters.' });
    }
    else {
      //check if user exists
      User.find({ email })
        .then(data => {
          if (data) {
            //User exists
            const hashedPassword = data[0].password;
            bcrypt.compare(password, hashedPassword).then((result) => {
              if (result) {
        
                res.status(200).json({
                  message: 'Login successful', data: {
                    originalname: data[0].originalname,
                    username: data[0].username,
                    email: data[0].email,
                  },
                  token: jwt.sign({ email: data[0].email, userId: data[0]._id }, process.env.JWT_SECRET),
                });
              }
              else {
                res.status(401).json({ message: 'Invalid password' });
              }
            }).catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Error comparing passwords' });
            })
          }
        })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Example Express.js backend route
router.get('/user-details', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email }); // Assuming you have a User model
    if (user) {
      res.json({
        originalname: user.name,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// router.get('/profile', async (req, res) => {
//   try {
//     const user = await User.findById(req.userData.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user profile' });
//   }
// });

module.exports = router;