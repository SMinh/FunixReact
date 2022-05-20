import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  FormFeedback,
} from "reactstrap";
import moment from "moment";
import { Control, LocalForm, Errors } from "react-redux-form";

// import { Control, LocalForm, Errors, Field, reduxForm } from "react-redux-form";

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !val || val.length <= len;
// const minLength = (len) => (val) => val && val.length >= len;
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) =>
//   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class AddComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      //   search: "",
      //   staffs: this.props.staffs,
      //   isModalOpen: false,
      // id: "",
      name: "",
      doB: "",
      startDate: "",
      department: "Sale",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
      touched: {
        name: false,
        doB: false,
        startDate: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false,
      },
    };
  }

    handleBlur = (field) => (evt) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
    };

    validate(name, doB, startDate, salaryScale, annualLeave, overTime) {
      const errors = {
        name: "",
        doB: "",
        startDate: "",
        salaryScale: "",
        annualLeave: "",
        overTime: "",
      };

      if (this.state.touched.name && name === "") errors.name = "Nhập Họ và Tên";

      // if (this.state.touched.doB)
      //   errors.lastname = "Last Name should be >= 3 characters";

      if (this.state.touched.doB && doB === "") errors.doB = "Nhập ngày sinh";

      if (this.state.touched.startDate && startDate === "")
        errors.startDate = "Nhập ngày bắt đầu công việc";

      if (this.state.touched.salaryScale && salaryScale === "")
        errors.salaryScale = "Nhập salaryScale";

      // else if (this.state.touched.salaryScale && !isNaN(Number(startDate)))
      // errors.doB = "Hệ số lương là số";

      // if (this.state.touched.startDate && startDate === "") errors.doB = "Nhập ngày bắt đầu công việc";

      // if (this.state.touched.startDate && startDate === "") errors.doB = "Nhập ngày bắt đầu công việc";

      // if (
      //   this.state.touched.email &&
      //   email.split("").filter((x) => x === "@").length !== 1
      // )
      //   errors.email = "Email should contain a @";

      return errors;
    }

    handleInputChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value,
      });
    }

    handleAdd(event) {
      this.toggleModal();

      const staffList = this.getFromStorage("staffList");
      console.log("staffList", staffList);

      const data = {
        id: Number(this.state.id),
        name: this.state.name,
        doB: this.state.doB,
        startDate: this.state.startDate,
        department: this.state.department,
        salaryScale: Number(this.state.salaryScale),
        annualLeave: Number(this.state.annualLeave),
        overTime: this.state.overTime,
        image: "/assets/images/alberto.png",
      };
      console.log("data", data);
      console.log("localStorage", localStorage);
      staffList.push(data);

      this.saveToStorage("staffList", staffList);
      this.setState({
        name: "",
        doB: "",
        startDate: "",
        department: "Sale",
        salaryScale: "",
        annualLeave: "",
        overTime: "",
      });
      console.log("localStorage2", localStorage);

      event.preventDefault();
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }

    saveToStorage(key, value) {
      if (typeof Storage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        document.getElementById("content").innerHTML =
          "Sorry, your browser does not support web storage...";
      }
    }

    getFromStorage(key) {
      if (typeof Storage !== "undefined") {
        const result = JSON.parse(localStorage.getItem(key));
        return result;
      } else {
        document.getElementById("content").innerHTML =
          "Sorry, your browser does not support web storage...";
      }
    }

    removeFromStorage(key) {
      if (typeof Storage !== "undefined") {
        localStorage.removeItem(key);
      } else {
        document.getElementById("content").innerHTML =
          "Sorry, your browser does not support web storage...";
      }
    }

  render() {
    const errors = this.validate(this.state.name, this.state.salaryScale);
    console.log(this.getFromStorage("staffList"));
    if (this.getFromStorage("staffList") === null) {
      this.saveToStorage("staffList", this.state.staffs);
    }
    this.saveToStorage("staffList", this.state.staffs);
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
    const staffs = this.getFromStorage("staffList").map((staff) => {
    const staffsRender = this.getFromStorage("staffList").map((staff) => {
    console.log("render", this.getFromStorage("staffList"));
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
            <div className="d-flex justify-content-between">
              <div className="row">
                <h3>Nhân Viên</h3>
                <Button
                  outline
                  onClick={this.toggleModal}
                  className="fa fa-plus fa-lg ml-5"
                ></Button>
              </div>

              <div>
                <input
                  value={this.state.name}
                  type="text"
                  onChange={(e) => this.handleSearch(e)}
                />
                <Button
                  type="submit"
                  color="primary"
                  onClick={(e) => this.handleSearchButton(e)}
                >
                  Tìm
                </Button>
              </div>
            </div>

            <hr />
          </div>
          <div className="row">{staffsRender}</div>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
      <>
        Modal
        <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
        <ModalBody> 
        <LocalForm onSubmit={(values) => this.handleAdd(values)}> 
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Họ và Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Họ và Tên"
                    className="form-control"
                    validators={{
                      required,
                      // minLength: minLength(5),
                      // maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      // minLength: "Must be greater than 2 characters",
                      // maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Field
                    name="dob"
                    showTime={false}
                    component={renderDateTimePicker}
                  />
                  <Control.text
                    model=".doB"
                    id="doB"
                    name="doB"
                    // placeholder="Ngày sinh"
                    className="form-control"
                    validators={{
                      required,
                      // minLength: minLength(3),
                      // maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Required",
                      // minLength: "Must be greater than 2 characters",
                      // maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".startDate"
                    id="startDate"
                    name="startDate"
                    // placeholder="Ngày vào công ty"
                    className="form-control"
                    validators={{
                      required,
                      // minLength: minLength(3),
                      // maxLength: maxLength(15),
                      // isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Required",
                      // minLength: "Must be greater than 2 numbers",
                      // maxLength: "Must be 15 numbers or less",
                      // isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".department"
                    id="department"
                    name="department"
                    // placeholder="Email"
                    className="form-control"
                    validators={{
                      required,
                      // validEmail,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".department"
                    show="touched"
                    messages={{
                      required: "Required",
                      // validEmail: "Invalid Email Address",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    // placeholder="Ngày vào công ty"
                    className="form-control"
                    validators={{
                      required,
                      // minLength: minLength(3),
                      // maxLength: maxLength(15),
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Required",
                      // minLength: "Must be greater than 2 numbers",
                      // maxLength: "Must be 15 numbers or less",
                      isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    // placeholder="Ngày vào công ty"
                    className="form-control"
                    validators={{
                      required,
                      // minLength: minLength(3),
                      // maxLength: maxLength(15),
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      required: "Required",
                      // minLength: "Must be greater than 2 numbers",
                      // maxLength: "Must be 15 numbers or less",
                      isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    // placeholder="Ngày vào công ty"
                    className="form-control"
                    validators={{
                      required,
                      // minLength: minLength(3),
                      // maxLength: maxLength(15),
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      required: "Required",
                      // minLength: "Must be greater than 2 numbers",
                      // maxLength: "Must be 15 numbers or less",
                      isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>
            </LocalForm> 
        <Form onSubmit={this.handleAdd}>
        <FormGroup row>
                <Label htmlFor="id" md={4}>
                  ID
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="id"
                    name="id"
                    value={this.state.id}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                </Col>
              </FormGroup>/</>
        <FormGroup row>
              <Label htmlFor="name" md={4}>
                Họ và Tên
              </Label>
              <Col md={8}>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  valid={errors.name === ""}
                  invalid={errors.name !== ""}
                  onBlur={this.handleBlur("name")}
                  onChange={(e) => this.handleInputChange(e)}
                />
                <FormFeedback>{errors.name}</FormFeedback>
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
                  value={this.state.doB}
                  valid={errors.doB === ""}
                  invalid={errors.doB !== ""}
                  onBlur={this.handleBlur("doB")}
                  onChange={(e) => this.handleInputChange(e)}
                />
                {console.log(this.state.doB)}
                <FormFeedback>{errors.doB}</FormFeedback>
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
                  value={this.state.startDate}
                  valid={errors.startDate === ""}
                  invalid={errors.startDate !== ""}
                  onBlur={this.handleBlur("startDate")}
                  onChange={(e) => this.handleInputChange(e)}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={4}>Phòng ban</Label>

              <Col md={8}>
                <Input
                  type="select"
                  id="department"
                  name="department"
                  onChange={(e) => this.handleInputChange(e)}
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
              <Label htmlFor="salaryScale" md={4}>
                Hệ số lương
              </Label>
              <Col md={8}>
                <Input
                  type="text"
                  id="salaryScale"
                  name="salaryScale"
                  value={this.state.salaryScale}
                  valid={errors.salaryScale === ""}
                  invalid={errors.salaryScale !== ""}
                  onBlur={this.handleBlur("salaryScale")}
                  onChange={(e) => this.handleInputChange(e)}
                />
                <FormFeedback>{errors.salaryScale}</FormFeedback>
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
                  value={this.state.annualLeave}
                  onChange={(e) => this.handleInputChange(e)}
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
                  value={this.state.overTime}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </Col>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Thêm
            </Button>
          </Form>
        </ModalBody>
        </Modal>
      </>
        </div>
    );
  }
}
export default AddComponent;
