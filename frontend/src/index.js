import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NewRecipe from "./components/NewRecipe";
import ViewRecipe from "./components/ViewRecipe";

const app = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes/new" element={<NewRecipe />} />
      <Route path="/recipes/:recipeId" element={<ViewRecipe />} />
    </Routes>
  </BrowserRouter>,
  app
);
