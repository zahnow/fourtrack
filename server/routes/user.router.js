const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const axios = require('axios');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const user_profile_image_path = req.body.image_path;

  const queryText = `INSERT INTO "user" (username, password, email, first_name, last_name, user_profile_image_path, "created_at", "updated_at")
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING id`;
  pool
    .query(queryText, [username, password, email, first_name, last_name, user_profile_image_path])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Sticking the newsletter stuff here
router.put('/mailing-list', (req, res) => {
  const key = process.env.MAILCHIMP_API;
  const dc = process.env.MAILCHIMP_DC;
  const list = process.env.MAILCHIMP_LIST;

  const email = req.body.email;

  axios.put(`https://${dc}.api.mailchimp.com/3.0/lists/${list}/members/${email}`,
    {
      email_address: email,
      status_if_new: "pending"
    },
    {
      auth: {
        username: "anystring",
        password: key
      },
      headers: {
        "User-agent": "Request-Promise"
      }
    })
    .then(response => {
      res.sendStatus(201);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;