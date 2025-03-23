import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Modal from "../../Shared/Modal";
import Swal from "sweetalert2";
import StockForm from "../../Shared/StockForm";

const ShowStockTable = ({ tradeCode }) => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    date: "",
    trade_code: tradeCode || "",
    open: "",
    close: "",
    high: "",
    low: "",
    volume: "",
  });



  // Handle Input Change for new stock
  const handleNewStockChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prevStock) => ({
      ...prevStock,
      [name]: value,
    }));
  };

  // Handle Add Stock Submission
  const handleAddStock = async (e) => {
    e.preventDefault();

    if (!newStock.date) {
      Swal.fire({
        title: "Error!",
        text: "Please select a valid date.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/stocks", newStock);
      if (response.status === 201) {
        setStocks((prevStocks) => [...prevStocks, response.data]);
        Swal.fire({
          title: "Success!",
          text: "Stock added successfully.",
          icon: "success",
        });

        // Reset form
        setNewStock({
          date: "",
          trade_code: tradeCode || "",
          open: "",
          close: "",
          high: "",
          low: "",
          volume: "",
        });

        fetchStocks();
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error adding the stock.",
        icon: "error",
      });
    }
  };



  // Function to fetch stocks
  const fetchStocks = () => {
    axios
      .get(`http://localhost:5000/stocks/${tradeCode}`)
      .then((response) => setStocks(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Fetch stocks on component mount and when tradeCode changes
  useEffect(() => {
    fetchStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Edit Click
  const handleEdit = (stock) => {
    setSelectedStock({ ...stock });
    setIsModalOpen(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStock((prevStock) => ({
      ...prevStock,
      [name]: value,
    }));
  };

  // Handle Save Changes
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/stocks/${selectedStock.id}`, selectedStock);
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.id === selectedStock.id ? selectedStock : stock
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle Delete Click
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/stocks/${id}`);

          setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your stock has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting stock:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the stock.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="my-10 px-4">
      <h2 className="text-center text-4xl font-semibold underline">
        Add New Stock Data
      </h2>

      <div className="mt-5">
        <StockForm
          newStock={newStock}
          handleNewStockChange={handleNewStockChange}
          handleAddStock={handleAddStock}
        />
      </div>


      <h2 className="text-center text-4xl font-semibold underline mt-5">
        Stock Market Data ({stocks.length})
      </h2>

      <div className="overflow-x-auto my-10">
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Trade Code</th>
              <th className="border px-4 py-2">Open</th>
              <th className="border px-4 py-2">Close</th>
              <th className="border px-4 py-2">High</th>
              <th className="border px-4 py-2">Low</th>
              <th className="border px-4 py-2">Volume</th>
              <th className="border px-4 py-2">Update</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id} className="bg-white">
                <td className="border px-4 py-2">
                  {stock.date ? format(new Date(stock.date), "yyyy-MM-dd") : "N/A"}
                </td>

                <td className="border px-4 py-2">{stock.trade_code || "N/A"}</td>

                <td className="border px-4 py-2">
                  {stock.open ? Number(stock.open).toFixed(2) : stock.open || "N/A"}
                </td>

                <td className="border px-4 py-2">
                  {stock.close ? Number(stock.close).toFixed(2) : stock.close || "N/A"}
                </td>

                <td className="border px-4 py-2">
                  {stock.high ? Number(stock.high).toFixed(2) : stock.high || "N/A"}
                </td>

                <td className="border px-4 py-2">
                  {stock.low ? Number(stock.low).toFixed(2) : stock.low || "N/A"}
                </td>

                <td className="border px-4 py-2">
                  {stock.volume ? Number(stock.volume).toLocaleString() : stock.volume || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(stock)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedStock && (
        <Modal
          selectedStock={selectedStock}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ShowStockTable;
