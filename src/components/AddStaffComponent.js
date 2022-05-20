import React, { Component } from "react";
import { FieldDatePicker } from "./DateComponent";
import DatePicker from "react-datepicker";

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
import { Control, LocalForm, Errors, Field } from "react-redux-form";

const required = (val) => val && val.length;

class AddStaffComponent extends Component {
  constructor(props) {
    super(props);

    // this.toggleModal = this.toggleModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
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

  handleAdd(data, resetForm, invalidateForm) {
    // this.props.toggleModal();
    alert(
      "123"
      // "Username: " +
      //   this.username.value +
      //   " Password: " +
      //   this.password.value +
      //   " Remember: " +
      //   this.remember.checked
    );
    resetForm.preventDefault();
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  validate(name, doB, startDate, salaryScale, annualLeave, overTime) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
    };
    if (this.state.touched.salaryScale && salaryScale === "")
      errors.salaryScale = "Nhập Họ và Tên";

    if (this.state.touched.name && name === "") errors.name = "Nhập Họ và Tên";

    // if (this.state.touched.doB)
    //   errors.lastname = "Last Name should be >= 3 characters";

    // if (this.state.touched.doB && doB === "") errors.doB = "Nhập ngày sinh";

    // if (this.state.touched.startDate && startDate === "")
    //   errors.startDate = "Nhập ngày bắt đầu công việc";

    // if (this.state.touched.salaryScale && salaryScale === "")
    //   errors.salaryScale = "Nhập salaryScale";

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

  render() {
    const errors = this.validate(this.state.salaryScale, this.state.name);
    return (
      <React.Fragment>
        <ModalHeader>Thêm Nhân Viên</ModalHeader>
        <ModalBody>
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
            </FormGroup>
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
      </React.Fragment>
    );
  }
}
export default AddStaffComponent;
