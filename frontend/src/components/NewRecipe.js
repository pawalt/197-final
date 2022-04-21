import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewRecipe() {
  const [recipeText, changeRecipeText] = useState('Edit your recipe here')
  const [recipeTitle, changeRecipeTitle] = useState('New Recipe')
  const navigate = useNavigate()

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
              const resp = await axios.post("/api/recipes/add", {
                title: recipeTitle,
                recipeText: recipeText,
                comments: [],
              }, {withCredentials: true})
              navigate('/recipes/' + resp.data._id)
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

export default NewRecipe