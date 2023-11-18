import React, { useState } from 'react';

function Payment() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleShow = () => {
    setShowButton(false);
    setShowForm(true);
  }

  const handleClose = () => {
    setShowButton(true);
    setShowForm(false);
  }

  return (
    <>
      {showButton && (
        <button
          type="button"
          className="float-right p-2 mt-4 text-white bg-pink-900 border border-pink-700 rounded"
          onClick={handleShow}
        >
          Create new Payment
        </button>
      )}

      {showForm && (
        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white border border-pink-700 rounded-md shadow-md top-1/2 left-1/2 modal">
          <div className="p-8 modal-content">
            <h5 className="mb-4 text-lg font-bold">Payment Form</h5>
            <form id="createPaymentForm" className="flex flex-col">
              <div className="flex mb-6">
                <label htmlFor="idPurchase" className="mr-2 form-label">Purchase ID</label>
                <input type="text" className="flex-1 border border-pink-600 rounded form-control" id="idPurchase" name="idPurchase" required />
              </div>
              <div className="flex mb-6">
                <label htmlFor="paymentAmount" className="mb-0 mr-2 form-label">Payment Amount</label>
                <input type="number" className="flex-1 border border-pink-600 rounded form-control" id="paymentAmount" name="paymentAmount" required />
              </div>
              <div className="flex mb-6">
                <label htmlFor="paymentDate" className="mb-0 mr-2 form-label">Payment Date</label>
                <input type="datetime-local" className="flex-1 border border-pink-600 rounded form-control" id="paymentDate" name="paymentDate" required />
              </div>
              <div className="flex mb-6">
                <label htmlFor="status" className="mr-2 form-label">Status</label>
                <input type="text" className="flex-1 border border-pink-600 rounded form-control" id="status" name="status" required />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button type="button" className="w-20 mr-4 bg-pink-900 rounded btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="submit" form="createPaymentForm" id="createPaymentButton" className="w-20 bg-purple-900 rounded btn btn-danger">Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment;
