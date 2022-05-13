import React from "react";
import { Link } from "react-router-dom";

import { Card, CardImg, CardTitle } from "reactstrap";

function RenderStaff({ staff }) {
  return (
    <Card>
      <Link to={`/staff/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <h5 className="text-link">{staff.name}</h5>
      </Link>
    </Card>
  );
}
const Staffs = (props) => {
  const staffs = props.staffs.map((staff) => {
    return (
      <div
        key={staff.id}
        className="text-dark text-center col-6 col-md-4 col-lg-2 p-1"
      >
        <RenderStaff staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="col-12">
        <h3>Nhân Viên</h3>
        <hr />
      </div>
      <div className="row">{staffs}</div>
    </div>
  );
};

export default Staffs;
