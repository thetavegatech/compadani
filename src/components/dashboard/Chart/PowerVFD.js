import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const PowerVFD = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: []
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        endingShape: 'rounded'
      }
    },
    colors: ['#F50555'],
    tooltip: {
      theme: "dark"
    },
    title: {
      text: 'PowerVFD',
      align: 'left',
      style: {
        fontSize: '20px'
      }
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'PowerVFD',
      data: []
    }
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://mqtt-backend-api.onrender.com/api/powerVFD");
      const data = response.data;

      const PowerVFDData = data.map(item => item.PowerVFD);
      const timestampData = data.map(item => new Date(item.timestamp).toLocaleString());

      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          categories: timestampData
        }
      }));

      setSeries([
        {
          name: 'PowerVFD',
          data: PowerVFDData.map(item => item / 100)
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Chart options={options} series={series} type='bar' height={500} />
    </div>
  );
};

export default PowerVFD;
