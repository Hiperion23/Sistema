import React from 'react';

function PurchaseForm({
  handleClose,
  fetchPurchases,
  purchaseData,
  setPurchaseData,
  editingPurchase,
  handleSaveChanges,
  handleCreatePurchase,
}) {
  return (
    <div className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white border border-pink-700 rounded-md shadow-md top-1/2 left-1/2 modal">
      <div className="p-8 modal-content">
        <h5 className="mb-4 text-lg font-bold">{editingPurchase ? 'Edit Purchase' : 'Create Purchase'}</h5>
        <form id="createPurchaseForm" className="flex flex-col">
          <div className="flex mb-6">
            <label htmlFor="idSupplier" className="mr-2 form-label">
              Supplier ID
            </label>
            <input
              type="text"
              className="flex-1 border border-pink-600 rounded form-control"
              id="idSupplier"
              name="idSupplier"
              value={purchaseData.idSupplier}
              onChange={(e) => setPurchaseData({ ...purchaseData, idSupplier: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="purchaseDate" className="mb-0 mr-2 form-label">
              Purchase Date
            </label>
            <input
              type="datetime-local"
              className="flex-1 border border-pink-600 rounded form-control"
              id="purchaseDate"
              name="purchaseDate"
              value={purchaseData.purchaseDate}
              onChange={(e) => setPurchaseData({ ...purchaseData, purchaseDate: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="totalAmount" className="mb-0 mr-2 form-label">
              Total Amount
            </label>
            <input
              type="text"
              className="flex-1 border border-pink-600 rounded form-control"
              id="totalAmount"
              name="totalAmount"
              value={purchaseData.totalAmount}
              onChange={(e) => setPurchaseData({ ...purchaseData, totalAmount: e.target.value })}
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
              value={purchaseData.status}
              onChange={(e) => setPurchaseData({ ...purchaseData, status: e.target.value })}
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
            onClick={editingPurchase ? handleSaveChanges : handleCreatePurchase}
          >
            {editingPurchase ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseForm;
