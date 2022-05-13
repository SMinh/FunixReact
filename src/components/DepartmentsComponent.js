import React from "react";
import { Card } from "reactstrap";

function RenderDepartment({ department }) {
  return (
    <Card className="p-2">
      <h4>{department.name}</h4>
      <p className="text-center ">
        Số lượng nhân viên: {department.numberOfStaff}
      </p>
    </Card>
  );
}
const Departments = (props) => {
  const departments = props.departments.map((department) => {
    return (
      <div
        key={department.id}
        className="text-dark col-12 col-md-6 col-lg-4 p-1"
      >
        <RenderDepartment department={department} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="col-12">
        <h3>Phòng Ban</h3>
        <hr />
      </div>
      <div className="row">{departments}</div>
    </div>
  );
};

export default Departments;
