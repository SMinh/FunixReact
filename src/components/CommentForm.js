import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    this.props.toggleModalComment();
    // event.preventDefault();
  }

  render() {
    return (
      //   <div className="container">
      //     <div className="row row-content">
      //       <div className="col-12 col-md-9">
      <Modal
        isOpen={this.props.isCommentForm}
        toggle={this.props.toggleModalComment}
      >
        <ModalHeader toggle={this.props.toggleModalComment}>Login</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="rating" md={4}>
                Last Name
              </Label>
              <Col md={8}>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                  defaultValue={5}
                >
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </Control.select>
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="name" md={4}>
                Contact Tel.
              </Label>
              <Col md={8}>
                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                    isNumber,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 numbers",
                    maxLength: "Must be 15 numbers or less",
                  }}
                />
              </Col>
            </Row>

            {/* <Row className="form-group">
              <Col md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label check>
                    <Control.checkbox
                      model=".agree"
                      name="agree"
                      className="form-check-input"
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Control.select
                  model=".contactType"
                  name="contactType"
                  className="form-control"
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Control.select>
              </Col>
            </Row> */}
            <Row className="form-group">
              <Label htmlFor="comment" md={4}>
                Your Feedback
              </Label>
              <Col md={8}>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="12"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}

export default Contact;
