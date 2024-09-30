import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card    >
      {/* <small>Remaining</small> */}
      
      <CardBody >
        <div className="d-flex">
          <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
            <i className={props.icon}></i>
          </div>
          <div className="ms-3">
            <h3 className={`mb-0 font-weight-bold  ${props.color}` } >{props.earning}</h3>
            <small className="font-weight-bold "  style={{ fontWeight:"bold", color:"#120A8F"}}>
              {props.subtitle}
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
