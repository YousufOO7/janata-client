

const Modal = ({ selectedStock, handleChange, handleSave, handleCloseModal }) => {
  return (
    <div>
      {/* DaisyUI Modal */}
      <input type="checkbox" id="edit-stock-modal" className="modal-toggle" checked={true} readOnly />
      <div className="modal">
        <div className="modal-box relative">
          <h2 className="text-xl font-bold mb-4">Edit Stock: {selectedStock.trade_code}</h2>
          
          <div className="grid gap-2">
            <label className="font-bold">Date:</label>
            <input
              type="date"
              name="date"
              value={selectedStock.date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-bold">Open:</label>
            <input
              type="number"
              name="open"
              value={selectedStock.open}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-bold">Close:</label>
            <input
              type="number"
              name="close"
              value={selectedStock.close}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-bold">High:</label>
            <input
              type="number"
              name="high"
              value={selectedStock.high}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-bold">Low:</label>
            <input
              type="number"
              name="low"
              value={selectedStock.low}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-bold">Volume:</label>
            <input
              type="number"
              name="volume"
              value={selectedStock.volume}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex justify-between mt-4">
            {/* Close button */}
            <label
              htmlFor="edit-stock-modal"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              onClick={handleCloseModal} // Call the close function
            >
              Close
            </label>

            {/* Save button */}
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>

          {/* Overlay close when clicked outside */}
          <label htmlFor="edit-stock-modal" className="modal-backdrop"></label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
