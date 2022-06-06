import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComp";

const Departments = (props) => {
  function RenderDepartment({ dept, index }) {
    return (
      <Card className="p-2">
        <Link to={`/departments/${index}`}>
          <h4>{dept.name}</h4>
          <p className="text-center ">
            Số lượng nhân viên: {dept.numberOfStaff}
          </p>
        </Link>
      </Card>
    );
  }

  function DeptsRender({ depts }) {
    if (depts != null) {
      return depts.map((dept) => {
        return (
          <div key={dept.id} className="text-dark col-12 col-md-6 col-lg-4 p-1">
            <RenderDepartment dept={dept} index={depts.indexOf(dept)} />
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }

  if (props.deptsLoading) {
    return <Loading />;
  } else if (props.deptsErrMess) {
    return <h4>{props.deptsErrMess}</h4>;
  } else
    return (
      <div className="container">
        <div className="col-12">
          <h3>Phòng Ban</h3>
          <hr />
        </div>
        <div className="row">
          <DeptsRender depts={props.depts} />
        </div>
      </div>
    );
};

export default Departments;
