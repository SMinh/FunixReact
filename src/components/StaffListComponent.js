import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddStaffComponent from "./AddStaffComponent";
import Contact from "./ContactComponent";
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

const datePicker = ({
  input,
  label,
  type,
  className,
  selected,
  meta: { touched, error },
}) => (
  <div>
    <div>
      <DatePicker
        {...input}
        selected={selected}
        placeholder={label}
        type={type}
        className={className}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      {touched && error && <span className="error_field">{error}</span>}
    </div>
  </div>
);

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      search: "",
      staffs: this.props.staffs,
      isModalOpen: false,
    };
  }
  // Search
  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSearchButton = () => {
    console.log(this);
    this.setState({
      staffs: this.props.staffs.filter((staff) =>
        staff.name.includes(this.state.search)
      ),
    });
  };

  // Thêm Nhân viên
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

  render() {
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

    const staffsRender = this.state.staffs.map((staff) => {
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
                value={this.state.search}
                type="text"
                onChange={(e) => this.handleSearchChange(e)}
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
          <Contact />
        </Modal>
      </div>
    );
  }
}
export default Staffs;
