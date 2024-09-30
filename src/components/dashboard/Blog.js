import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,

  CardTitle,

} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>

      <CardImg alt="Card image cap" src={props.image} style={{ height: "200px", width: "280px" }} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        {/* <CardText className="mt-3">{props.text}</CardText> */}
        {/* <Button color={props.color}>Read More</Button> */}
      </CardBody>
    </Card>
  );
};

export default Blog;
