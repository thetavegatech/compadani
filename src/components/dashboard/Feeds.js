import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from 'react-apexcharts';
import axios from "axios";

const Feeds = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mqtt-backend-api.onrender.com/api/data`);
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

  const series = data.DisTr ? [data.DisTr] : [];

  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          name: {
            fontSize: '2rem',
            color: "black",
            offsetY: 120,
          },
          value: {
            offsetY: 60,
            fontSize: '30px',
            color: undefined,
            formatter: function (val) {
              return val + "° C";
            },
          },
        },
      },
    },
    colors: ["#ff4e00"],
   
    stroke: {
      dashArray: 3,
      // color: ["#FF0000"]
    },
    labels: ['Temperature'],
  };

  return (
    <Card style={{ height: "470px" }}>
      <CardBody style={{ marginTop: "2rem"  }}>
        <CardTitle tag="h5"  >Real Time Temperature</CardTitle>
        {series.length > 0 ? (
          <Chart options={options} series={series} type="radialBar" height={350} />
        ) : (
          <div>Loading...</div>
        )}
      </CardBody>
    </Card>
  );
};

export default Feeds;
