import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardImgOverlay,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalCommentOpen: false,
      rating: "",
      name: "",
      comment: "",
      touched: {
        name: false,
        comment: false,
      },
    };
    this.toggleModalComment = this.toggleModalComment.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  renderDish(dish) {
    console.log(dish);
    if (dish != null) {
      return (
        <Card>
          <CardImg src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  renderComments(comments) {
    console.log(comments);

    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    --{comment.author},{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
          <Button
            className="fa fa-pencil fa-lg"
            type="submit"
            color="outline-primary"
            onClick={this.toggleModalComment}
          >
            {" "}
            Submit Comment
          </Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  toggleModalComment() {
    this.setState({
      isModalCommentOpen: !this.state.isModalCommentOpen,
    });
  }

  handleComment(event) {
    this.toggleModalComment();
    alert(
      "raint: " +
        this.state.rating +
        ", name: " +
        this.state.name +
        ", comment: " +
        this.state.comment
    );
    event.preventDefault();
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

  validate(rating, name, comment) {
    const errors = {
      rating: "",
      name: "",
      comment: "",
    };
    if (this.state.touched.name && name.length < 3)
      errors.name = "Name should be >= 3 characters";
    else if (this.state.touched.name && name.length > 15)
      errors.name = "First Name should be <= 15 characters";

    if (this.state.touched.comment && comment === "")
      errors.comment = "Nhập comment";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.rating,
      this.state.name,
      this.state.comment
    );
    if (this.props.dish != null)
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(this.props.dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
              {this.renderComments(this.props.comments)}
            </div>
          </div>
          <Modal
            isOpen={this.state.isModalCommentOpen}
            toggle={this.toggleModalComment}
          >
            <ModalHeader toggle={this.toggleModalComment}>Login</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleComment}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    type="select"
                    id="rating"
                    name="rating"
                    value={this.state.rating}
                    valid={errors.rating === ""}
                    invalid={errors.rating !== ""}
                    onBlur={this.handleBlur("rating")}
                    onChange={this.handleInputChange}
                  >
                    <option defaultValue>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </Input>
                  <FormFeedback>{errors.rating}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <Input
                    type="textarea"
                    id="comment"
                    name="comment"
                    value={this.state.comment}
                    valid={errors.comment === ""}
                    invalid={errors.comment !== ""}
                    onBlur={this.handleBlur("comment")}
                    onChange={this.handleInputChange}
                  ></Input>
                  <FormFeedback>{errors.comment}</FormFeedback>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
  }
}
export default DishDetail;
