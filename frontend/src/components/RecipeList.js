import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'marked-react';

function RecipeList() {
  const { author } = useParams()
  const [recipes, changeRecipe] = useState([])

  useEffect(() => {
    const getRecipe= async () => {
      let url = '/api/recipes/';
      if (author) {
        url += "user/" + author;
      }
      const { data } = await axios.get(url)
      changeRecipe(data)
    }

    getRecipe()
  }, [])

  return (
    <>
    {recipes.map(recipe => {
      return (
        <a href={"/recipes/" + recipe._id} key={recipe._id}>
        <div className="card m-5">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{recipe.title}</p>
                  <p className="subtitle is-6"><strong>Author:</strong> {recipe.author}</p>
                </div>
              </div>
              <hr/>
              <div className="content">
                <Markdown>{recipe.recipeText}</Markdown>
              </div>
            </div>
        </div>
        </a>
      )
    })}
    </>
  )
}

export default RecipeList