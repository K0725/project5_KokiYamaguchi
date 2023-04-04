import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function get_data({ payload, label, active }) {
  if (active) {
    return (
      <div className="get_data">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

function Charts() {
  const [data, setData] = useState([]);
  const [typesData, setTypesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
      const breweries = await response.json();
      const states = {};
      const types = {};

      breweries.forEach(brewery => {
        if (!states.hasOwnProperty(brewery.state)) {
          states[brewery.state] = 0;
        }
        states[brewery.state]++;

        if (!types.hasOwnProperty(brewery.brewery_type)) {
          types[brewery.brewery_type] = 0;
        }
        types[brewery.brewery_type]++;
      });

      const chartData = Object.entries(states).map(([name, count]) => ({ name, count }));
      const typesChartData = Object.entries(types).map(([name, count]) => ({ name, count }));

      setData(chartData);
      setTypesData(typesChartData);
    }

    fetchData();
  }, []);

  return (
    <div className="Charts">
      <h3>Types of Brewery</h3>
      <LineChart width={800} height={300} data={typesData}>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" stroke="#8884d8"/>
        <YAxis />
        <Tooltip content={<get_data />}/>
      </LineChart>

      <h3>States of Brewery</h3>
      <LineChart width={800} height={300} data={data}>
        <Line type="monotone" dataKey="count" stroke="#0784d0" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" stroke="#0784d0"/>
        <YAxis />
        <Tooltip content={<get_data />}/>
      </LineChart>
    </div>
  );
}

export default Charts;