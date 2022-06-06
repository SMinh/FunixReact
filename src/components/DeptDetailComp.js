import React from "react";
import { CardImg, Breadcrumb, BreadcrumbItem, Card } from "reactstrap";
import { Link } from "react-router-dom";

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

function StaffsRender({ staffs, dept }) {
  console.log({ staffs, dept });
  if (staffs != null) {
    return (
      <React.Fragment>
        {staffs
          .filter((staff) => {
            if (staff.departmentId === dept.id) return staff;
            return 0;
          })
          .map((staff) => {
            return (
              <div
                key={staff.id}
                className="text-dark text-center col-6 col-md-4 col-lg-2 p-1"
              >
                <RenderStaff staff={staff} />
              </div>
            );
          })}
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
}

const DeptDetail = (props) => {
  console.log(props);
  if (props.dept != null)
    return (
      <div className="container mt-2">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/departments">Phòng Ban</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dept.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="row">
          <StaffsRender staffs={props.staffs} dept={props.dept} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default DeptDetail;
