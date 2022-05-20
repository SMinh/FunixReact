import logo from "./logo.svg";
import React, { Component } from "react";
import { DISHES } from "./shared/dishes";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/MenuComponent";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
