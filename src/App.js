import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Question from "./component/question/Question";
import Add from "./component/question/Add";
import Stam from "./component/Stam";
import test from "./component/CreateTest/CreateTest";
import AddAnswer from "./component/answer/Answer";
import CreateTest from "./component/CreateTest/CreateTest";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Question} />
        <Route path="/add" component={Add} />
        <Route path="/addA" component={AddAnswer} />
        <Route path="/update/:id" component={Add} />
        <Route path="/stam" component={Stam} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
