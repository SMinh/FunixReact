import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  FormFeedback,
} from "reactstrap";

let staffList;

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      search: "",
      staffs: this.props.staffs,
      isModalOpen: false,
      name: "",
      doB: "",
      startDate: "",
      department: "Sale",
      salaryscale: "",
      annualLeave: "",
      overTime: "",
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
        salaryscale: false,
        annualLeave: false,
        overTime: false,
      },
    };
  }
  // Tìm Nhân viên
  handleSearchButton = (e) => {
    e.preventDefault();
    const nameSearch = e.target.nameSearch.value;
    this.setState({
      search: nameSearch,
    });
  };

  // Thêm Nhân viên
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAdd(e) {
    console.log("staffList old", staffList);

    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryscale: Number(this.state.salaryscale),
      startDate: this.state.startDate,
      department: this.state.department,
      annualLeave: Number(this.state.annualLeave),
      overTime: Number(this.state.overTime),
      salary: "",
      image: "/assets/images/alberto.png",
    };

    staffList.push(newStaff);
    localStorage.setItem("staffList", JSON.stringify(staffList));
    this.setState({
      name: "",
      doB: "",
      startDate: "",
      department: "Sale",
      salaryscale: "",
      annualLeave: "",
      overTime: "",
    });
    console.log("staffList new", staffList);

    this.toggleModal();
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(
    name,
    doB,
    startDate,
    department,
    salaryscale,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      department: "",
      salaryscale: "",
      annualLeave: "",
      overTime: "",
    };
    if (this.state.touched.name && name === "") errors.name = "Nhập Họ và Tên";

    if (this.state.touched.startDate && startDate === "")
      errors.startDate = "Nhập Ngày bắt đầu công việc";

    if (this.state.touched.doB && doB === "") errors.doB = "Nhập Ngày sinh";

    if (this.state.touched.salaryscale && salaryscale === "")
      errors.salaryscale = "Nhập hệ số lương";
    else if (this.state.touched.salaryscale && isNaN(Number(salaryscale)))
      errors.salaryscale = "Hệ số lương là số";

    if (this.state.touched.annualLeave && annualLeave === "")
      errors.annualLeave = "Nhập số ngày phép";
    else if (this.state.touched.annualLeave && isNaN(Number(annualLeave)))
      errors.annualLeave = "Số ngày phép là số";

    if (this.state.touched.overTime && overTime === "")
      errors.overTime = "Nhập thời gian làm thêm";
    else if (this.state.touched.overTime && isNaN(Number(overTime)))
      errors.overTime = "Thời gian làm thêm là số";

    return errors;
  }

  render() {
    if (JSON.parse(localStorage.getItem("staffList")) === null) {
      staffList = this.state.staffs;
    } else staffList = JSON.parse(localStorage.getItem("staffList"));
    console.log(
      "staffList render",
      JSON.parse(localStorage.getItem("staffList"))
    );
    console.log("staffList", staffList);

    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.department,
      this.state.salaryscale,
      this.state.annualLeave,
      this.state.overTime
    );

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

    const staffsRender = staffList
      .filter((staff) => {
        if (this.state.search === "") return staff;
        else if (
          staff.name
            .toLowerCase()
            .includes(this.state.search.toLocaleLowerCase())
        )
          return staff;
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

            <Form onSubmit={this.handleSearchButton}>
              <input
                // value={this.state.search}
                type="text"
                name="nameSearch"
                // onChange={(e) => this.handleSearchChange(e)}
              />
              <Button
                type="submit"
                color="primary"
                // onClick={(e) => this.handleSearchButton(e)}
              >
                Tìm
              </Button>
            </Form>
          </div>

          <hr />
        </div>
        <div className="row">{staffsRender}</div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Thêm Nhân Viên</ModalHeader>
          <ModalBody>
            <Form action="/" onSubmit={this.handleAdd}>
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
                <Label htmlFor="salaryscale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryscale"
                    name="salaryscale"
                    value={this.state.salaryscale}
                    valid={errors.salaryscale === ""}
                    invalid={errors.salaryscale !== ""}
                    onBlur={this.handleBlur("salaryscale")}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                  <FormFeedback>{errors.salaryscale}</FormFeedback>
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
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
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
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
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
  }
}
export default Staffs;
