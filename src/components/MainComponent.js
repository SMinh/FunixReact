import React, { Component } from "react";
import "../App.css";
import Staffs from "./StaffListComponent";
import Header from "./HeaderComponent";
import Departments from "./DepartmentsComponent";
import StaffDetail from "./StaffComponent";
import Salary from "./SalaryComponent";
import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  addNewStaff = (newStaff) => {
    console.log(newStaff);
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
  };

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <Staffs
                staffs={this.state.staffs}
                addNewStaff={this.addNewStaff}
              />
            )}
          />
          <Route
            exact
            path="/departments"
            component={() => (
              <Departments departments={this.state.departments} />
            )}
          />
          <Route
            exact
            path="/salary"
            component={() => <Salary staffs={this.state.staffs} />}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
