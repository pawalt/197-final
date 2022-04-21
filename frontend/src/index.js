import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import WholeScreen from "./components/WholeScreen";

const app = document.getElementById("app");

ReactDOM.render(
    <WholeScreen/>
  ,
  app
);
