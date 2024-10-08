import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";

import axios from "axios";
import { useState, useEffect } from "react";

const Starter = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mqtt-backend-api.onrender.com/api/data");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Helper function to determine the text color based on value
  const getTextColor = (value) => {
    return value < 0 ? "text-danger" : ""; // Return "text-danger" class for negative values
  };

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Discharge Pressure"
            earning={data.DisPr / 10 + " Bar"}
            icon="bi bi-wallet"
            color={getTextColor(data.DisPr / 10)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Temperature"
            earning={data.DisTr + "°"}
            icon="bi bi-thermometer-high"
            color={getTextColor(data.DisTr)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Cumulative Run Hours"
            earning={parseInt(data.CumUnload / 60 + data.CumLoad / 60) + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(parseInt(data.CumUnload / 60 + data.CumLoad / 60))}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Cumulative Load Hours"
            earning={parseInt(data.CumLoad / 60) + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(parseInt(data.CumLoad / 60))}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="Cumulative Unload Hours"
            earning={parseInt(data.CumUnload / 60) + " Hr"}
            icon="bi bi-lightning"
            color={getTextColor(parseInt(data.CumUnload / 60))}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-primary text-primary"
            title="Sales"
            subtitle="Air Filter Change Time"
            earning={data.RemAFCT + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(data.RemAFCT)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-black"
            title="Sales"
            subtitle="Oil Filter Change Time"
            earning={data.RemOFCT + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(data.RemOFCT)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Oil Sept Change Time"
            earning={data.RemOSCT + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(data.RemOSCT)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Sales"
            subtitle="Oil Change Time"
            earning={data.RemOCT + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(data.RemOCT)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Greesing Time"
            earning={data.RemRGT + " Hr"}
            icon="bi bi-hourglass"
            color={getTextColor(data.RemRGT)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="PowerVFD"
            earning={data.PowerVFD / 100 + " KW"}
            icon="bi bi-power"
            color={getTextColor(data.PowerVFD / 100)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="VoltageVFD"
            earning={data.VoltageVFD / 10}
            icon="bi bi-bag"
            color={getTextColor(data.VoltageVFD / 10)}
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="CurrentVFD"
            earning={(data.CurrentVFD / 100).toFixed(1) + " Amp"}
            icon="bi bi-lightning"
            color={getTextColor(data.CurrentVFD / 100)}
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/} 
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
