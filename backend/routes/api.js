const express = require('express')

const Recipe = require('../models/recipe')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes)
  } catch (e) {
    next(e)
  }
})

router.get('/user/:author', async (req, res, next) => {
  try {
    const author = req.params.author
    const recipes = await Recipe.find({ author });
    res.json(recipes)
  } catch (e) {
    next(e)
  }
})

router.get('/get/:recipeId', async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.findById(recipeId)
    res.json(recipe)
  } catch (e) {
    next(e)
  }
})

router.post('/set/:recipeId', isAuthenticated, async (req, res, next) => {
  const { recipeText, title } = req.body
  const author = req.session.username

  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.updateOne( {_id: recipeId}, {author, recipeText, title})
    res.json(recipe)
  } catch (e) {
    next(e)
  }
})

router.post('/comment/:recipeId', isAuthenticated, async (req, res, next) => {
  const { text } = req.body
  const author = req.session.username

  try {
    const recipeId = req.params.recipeId
    let recipe = await Recipe.findById(recipeId)
    let comments = recipe.comments ? recipe.comments : [];
    comments.push({
      author: author,
      text: text
    })
    recipe = await Recipe.updateOne( {_id: recipeId}, {comments})
    res.json(recipe)
  } catch (e) {
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { recipeText, title } = req.body
  const author = req.session.username

  try {
    const q = await Recipe.create({ recipeText, title, author })
    res.json(q)
  } catch (e) {
    next(e)
  }
})

module.exports = router