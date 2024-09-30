import { Card, CardBody, CardSubtitle } from "reactstrap";
import PowerVFD from "./Chart/PowerVFD";


const ProjectTables = () => {
  return (
    <div>
      <Card style={{width: '100%'}}>
        <CardBody>
          {/* <CardTitle tag="h5">Project Listing</CardTitle> */}
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Real Time PowerVFD
          </CardSubtitle>
          <PowerVFD />
         
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
