import React, { useState, useEffect } from 'react';

function Supplier() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [supplierData, setSupplierData] = useState({
    idSupplier: '',
    name: '',
    address: '',
    phone: '',
    email: '',
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
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleCreateSupplier = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/SupplierController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        console.log('Supplier created successfully');
        handleClose();
      } else {
        console.error('Error creating supplier');
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
          Create new Supplier
        </button>
      )}

      {showForm && (
        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white border border-pink-700 rounded-md shadow-md top-1/2 left-1/2 modal">
          <div className="p-8 modal-content">
            <h5 className="mb-4 text-lg font-bold">Supplier Form</h5>
            <form id="createSupplierForm" className="flex flex-col">
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
                <label htmlFor="name" className="mr-2 form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex mb-6">
                <label htmlFor="phone" className="mb-0 mr-2 form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="flex-1 border border-pink-600 rounded form-control"
                  id="phone"
                  name="phone"
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button type="button" className="w-20 mr-4 bg-pink-900 rounded btn btn-secondary text-white" onClick={handleClose}>
                Close
              </button>
              <button type="button" className="w-20 bg-purple-900 rounded btn btn-danger text-white" onClick={handleCreateSupplier}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Supplier;
