import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function ViewRecipe() {
  const [recipeText, changeRecipeText] = useState('Edit your recipe here')
  const [recipeTitle, changeRecipeTitle] = useState('New Recipe')
  const navigate = useNavigate()

  const { recipeId } = useParams()

  useEffect(() => {
    const getRecipe= async () => {
      const { data } = await axios.get('/api/recipes/get/' + recipeId)
      changeRecipeText(data.recipeText)
      changeRecipeTitle(data.title)
    }

    getRecipe()
  }, [])

  return (
    <>
    <div className="field">
      <div className="control">
        <input className="input is-large" type="text" value={recipeTitle} onChange={e => changeRecipeTitle(e.target.value)} />
      </div>
    </div>
    <SimpleMdeReact value={recipeText} onChange={v => changeRecipeText(v)} />
    <div className="field">
      <div className="control">
        <button
          className="button is-link"
          type="button"
          onClick={() => {
            const addRecipe = async () => {
              const resp = await axios.post("/api/recipes/set/" + recipeId, {
                title: recipeTitle,
                recipeText: recipeText,
              }, {withCredentials: true})
              navigate('/recipes/' + recipeId)
            }
            addRecipe()
          }}
        >
          Save
        </button>
      </div>
    </div>
    </>
  )
}

export default ViewRecipe