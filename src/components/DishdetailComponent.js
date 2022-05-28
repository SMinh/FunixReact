import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardImgOverlay,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Loading } from "./LoadingComponent";

const DishDetail = (props) => {
  const [isCommentForm, setIsCommentForm] = useState(false);

  const toggleModalComment = () => {
    setIsCommentForm(!isCommentForm);
  };

  console.log(props);

  function RenderDish(dish) {
    console.log(dish);
    console.log({ dish });

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

  function RenderComments({ comments, addComment, dishId }) {
    console.log(comments);
    console.log(addComment);
    console.log(dishId);

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
          <Button color="primary" onClick={toggleModalComment}>
            <span className="fa fa-edit fa-lg"></span> Submit
          </Button>
          <CommentForm
            isCommentForm={isCommentForm}
            toggleModalComment={toggleModalComment}
            dishId={dishId}
            addComment={addComment}
          />
          {console.log({ addComment })}
          {console.log({ dishId })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
};
export default DishDetail;
