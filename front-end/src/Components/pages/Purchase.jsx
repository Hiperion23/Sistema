import React, { useState, useEffect } from 'react';

function Purchase() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    idPurchase: '',
    idSupplier: '',
    purchaseDate: '',
    totalAmount: '',
    status: '',
  });

  const handleShow = () => {
    setShowButton(false);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowButton(true);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handleCreatePurchase = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/PurchaseController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        console.log('Purchase created successfully');
        handleClose();
      } else {
        console.error('Error creating purchase');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {showButton && (
        <button
          type="button"
          className="float-right p-2 mt-4 text-white bg-pink-900 border border-pink-700 rounded"
          onClick={handleShow}
        >
          Create new Purchase
        </button>
      )}

      {showForm && (
        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white border border-pink-700 rounded-md shadow-md top-1/2 left-1/2 modal">
          <div className="p-8 modal-content">
            <h5 className="mb-4 text-lg font-bold">Purchase Form</h5>
            <form id="createPurchaseForm" className="flex flex-col">
              <div className="flex mb-6">
                <label htmlFor="idPurchase" className="mr-2 form-label">
                  Purchase ID
                </label>
                <input
                  type="text"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="idPurchase"
                  name="idPurchase"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex mb-6">
                <label htmlFor="idSupplier" className="mr-2 form-label">
                  Supplier ID
                </label>
                <input
                  type="text"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="idSupplier"
                  name="idSupplier"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex mb-6">
                <label htmlFor="purchaseDate" className="mb-0 mr-2 form-label">
                  Purchase Date
                </label>
                <input
                  type="date"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="purchaseDate"
                  name="purchaseDate"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex mb-6">
                <label htmlFor="totalAmount" className="mb-0 mr-2 form-label">
                  Total Amount
                </label>
                <input
                  type="number"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="totalAmount"
                  name="totalAmount"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex mb-6">
                <label htmlFor="status" className="mr-2 form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="status"
                  name="status"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button type="button" className="w-20 mr-4 bg-pink-900 rounded btn btn-secondary text-white" onClick={handleClose}>
                Close
              </button>
              <button type="button" className="w-20 bg-purple-900 rounded btn btn-danger text-white" onClick={handleCreatePurchase}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Purchase;
