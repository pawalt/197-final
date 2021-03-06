const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('user creation was successful')
  } catch (e) { 
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (password === user.password) {
      req.session.username = username
      res.send("success")
    } else {
      res.status(503)
      res.send("failed")
    }
  } catch (e) {
    next(e)
  }
})

router.post('/verify', async (req, res, next) => {
  res.send(req.session.username)
})

router.post('/logout', isAuthenticated, async (req, res) => {
  req.session.username = ""
  res.send("success")
})

module.exports = router
