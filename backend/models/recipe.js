const mongoose = require('mongoose')

const { Schema, model } = mongoose

const comment = new Schema();

comment.add({
  author: {type: String, required: true},
  text: {type: String, required: true},
})

const recipeSchema = new Schema({
  title: { type: String, required: true },
  recipeText: { type: String, required: true },
  author: { type: String, required: true },
  comments: {type: [comment], required: true},
  created_at: Date,
  updated_at: Date,
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe