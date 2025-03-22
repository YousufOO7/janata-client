import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import ShowStockTable from "./ShowStockTable/ShowStockTable";

const StockChart = () => {
  const [data, setData] = useState([]);
  const [tradeCode, setTradeCode] = useState("1JANATAMF");
  const [tradeCodes, setTradeCodes] = useState([]);
  const [loading, setLoading] = useState(true);  // New loading state

  // Fetch available trade codes
  useEffect(() => {
    axios.get("http://localhost:5000/getAllStringStocks")
      .then(response => {
        // console.log("Trade Codes:", response.data);
        setTradeCodes(response.data);
        if (response.data.length > 0) {
          setTradeCode(response.data[0]); 
        }
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching trade codes:", error);
        setLoading(false);
      });
  }, []);

  // Fetch stock data when tradeCode changes
  useEffect(() => {
    if (tradeCode) {
      setLoading(true); // Start loading while fetching data
      axios.get(`http://localhost:5000/stocks/${tradeCode}`)
        .then(response => {
          // console.log("Stock Data:", response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [tradeCode]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
      <h2>Stock Market Visualization: {tradeCode}</h2>

      <label>Select Trade Code: </label>
      <select onChange={(e) => setTradeCode(e.target.value)} value={tradeCode}>
        {tradeCodes.length > 0 ? (
          tradeCodes.map(code => (
            <option key={code} value={code}>
              {code}
            </option>
          ))
        ) : (
          <option value="">No trade codes available</option>  // Handle empty data gracefully
        )}
      </select>

      {/* Line Chart for Close Price */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Bar Chart for Volume */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      {/* Show Stock Table Component */}
      <ShowStockTable tradeCode={tradeCode} />
    </div>
  );
};

export default StockChart;
