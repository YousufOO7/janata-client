

const StockForm = ({ newStock, handleNewStockChange, handleAddStock }) => {
  return (
    <form onSubmit={handleAddStock} className="grid grid-cols-2 gap-4">
      <input
        type="date"
        name="date"
        value={newStock.date}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        name="trade_code"
        value={newStock.trade_code}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        name="open"
        placeholder="Open"
        value={newStock.open}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        step="0.01"
        required
      />
      <input
        type="number"
        name="close"
        placeholder="Close"
        value={newStock.close}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        step="0.01"
        required
      />
      <input
        type="number"
        name="high"
        placeholder="High"
        value={newStock.high}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        step="0.01"
        required
      />
      <input
        type="number"
        name="low"
        placeholder="Low"
        value={newStock.low}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        step="0.01"
        required
      />
      <input
        type="number"
        name="volume"
        placeholder="Volume"
        value={newStock.volume}
        onChange={handleNewStockChange}
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Stock
      </button>
    </form>
  );
};

export default StockForm;
