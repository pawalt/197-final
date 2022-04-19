import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'marked-react';

function ViewRecipe() {
  const [recipes, changeRecipe] = useState([])

  useEffect(() => {
    const getRecipe= async () => {
      const { data } = await axios.get('/api/recipes/')
      changeRecipe(data)
    }

    getRecipe()
  }, [])

  return (
    <>
    {recipes.map(recipe => {
      return (
        <a href={"/recipes/" + recipe._id}>
        <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{recipe.title}</p>
                  <p className="subtitle is-6">{recipe.author}</p>
                </div>
              </div>

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

export default ViewRecipe