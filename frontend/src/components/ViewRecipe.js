import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'marked-react';

function ViewRecipe() {
  const { recipeId } = useParams()
  const [recipe, changeRecipe] = useState({
    title: '',
    recipeText: '',
  })

  useEffect(() => {
    const getRecipe= async () => {
      const { data } = await axios.get('/api/recipes/get/' + recipeId)
      changeRecipe(data)
    }

    getRecipe()
  }, [])

  return (
    <>
    <h1 className="title">{recipe.title}</h1>
    <div className="field">
      <div className="control">
        <a
          className="button is-link"
          type="button"
          href={"/recipes/edit/" + recipeId}
          >
          Edit Recipe
        </a>
      </div>
    </div>
    <Markdown>{recipe.recipeText}</Markdown>
    </>
  )
}

export default ViewRecipe