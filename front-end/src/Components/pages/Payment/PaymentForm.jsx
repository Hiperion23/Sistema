import React from 'react';

function PaymentForm({
  handleClose,
  fetchPayments,
  paymentData,
  setPaymentData,
  editingPayment,
  handleSaveChanges,
  handleCreatePayment,
}) {
  return (
    <div className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white border border-pink-700 rounded-md shadow-md top-1/2 left-1/2 modal">
      <div className="p-8 modal-content">
        <h5 className="mb-4 text-lg font-bold">{editingPayment ? 'Edit Payment' : 'Create Payment'}</h5>
        <form id="createPaymentForm" className="flex flex-col">
          <div className="flex mb-6">
            <label htmlFor="idPurchase" className="mr-2 form-label">
              Purchase ID
            </label>
            <input
              type="text"
              className="flex-1 border border-pink-600 rounded form-control"
              id="idPurchase"
              name="idPurchase"
              value={paymentData.idPurchase}
              onChange={(e) => setPaymentData({ ...paymentData, idPurchase: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="paymentAmount" className="mb-0 mr-2 form-label">
              Payment Amount
            </label>
            <input
              type="number"
              className="flex-1 border border-pink-600 rounded form-control"
              id="paymentAmount"
              name="paymentAmount"
              value={paymentData.paymentAmount}
              onChange={(e) => setPaymentData({ ...paymentData, paymentAmount: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="paymentDate" className="mb-0 mr-2 form-label">
              Payment Date
            </label>
            <input
              type="datetime-local"
              className="flex-1 border border-pink-600 rounded form-control"
              id="paymentDate"
              name="paymentDate"
              value={paymentData.paymentDate}
              onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
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
              value={paymentData.status}
              onChange={(e) => setPaymentData({ ...paymentData, status: e.target.value })}
              required
            />
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="w-20 mr-4 text-white bg-pink-900 rounded btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="w-20 text-white bg-purple-900 rounded btn btn-danger"
            onClick={editingPayment ? handleSaveChanges : handleCreatePayment}
          >
            {editingPayment ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
