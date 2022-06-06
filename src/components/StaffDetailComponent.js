import React, { useState } from "react";
import dateFormat from "dateformat";

import {
  CardImg,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const deptNames = {
  Sale: "Dept01",
  HR: "Dept02",
  Marketing: "Dept03",
  IT: "Dept04",
  Finance: "Dept05",
};

const deptId = {
  Dept01: "Sale",
  Dept02: "HR",
  Dept03: "Marketing",
  Dept04: "IT",
  Dept05: "Finance",
};
function RenderStaff({ staff, id, postUpdateStaff }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [name, setName] = useState(staff.name);
  const [doB, setDoB] = useState(staff.doB);
  const [startDate, setStartDate] = useState(staff.startDate);
  const [department, setDepartment] = useState(deptId[staff.departmentId]);
  const [salaryScale, setSalaryScale] = useState(staff.salaryScale);
  const [annualLeave, setAnnualLeave] = useState(staff.annualLeave);
  const [overTime, setOverTime] = useState(staff.overTime);
  const toggleUpdate = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDoBChange = (e) => {
    setDoB(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleSalaryScaleChange = (e) => {
    setSalaryScale(e.target.value);
  };

  const handleOverTimeChange = (e) => {
    setOverTime(e.target.value);
  };

  const handleAnnualLeaveChange = (e) => {
    setAnnualLeave(e.target.value);
  };

  const handleUpdate = (e) => {
    if (window.confirm("You sure to update this Staff")) {
      const newStaff = {
        id: staff.id,
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: deptNames[department],
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
      };
      postUpdateStaff(newStaff);
      toggleUpdate();
      e.preventDefault();
    }
  };

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
            {isUpdateOpen === false ? (
              <React.Fragment>
                <h5>Họ và Tên: {staff.name}</h5>
                <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                <p>
                  Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                </p>
                <p>Phòng ban: {staff.departmentId}</p>
                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                <p>Số ngày đã làm thêm: {staff.overTime}</p>
                <Button color="primary" onClick={toggleUpdate}>
                  Update
                </Button>{" "}
              </React.Fragment>
            ) : (
              <Form>
                <FormGroup row>
                  <Label htmlFor="name" md={4}>
                    Họ và Tên
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label htmlFor="doB" md={4}>
                    Ngày sinh
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="doB"
                      name="doB"
                      value={doB}
                      onChange={handleDoBChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="startDate" md={4}>
                    Ngày vào công ty
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={4}>Phòng ban</Label>

                  <Col md={8}>
                    <Input
                      type="select"
                      id="department"
                      name="department"
                      onChange={handleDepartmentChange}
                      value={department}
                    >
                      <option>Sale</option>
                      <option>HR</option>
                      <option>Marketing</option>
                      <option>IT</option>
                      <option>Finance</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label htmlFor="salaryscale" md={4}>
                    Hệ số lương
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="salaryscale"
                      name="salaryscale"
                      value={salaryScale}
                      onChange={handleSalaryScaleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="annualLeave" md={4}>
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="annualLeave"
                      name="annualLeave"
                      value={annualLeave}
                      onChange={handleAnnualLeaveChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="overTime" md={4}>
                    Số ngày đã làm thêm
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="overTime"
                      name="overTime"
                      value={overTime}
                      onChange={handleOverTimeChange}
                    />
                  </Col>
                </FormGroup>
                <Button
                  type="submit"
                  value="submit"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    );
  else return <div></div>;
}

const StaffDetail = (props) => {
  console.log(props);
  if (props.staff != null)
    return (
      <div className="container mt-2">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staff">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
        </Breadcrumb>
        <RenderStaff
          staff={props.staff}
          staffId={props.staffId}
          postUpdateStaff={props.postUpdateStaff}
        />
      </div>
    );
  else return <div></div>;
};

export default StaffDetail;
