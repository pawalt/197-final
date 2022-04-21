import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'marked-react';

function ViewRecipe() {
  const { recipeId } = useParams()
  const [username, changeUserName] = useState('')
  const [newComment, changeNewComment] = useState('')
  const loggedIn = username != "";
  const [recipe, changeRecipe] = useState({
    title: '',
    recipeText: '',
    author: '',
    comments: [],
  })
  const [addComment, changeAddComment] = useState(false)

  useEffect(() => {
    const getRecipe= async () => {
      const { data } = await axios.get('/api/recipes/get/' + recipeId)
      changeRecipe(data)
    }

    getRecipe()
  }, [])

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { data } = await axios.post('/api/account/verify', {}, {withCredentials: true})
        changeUserName(data)
      } catch (e) {

      }
    }

    getUsername()
  }, [])


  return (
    <>
    <div className="columns">
      <div className="column">
        <h1 className="title is-1 is-underlined is-pulled-left">{recipe.title}</h1>
      </div>
      <div className="column">
        <a
          className="button is-link is-pulled-right"
          type="button"
          href={"/recipes/edit/" + recipeId}
          disabled={!loggedIn || username != recipe.author}
          >
          Edit Recipe
        </a>
      </div>
    </div>
    <h2 className="subtitle"><strong>Author:</strong> {recipe.author}</h2>
    <hr/>
    <div className="content">
      <Markdown>{recipe.recipeText}</Markdown>
    </div>
    <hr/>
    <div className="columns">
      <div className="column">
        <h1 className="title is-underlined is-pulled-left">Comments</h1>
      </div>
      <div className="column">
        <button
          className="button is-link is-pulled-right"
          type="button"
          onClick={() => changeAddComment(!addComment)}
          disabled={!loggedIn}
          >
            {addComment ? "Collapse" : "Add Comment"}
          </button>
      </div>
    </div>
    {addComment && (
      <div className="box">
        <div className="field">
          <div className="control">
            <textarea className="textarea" placeholder="Enter your comment here" value={newComment} onChange={e => changeNewComment(e.target.value)} />
          </div>
        </div>
        <button className="button is-link" onClick={() => {
          const addComment = async () => {
            const resp = await axios.post("/api/recipes/comment/" + recipeId, {
              text: newComment,
            }, {withCredentials: true})
          }
          addComment()
          console.log("whatevs")
          changeAddComment(!addComment);
          window.location.reload();
        }}>Submit</button>
      </div>
    )}
    {(recipe.comments && recipe.comments.reverse().map(comment => (
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{comment.author}</strong>
              <br/>
              {comment.text}
            </p>
          </div>
        </div>
      </article>
    )))}
    </>
  )
}

export default ViewRecipe