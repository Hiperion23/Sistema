import React, { useState, useEffect } from 'react';
import SupplierForm from './SupplierForm'; 

function Supplier() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleShow = () => {
    setShowButton(false);
    setShowForm(true);
    setEditingSupplier(null);
    setSupplierData({
      name: '',
      address: '',
      phone: '',
      email: '',
    });
  };

  const handleClose = () => {
    setShowButton(true);
    setShowForm(false);
    setEditingSupplier(null);
    setSupplierData({
      name: '',
      address: '',
      phone: '',
      email: '',
    });
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
        fetchSuppliers();
      } else {
        console.error('Error creating supplier', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleUpdateSupplier = (id) => {
    const selectedSupplier = suppliers.find((supplier) => supplier.idSupplier === id);
    if (selectedSupplier) {
      setEditingSupplier(selectedSupplier);
      setSupplierData(selectedSupplier);
      setShowButton(false);
      setShowForm(true);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      const response = await fetch(`http://localhost/sistema/Controllers/SupplierController.php?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Supplier deleted successfully');
        fetchSuppliers();
      } else {
        console.error('Error deleting supplier', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/SupplierController.php');
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error('Error fetching suppliers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSaveChanges = async () => {
    if (editingSupplier) {
      try {
        const url = editingSupplier
        ? `http://localhost/sistema/Controllers/SupplierController.php?id=${editingSupplier.idSupplier}`
        : 'http://localhost/sistema/Controllers/SupplierController.php';

        const method = editingSupplier ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(supplierData),
        });

        if (response.ok) {
          console.log(`Supplier ${editingSupplier ? 'updated' : 'created'} successfully`);
          handleClose();
          fetchSuppliers();
        } else {
          console.error(`Error ${editingSupplier ? 'updating' : 'creating'} payment`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
        <SupplierForm
          handleClose={handleClose}
          handleCreateSupplier={handleCreateSupplier}
          handleInputChange={handleInputChange}
          fetchSuppliers={fetchSuppliers}
          supplierData={supplierData}
          setSupplierData={setSupplierData}
          editingSupplier={editingSupplier}
          handleSaveChanges={handleSaveChanges}
        />
      )}

      {/* Lista de proveedores */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Supplier List</h2>
        <table className="min-w-full border border-pink-900">
          <thead>
            <tr>
              <th className="p-2 border border-pink-900">ID</th>
              <th className="p-2 border border-pink-900">Name</th>
              <th className="p-2 border border-pink-900">Address</th>
              <th className="p-2 border border-pink-900">Phone</th>
              <th className="p-2 border border-pink-900">Email</th>
              <th className="p-2 border border-pink-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.idSupplier}>
                <td className="p-2 border border-pink-900">{supplier.idSupplier}</td>
                <td className="p-2 border border-pink-900">{supplier.name}</td>
                <td className="p-2 border border-pink-900">{supplier.address}</td>
                <td className="p-2 border border-pink-900">{supplier.phone}</td>
                <td className="p-2 border border-pink-900">{supplier.email}</td>
                <td className="p-2 border border-pink-900">
                  <button
                    className="px-2 py-1 mr-2 font-bold text-white bg-pink-900 rounded hover:bg-pink-400"
                    onClick={() => handleUpdateSupplier(supplier.idSupplier)}
                  >
                    Update
                  </button>
                  <button
                    className="px-2 py-1 font-bold text-white bg-purple-900 rounded hover:bg-purple-400"
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
