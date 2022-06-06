import React from "react";
import NumberFormat from "react-number-format";
import { FadeTransform } from "react-animation-components";
import { Loading } from "./LoadingComp";
import { Table } from "reactstrap";

function renderPerson(salary) {
  return (
    <tr className="text-center">
      <td>{salary.id}</td>
      <td>{salary.name}</td>
      <td>{salary.salaryScale}</td>
      <td>{salary.overTime}</td>
      <td>
        <NumberFormat
          thousandsGroupStyle="thousand"
          value={salary.salary}
          thousandSeparator={true}
          displayType="text"
        />
      </td>
    </tr>
  );
}
const Salary = (props) => {
  if (props.salaryLoading) {
    return <Loading />;
  } else if (props.salaryErrMess) {
    return <h4>{props.salaryErrMess}</h4>;
  } else
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
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
              {props.salary.map((salary) => {
                return renderPerson(salary);
              })}
            </tbody>
          </Table>
        </div>
      </FadeTransform>
    );
};

export default Salary;
