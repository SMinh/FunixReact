import logo from "./logo.svg";
import React, { Component } from "react";
import { DISHES } from "./shared/dishes";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/MenuComponent";
import Main from "./components/MainComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}
export default App;
