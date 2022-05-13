import React from "react";
import dateFormat from "dateformat";

import { CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaff({ staff }) {
  if (staff != null)
    return (
      <div className="container">
        <div className="row">
          <div>
            <CardImg
              className="staff_image"
              src={staff.image}
              alt={staff.name}
            />
          </div>
          <div className="pl-3 ">
            <h5>Họ và Tên: {staff.name}</h5>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>Phòng ban: {staff.department.name}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày đã làm thêm: {staff.overTime}</p>
          </div>
        </div>
      </div>
    );
  else return <div></div>;
}

const StaffDetail = (props) => {
  if (props.staff != null)
    return (
      <div className="container mt-2">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/Nhân Viên">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
        </Breadcrumb>
        <RenderStaff staff={props.staff} />
      </div>
    );
  else return <div></div>;
};

export default StaffDetail;
