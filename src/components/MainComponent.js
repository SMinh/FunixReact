import React, { Component } from "react";
import "../App.css";
import StaffsList from "./StaffListComponent";
import Header from "./HeaderComponent";
import Departments from "./DepartmentsComponent";
import StaffDetail from "./StaffDetailComponent";
import Salary from "./SalaryComponent";
import Footer from "./FooterComponent";
import DeptDetail from "./DeptDetailComp";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepts,
  fetchSalary,
  postStaff,
  postDeleteStaff,
  postUpdateStaff,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    depts: state.depts,
    salary: state.salary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepts: () => {
    dispatch(fetchDepts());
  },
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
  postStaff: (
    id,
    name,
    doB,
    startDate,
    department,
    salaryscale,
    annualLeave,
    overTime
  ) =>
    dispatch(
      postStaff(
        id,
        name,
        doB,
        startDate,
        department,
        salaryscale,
        annualLeave,
        overTime
      )
    ),
  postDeleteStaff: (id) => dispatch(postDeleteStaff(id)),
  postUpdateStaff: (update) => dispatch(postUpdateStaff(update)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepts();
    this.props.fetchSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          staffId={parseInt(match.params.staffId, 10)}
          postUpdateStaff={this.props.postUpdateStaff}
        />
      );
    };

    const DeptWithId = ({ match }) => {
      console.log("DeptWithId", match);
      return (
        <DeptDetail
          dept={this.props.depts.depts[match.params.deptId]}
          staffs={this.props.staffs.staffs}
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
              <StaffsList
                staffs={this.props.staffs.staffs}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
                postStaff={this.props.postStaff}
                postDeleteStaff={this.props.postDeleteStaff}
                postUpdateStaff={this.props.postUpdateStaff}
              />
            )}
          />
          <Route
            exact
            path="/departments"
            component={() => (
              <Departments
                depts={this.props.depts.depts}
                deptsLoading={this.props.depts.isLoading}
                deptsErrMess={this.props.depts.errMess}
              />
            )}
          />
          <Route path="/departments/:deptId" component={DeptWithId} />

          <Route
            exact
            path="/salary"
            component={() => (
              <Salary
                salary={this.props.salary.salary}
                salaryLoading={this.props.salary.isLoading}
                salaryErrMess={this.props.salary.errMess}
              />
            )}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
