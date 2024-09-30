import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SalesChart = () => {
  const [option, setOption] = useState({
    chart: {
      id: "apexchart-example"
    },
    xaxis: {
      categories: []
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#F50555', '#6078ea', '#6094ea']
      }
    },
    tooltip: {
      theme: "dark"
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'series-1',
      data: [],
    }
  ]);

  const fetchData = () => {
    axios.get("https://mqtt-backend-api.onrender.com/api/CurrentVFD")   //"https://mqtt-backend-api.onrender.com/api/data"
      .then(response => {
        const CurrentVFD = [];
        const timestamp = [];

        response.data.forEach(item => {
          CurrentVFD.push(item.CurrentVFD);
          timestamp.push(new Date(item.timestamp).toLocaleString()); // Format the timestamp
        });

        const arr100 = CurrentVFD.map(item => item / 100);

        setOption(prevOption => ({
          ...prevOption,
          xaxis: {
            categories: timestamp
          }
        }));

        setSeries([
          {
            name: 'CurrentVFD ',
            data: arr100
          }
        ]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Current VFD</CardTitle>
        <Chart
          type="area"
          width="100%"
          height="392"
          options={option}
          series={series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
