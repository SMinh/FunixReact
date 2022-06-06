import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComp";
import {
  Card,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";

const deptNames = {
  Sale: "Dept01",
  HR: "Dept02",
  Marketing: "Dept03",
  IT: "Dept04",
  Finance: "Dept05",
};

const StaffsList = (props) => {
  const [nameSearch, setNameSearch] = useState("");
  const [name, setName] = useState("");
  const [doB, setDoB] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("Sale");
  const [salaryscale, setSalaryscale] = useState("");
  const [annualLeave, setAnnualLeave] = useState("");
  const [overTime, setOverTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchTextChange = (e) => {
    setNameSearch(e.target.value);
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

  const handleSalaryscaleChange = (e) => {
    setSalaryscale(e.target.value);
  };

  const handleOverTimeChange = (e) => {
    setOverTime(e.target.value);
  };

  const handleAnnualLeaveChange = (e) => {
    setAnnualLeave(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAdd = (e) => {
    if (window.confirm("You sure to add this Staff"))
      props.postStaff(
        props.staffs.length,
        name,
        doB,
        startDate,
        deptNames[department],
        salaryscale,
        annualLeave,
        overTime
      );
    toggleModal();
    e.preventDefault();
  };

  const handleDelete = (id) => {
    console.log("delete", id);
    if (window.confirm("You sure to add this Staff")) props.postDeleteStaff(id);
    // toggleModalDel();
  };

  function RenderStaff({ staff }) {
    return (
      <Card>
        <Link to={`/staff/${staff.id}`}>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <h5 className="text-link">{staff.name}</h5>
        </Link>
        <Button color="danger" onClick={() => handleDelete(staff.id)}>
          Delete
        </Button>
      </Card>
    );
  }
  const staffsList = props.staffs
    .filter((staff) => {
      if (nameSearch === "") return staff;
      else if (
        staff.name.toLowerCase().includes(nameSearch.toLocaleLowerCase())
      )
        return staff;
      return 0;
    })
    .map((staff) => {
      return (
        <Card
          key={staff.id}
          className="text-dark text-center col-6 col-md-4 col-lg-2 p-1"
        >
          <RenderStaff staff={staff} />
        </Card>
      );
    });
  if (props.staffsLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.staffsErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.staffsErrMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div className="row">
              <h3>Nhân Viên</h3>
              <Button
                outline
                onClick={toggleModal}
                className="fa fa-plus fa-lg ml-5"
              ></Button>
            </div>
            <input
              placeholder="Search ..."
              type="text"
              name="nameSearch"
              onChange={handleSearchTextChange}
            />
          </div>

          <hr />
        </div>
        <div className="row">{staffsList}</div>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalHeader>Thêm Nhân Viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleAdd}>
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
                    value={salaryscale}
                    onChange={handleSalaryscaleChange}
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
              <Button type="submit" value="submit" color="primary">
                Thêm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
};

export default StaffsList;
