import React from 'react';

function SupplierForm({
  handleClose,
  fetchSuppliers,
  supplierData,
  setSupplierData,
  editingSupplier,
  handleSaveChanges,
  handleCreateSupplier,
}) {
  return (
    <div className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white border border-pink-700 rounded-md shadow-md top-1/2 left-1/2 modal">
      <div className="p-8 modal-content">
        <h5 className="mb-4 text-lg font-bold">{editingSupplier ? 'Edit Supplier' : 'Create Supplier'}</h5>
        <form id="createSupplierForm" className="flex flex-col">
          <div className="flex mb-6">
            <label htmlFor="name" className="mr-2 form-label">
              Name
            </label>
            <input
              type="text"
              className="flex-1 border border-pink-600 rounded form-control"
              id="name"
              name="name"
              value={supplierData.name}
              onChange={(e) => setSupplierData({ ...supplierData, name: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="address" className="mb-0 mr-2 form-label">
              Address
            </label>
            <input
              type="text"
              className="flex-1 border border-pink-600 rounded form-control"
              id="address"
              name="address"
              value={supplierData.address}
              onChange={(e) => setSupplierData({ ...supplierData, address: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="phone" className="mb-0 mr-2 form-label">
              Phone
            </label>
            <input
              type="number"
              className="flex-1 border border-pink-600 rounded form-control"
              id="phone"
              name="phone"
              value={supplierData.phone}
              onChange={(e) => setSupplierData({ ...supplierData, phone: e.target.value })}
              required
            />
          </div>
          <div className="flex mb-6">
            <label htmlFor="email" className="mr-2 form-label">
              Email
            </label>
            <input
              type="email"
              className="flex-1 border border-pink-600 rounded form-control"
              id="email"
              name="email"
              value={supplierData.email}
              onChange={(e) => setSupplierData({ ...supplierData, email: e.target.value })}
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
            onClick={editingSupplier ? handleSaveChanges : handleCreateSupplier}
          >
            {editingSupplier ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierForm;
