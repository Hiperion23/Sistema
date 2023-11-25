import React, { useState, useEffect } from 'react';
import PurchaseForm from './PurchaseForm';

function Purchase() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [purchaseData, setPurchaseData] = useState({
    idSupplier: '',
    purchaseDate: '',
    totalAmount: '',
    status: '',
  });
  const [editingPurchase, setEditingPurchase] = useState(null);

  const handleShow = () => {
    setShowButton(false);
    setShowForm(true);
    setEditingPurchase(null);
    setPurchaseData({
      idSupplier: '',
      purchaseDate: '',
      totalAmount: '',
      status: '',
    });
  };

  const handleClose = () => {
    setShowButton(true);
    setShowForm(false);
    setEditingPurchase(null);
    setPurchaseData({
      idSupplier: '',
      purchaseDate: '',
      totalAmount: '',
      status: '',
    });
  };

  const handleUpdatePurchase = (id) => {
    const selectedPurchase = purchases.find((purchase) => purchase.idPurchase === id);
    if (selectedPurchase) {
      setEditingPurchase(selectedPurchase);
      setShowButton(false);
      setShowForm(true);
      setPurchaseData(selectedPurchase);
    }
  };

  const handleDeletePurchase = async (id) => {
    try {
      const response = await fetch(`http://localhost/sistema/Controllers/PurchaseController.php?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Purchase deleted successfully');
        fetchPurchases();
      } else {
        console.error('Error deleting purchase', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/PurchaseController.php');
      if (response.ok) {
        const data = await response.json();
        setPurchases(data);
      } else {
        console.error('Error fetching purchases');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSaveChanges = async () => {
    if (editingPurchase) {
      try {
        const response = await fetch(`http://localhost/sistema/Controllers/PurchaseController.php?id=${editingPurchase.idPurchase}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(purchaseData),
        });

        if (response.ok) {
          console.log('Purchase updated successfully');
          handleClose();
          fetchPurchases();
        } else {
          console.error('Error updating purchase');
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
          Create new Purchase
        </button>
      )}

      {showForm && (
        <PurchaseForm
          handleClose={handleClose}
          fetchPurchases={fetchPurchases}
          purchaseData={purchaseData}
          setPurchaseData={setPurchaseData}
          editingPurchase={editingPurchase}
          handleSaveChanges={handleSaveChanges}
        />
      )}

      {/* Purchase List */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Purchase List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Supplier ID</th>
              <th className="p-2 border border-gray-300">Purchase Date</th>
              <th className="p-2 border border-gray-300">Total Amount</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.idPurchase}>
                <td className="p-2 border border-gray-300">{purchase.idPurchase}</td>
                <td className="p-2 border border-gray-300">{purchase.idSupplier}</td>
                <td className="p-2 border border-gray-300">{purchase.purchaseDate}</td>
                <td className="p-2 border border-gray-300">{purchase.totalAmount}</td>
                <td className="p-2 border border-gray-300">{purchase.status}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="px-2 py-1 mr-2 font-bold text-white bg-pink-900 rounded hover:bg-pink-400"
                    onClick={() => handleUpdatePurchase(purchase.idPurchase)}
                  >
                    Update
                  </button>
                  <button
                    className="px-2 py-1 font-bold text-white bg-purple-900 rounded hover:bg-purple-400"
                    onClick={() => handleDeletePurchase(purchase.idPurchase)}
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

export default Purchase;
