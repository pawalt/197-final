import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import RecipeList from "./RecipeList";
import SignUp from "./SignUp";
import Login from "./Login";
import NewRecipe from "./NewRecipe";
import ViewRecipe from "./ViewRecipe";
import EditRecipe from "./EditRecipe";

function WholeScreen() {
  const [username, changeUserName] = useState('')
  const url = window.location.pathname.split('/').pop();

  const getUsername = async () => {
    try {
      const { data } = await axios.post('/api/account/verify', {}, {withCredentials: true})
      changeUserName(data)
    } catch (e) {

    }
  }

  useEffect(() => {
    getUsername()
  }, [url])

  return (
    <>
    <nav className="navbar is-primary mb-5" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <a href="/" className="navbar-item"><h1 className="title has-text-white">Cookbook</h1></a>
        </div>

        <div className="navbar-end">
          {username === "" ? (
            <>
            <div className="buttons pr-2">
              <a href="/signup" className="navbar-item button is-light">Sign Up</a>
              <a href="/login" className="navbar-item button is-link">Log In</a>
            </div>
            </>
          ) : (
            <>
            <strong className="navbar-item">Welcome, {username}</strong>
            <div className="buttons pr-2">
              <a href="/recipes/new" className="navbar-item button is-link">New Recipe</a>
              <a href={"/recipes/user/" + username} className="navbar-item button is-info">My Recipes</a>
              <button className="navbar-item button is-light" onClick={() => {
                const logOut = async () => {
                  const resp = await axios.post("/api/account/logout", {}, {withCredentials: true})
                  getUsername()
                }
                logOut()
              }}>Log Out</button>
            </div>
            </>
          )}
        </div>
      </div>
    </nav>

    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes/new" element={<NewRecipe />} />
          <Route path="/recipes/user/:author" element={<RecipeList />} />
          <Route path="/recipes/:recipeId" element={<ViewRecipe />} />
          <Route path="/recipes/edit/:recipeId" element={<EditRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
  )
}

export default WholeScreen