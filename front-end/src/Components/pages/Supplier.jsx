import React, { useState, useEffect } from 'react';

function Supplier() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
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
      const response = await fetch('http://localhost/sistema/Controllers/SupplierController/Create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        console.log('Supplier created successfully');
        handleClose();
        fetchSuppliers(); // Actualizar la lista de proveedores después de crear uno nuevo
      } else {
        console.error('Error creating supplier');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/SupplierController/Get.php');
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log('Conectado', data);
        setSuppliers(data);
      } else {
        console.error('HTTP error! Status: ${response.status}')
      }

    } catch (error) {
      console.error('Error fetching suppliers:', error.message);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleUpdateSupplier = (id) => {
    // Implementa la lógica para actualizar un proveedor
    console.log('Update supplier with ID:', id);
  };

  const handleDeleteSupplier = async (id) => {
    try {
      const response = await fetch(`http://localhost/sistema/Controllers/SupplierController/Delete.php?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Supplier deleted successfully');
        fetchSuppliers(); // Actualizar la lista después de eliminar un proveedor
      } else {
        console.error('Error deleting supplier');
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

      {/* Lista de proveedores */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Supplier List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.idSupplier}>
                <td className="border border-gray-300 p-2">{supplier.idSupplier}</td>
                <td className="border border-gray-300 p-2">{supplier.name}</td>
                <td className="border border-gray-300 p-2">{supplier.address}</td>
                <td className="border border-gray-300 p-2">{supplier.phone}</td>
                <td className="border border-gray-300 p-2">{supplier.email}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
                    onClick={() => handleUpdateSupplier(supplier.idSupplier)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteSupplier(supplier.idSupplier)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Supplier;
