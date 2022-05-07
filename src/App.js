import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Staff from "./components/StaffListComponent";
import { Navbar, NavbarBrand } from "reactstrap";
import { STAFFS } from "./shared/staffs";
import { DEPARTMENTS } from "./shared/staffs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <Staff staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
