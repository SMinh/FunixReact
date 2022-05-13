import React from "react";

import { Table } from "reactstrap";

function renderPerson(staff) {
  const salary =
    parseInt(staff.salaryScale, 10) * 3000000 +
    parseInt(staff.overTime, 10) * 200000;
  return (
    <tr className="text-center">
      <td>{staff.id}</td>
      <td>{staff.name}</td>
      <td>{staff.salaryScale}</td>
      <td>{staff.overTime}</td>
      <td>{salary}</td>
    </tr>
  );
}
const Salary = (props) => {
  return (
    <div className="container">
      <div className="col-12">
        <h3>Bảng Lương</h3>
        <hr />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Mã nhân viên</th>
            <th>Họ và Tên</th>
            <th>Hệ số lương</th>
            <th>Số ngày làm thêm</th>
            <th>Lương</th>
          </tr>
        </thead>
        <tbody>
          {props.staffs.map((staff) => {
            return renderPerson(staff);
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Salary;
