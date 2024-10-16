import { Card, CardBody, Col, Row, Table, Spinner } from "reactstrap";
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


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aggregatedData, setAggregatedData] = useState({
    VoltageVFD: { high: null, low: null, average: null },
    CurrentVFD: { high: null, low: null, average: null },
    DisTr: { high: null, low: null, average: null },
    DisPr: { high: null, low: null, average: null },
    PowerVFD: { high: null, low: null, average: null },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mqtt-backend-api.onrender.com/api/getcurrentdaydatafivepara');
      setData(response.data);
      setLoading(false);
      calculateAggregates(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching data.');
      setLoading(false);
    }
  };

  const calculateAggregates = (data) => {
    if (data.length === 0) return;

    const initialAggregates = {
      VoltageVFD: { high: Number.NEGATIVE_INFINITY, low: Number.POSITIVE_INFINITY, sum: 0, count: 0 },
      CurrentVFD: { high: Number.NEGATIVE_INFINITY, low: Number.POSITIVE_INFINITY, sum: 0, count: 0 },
      DisTr: { high: Number.NEGATIVE_INFINITY, low: Number.POSITIVE_INFINITY, sum: 0, count: 0 },
      DisPr: { high: Number.NEGATIVE_INFINITY, low: Number.POSITIVE_INFINITY, sum: 0, count: 0 },
      PowerVFD: { high: Number.NEGATIVE_INFINITY, low: Number.POSITIVE_INFINITY, sum: 0, count: 0 },
    };

    const aggregates = data.reduce((acc, item) => {
      const voltageVFD = Number(item.VoltageVFD);
      const currentVFD = Number(item.CurrentVFD);
      const disTr = Number(item.DisTr);
      const disPr = Number(item.DisPr);
      const powerVFD = Number(item.PowerVFD);

      if (!isNaN(voltageVFD)) {
        acc.VoltageVFD.high = Math.max(acc.VoltageVFD.high, voltageVFD);
        acc.VoltageVFD.low = Math.min(acc.VoltageVFD.low, voltageVFD);
        acc.VoltageVFD.sum += voltageVFD;
        acc.VoltageVFD.count++;
      }

      if (!isNaN(currentVFD)) {
        acc.CurrentVFD.high = Math.max(acc.CurrentVFD.high, currentVFD);
        acc.CurrentVFD.low = Math.min(acc.CurrentVFD.low, currentVFD);
        acc.CurrentVFD.sum += currentVFD;
        acc.CurrentVFD.count++;
      }

      if (!isNaN(disTr)) {
        acc.DisTr.high = Math.max(acc.DisTr.high, disTr);
        acc.DisTr.low = Math.min(acc.DisTr.low, disTr);
        acc.DisTr.sum += disTr;
        acc.DisTr.count++;
      }

      if (!isNaN(disPr)) {
        acc.DisPr.high = Math.max(acc.DisPr.high, disPr);
        acc.DisPr.low = Math.min(acc.DisPr.low, disPr);
        acc.DisPr.sum += disPr;
        acc.DisPr.count++;
      }

      if (!isNaN(powerVFD)) {
        acc.PowerVFD.high = Math.max(acc.PowerVFD.high, powerVFD);
        acc.PowerVFD.low = Math.min(acc.PowerVFD.low, powerVFD);
        acc.PowerVFD.sum += powerVFD;
        acc.PowerVFD.count++;
      }

      return acc;
    }, initialAggregates);

    setAggregatedData({
      VoltageVFD: {
        high: aggregates.VoltageVFD.high !== Number.NEGATIVE_INFINITY ? aggregates.VoltageVFD.high : null,
        low: aggregates.VoltageVFD.low !== Number.POSITIVE_INFINITY ? aggregates.VoltageVFD.low : null,
        average: aggregates.VoltageVFD.count > 0 ? (aggregates.VoltageVFD.sum / aggregates.VoltageVFD.count).toFixed(2) : null,
      },
      CurrentVFD: {
        high: aggregates.CurrentVFD.high !== Number.NEGATIVE_INFINITY ? aggregates.CurrentVFD.high : null,
        low: aggregates.CurrentVFD.low !== Number.POSITIVE_INFINITY ? aggregates.CurrentVFD.low : null,
        average: aggregates.CurrentVFD.count > 0 ? (aggregates.CurrentVFD.sum / aggregates.CurrentVFD.count).toFixed(2) : null,
      },
      DisTr: {
        high: aggregates.DisTr.high !== Number.NEGATIVE_INFINITY ? aggregates.DisTr.high : null,
        low: aggregates.DisTr.low !== Number.POSITIVE_INFINITY ? aggregates.DisTr.low : null,
        average: aggregates.DisTr.count > 0 ? (aggregates.DisTr.sum / aggregates.DisTr.count).toFixed(2) : null,
      },
      DisPr: {
        high: aggregates.DisPr.high !== Number.NEGATIVE_INFINITY ? aggregates.DisPr.high : null,
        low: aggregates.DisPr.low !== Number.POSITIVE_INFINITY ? aggregates.DisPr.low : null,
        average: aggregates.DisPr.count > 0 ? (aggregates.DisPr.sum / aggregates.DisPr.count).toFixed(2) : null,
      },
      PowerVFD: {
        high: aggregates.PowerVFD.high !== Number.NEGATIVE_INFINITY ? aggregates.PowerVFD.high : null,
        low: aggregates.PowerVFD.low !== Number.POSITIVE_INFINITY ? aggregates.PowerVFD.low : null,
        average: aggregates.PowerVFD.count > 0 ? (aggregates.PowerVFD.sum / aggregates.PowerVFD.count).toFixed(2) : null,
      },
    });
  };

  useEffect(() => {
    fetchData();
    // Set an interval to fetch data every minute (60000 milliseconds)
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount





  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h4>{error}</h4>
      </div>
    );
  }


  return (
    <div>
      {/***Top Cards***/}
      <Row>
      <Col sm="6" lg="4">
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="circle-box lg-box d-inline-block" style={{ background: "#D4E6F1" }}>
                <i className="bi bi-wallet" style={{ color: "#2E86C1" }}></i>
              </div>
              <div className="ms-3" style={{ marginBottom: "1rem" }}>
                <h3 className='mb-0 font-weight-bold' style={{ color: "black" }}>
                {data.DisPr / 10 + " Bar"}
                </h3>
                <small className="font-weight-bold" style={{ fontWeight: "bold", color: "#120A8F" }}>
                Discharge Pressure
                </small>
              </div>
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ color: "#FF0000" }}>High: {aggregatedData.DisPr.high/10 || 'N/A'}</th>
                  <th style={{ color: "#0a2351" }}>Average: {(aggregatedData.DisPr.average/10).toFixed(2) || 'N/A'}</th>
                  <th style={{ color: "#0FB814" }}>Low: {aggregatedData.DisPr.low/10 || 'N/A'}</th>
                </tr>
              </thead>
            </Table>
          </CardBody>
        </Card>
      </Col>
        
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Discharge Pressure"
            earning={data.DisPr / 10 + " Bar"}
            icon="bi bi-wallet"
            color={getTextColor(data.DisPr / 10)}
          />
        </Col> */}
         <Col sm="6" lg="4">
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="circle-box lg-box d-inline-block" style={{ background: "#D4E6F1" }}>
                <i className="bi bi-wallet" style={{ color: "#2E86C1" }}></i>
              </div>
              <div className="ms-3" style={{ marginBottom: "1rem" }}>
                <h3 className='mb-0 font-weight-bold' style={{ color: "black" }}>
                {data.DisTr + "°"}
                </h3>
                <small className="font-weight-bold" style={{ fontWeight: "bold", color: "#120A8F" }}>
                Temperature
                </small>
              </div>
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ color: "#FF0000" }}>High: {aggregatedData.DisTr.high || 'N/A'}</th>
                  <th style={{ color: "#0a2351" }}>Average: {aggregatedData.DisTr.average || 'N/A'}</th>
                  <th style={{ color: "#0FB814" }}>Low: {aggregatedData.DisTr.low || 'N/A'}</th>
                </tr>
              </thead>
            </Table>
          </CardBody>
        </Card>
      </Col>
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Temperature"
            earning={data.DisTr + "°"}
            icon="bi bi-thermometer-high"
            color={getTextColor(data.DisTr)}
          />
        </Col> */}
        <Col sm="6" lg="4">
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="circle-box lg-box d-inline-block" style={{ background: "#D4E6F1" }}>
                <i className="bi bi-wallet" style={{ color: "#2E86C1" }}></i>
              </div>
              <div className="ms-3" style={{ marginBottom: "1rem" }}>
                <h3 className='mb-0 font-weight-bold' style={{ color: "black" }}>
                {data.VoltageVFD / 10}
                </h3>
                <small className="font-weight-bold" style={{ fontWeight: "bold", color: "#120A8F" }}>
                  Voltage VFD
                </small>
              </div>
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ color: "#FF0000" }}>High: {aggregatedData.VoltageVFD.high/10 || 'N/A'}</th>
                  <th style={{ color: "#0a2351" }}>Average: {aggregatedData.VoltageVFD.average/10 || 'N/A'}</th>
                  <th style={{ color: "#0FB814" }}>Low: {aggregatedData.VoltageVFD.low/10 || 'N/A'}</th>
                </tr>
              </thead>
            </Table>
          </CardBody>
        </Card>
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
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="PowerVFD"
            earning={data.PowerVFD / 100 + " KW"}
            icon="bi bi-power"
            color={getTextColor(data.PowerVFD / 100)}
          />
        </Col> */}
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="VoltageVFD"
            earning={data.VoltageVFD / 10}
            icon="bi bi-bag"
            color={getTextColor(data.VoltageVFD / 10)}
          />
        </Col> */}
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="CurrentVFD"
            earning={(data.CurrentVFD / 100).toFixed(1) + " Amp"}
            icon="bi bi-lightning"
            color={getTextColor(data.CurrentVFD / 100)}
          />
        </Col> */}
        <Col sm="6" lg="4">
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="circle-box lg-box d-inline-block" style={{ background: "#D4E6F1" }}>
                <i className="bi bi-wallet" style={{ color: "#2E86C1" }}></i>
              </div>
              <div className="ms-3" style={{ marginBottom: "1rem" }}>
                <h3 className='mb-0 font-weight-bold' style={{ color: "black" }}>
                {data.PowerVFD / 100 + " KW"}
                </h3>
                <small className="font-weight-bold" style={{ fontWeight: "bold", color: "#120A8F" }}>
                  Power VFD
                </small>
              </div>
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ color: "#FF0000" }}>High: {(aggregatedData.PowerVFD.high/100).toFixed(2) || 'N/A'}</th>
                  <th style={{ color: "#0a2351" }}>Average: {(aggregatedData.PowerVFD.average/100).toFixed(2) || 'N/A'}</th>
                  <th style={{ color: "#0FB814" }}>Low: {(aggregatedData.PowerVFD.low/100).toFixed(2) || 'N/A'}</th>
                </tr>
              </thead>
            </Table>
          </CardBody>
        </Card>
      </Col>
        <Col sm="6" lg="4">
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="circle-box lg-box d-inline-block" style={{ background: "#D4E6F1" }}>
                <i className="bi bi-wallet" style={{ color: "#2E86C1" }}></i>
              </div>
              <div className="ms-3" style={{ marginBottom: "1rem" }}>
                <h3 className='mb-0 font-weight-bold' style={{ color: "black" }}>
                {(data.CurrentVFD / 100).toFixed(1) + " Amp"}
                </h3>
                <small className="font-weight-bold" style={{ fontWeight: "bold", color: "#120A8F" }}>
                  Current VFD
                </small>
              </div>
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ color: "#FF0000" }}>High: {(aggregatedData.CurrentVFD.high/100).toFixed(2) || 'N/A'}</th>
                  <th style={{ color: "#0a2351" }}>Average: {(aggregatedData.CurrentVFD.average/100).toFixed(2) || 'N/A'}</th>
                  <th style={{ color: "#0FB814" }}>Low: {(aggregatedData.CurrentVFD.low/100).toFixed(2) || 'N/A'}</th>
                </tr>
              </thead>
            </Table>
          </CardBody>
        </Card>
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
