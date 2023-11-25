import React, { useState, useEffect } from 'react';
import PaymentForm from './PaymentForm';

function Payment() {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentData, setPaymentData] = useState({
    idPurchase: '',
    paymentAmount: '',
    paymentDate: '',
    status: '',
  });
  const [editingPayment, setEditingPayment] = useState(null);

  const handleShow = () => {
    setShowButton(false);
    setShowForm(true);
    setEditingPayment(null);
    setPaymentData({
      idPurchase: '',
      paymentAmount: '',
      paymentDate: '',
      status: '',
    });
  };

  const handleClose = () => {
    setShowButton(true);
    setShowForm(false);
    setEditingPayment(null);
    setPaymentData({
      idPurchase: '',
      paymentAmount: '',
      paymentDate: '',
      status: '',
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleCreatePayment = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/PaymentController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        console.log('Payment created successfully');
        handleClose();
        fetchPayments();
      } else {
        console.error('Error creating payment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleUpdatePayment = (id) => {
    const selectedPayment = payments.find((payment) => payment.idPayment === id);
    if (selectedPayment) {
      setEditingPayment(selectedPayment);
      setPaymentData(selectedPayment);
      setShowButton(false);
      setShowForm(true);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
      const response = await fetch(`http://localhost/sistema/Controllers/PaymentController.php?idPayment=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Payment deleted successfully');
        fetchPayments();
      } else {
        console.error('Error deleting Payment', response.statusText);
        console.log(await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost/sistema/Controllers/PaymentController.php');
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        console.error('Error fetching payments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const url = editingPayment
        ? `http://localhost/sistema/Controllers/PaymentController.php?id=${editingPayment.idPayment}`
        : 'http://localhost/sistema/Controllers/PaymentController.php';

      const method = editingPayment ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        console.log(`Payment ${editingPayment ? 'updated' : 'created'} successfully`);
        handleClose();
        fetchPayments();
      } else {
        console.error(`Error ${editingPayment ? 'updating' : 'creating'} payment`);
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
          Create new Payment
        </button>
      )}

      {showForm && (
        <PaymentForm
          handleClose={handleClose}
          handleCreatePayment={handleCreatePayment}
          handleInputChange={handleInputChange}
          fetchPayments={fetchPayments}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          editingPayment={editingPayment}
          handleSaveChanges={handleSaveChanges}
        />
      )}

      {/* Lista de pagos */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Payment List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Purchase ID</th>
              <th className="p-2 border border-gray-300">Payment Amount</th>
              <th className="p-2 border border-gray-300">Payment Date</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.idPayment}>
                <td className="p-2 border border-gray-300">{payment.idPayment}</td>
                <td className="p-2 border border-gray-300">{payment.idPurchase}</td>
                <td className="p-2 border border-gray-300">{payment.paymentAmount}</td>
                <td className="p-2 border border-gray-300">{payment.paymentDate}</td>
                <td className="p-2 border border-gray-300">{payment.status}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="px-2 py-1 mr-2 font-bold text-white bg-pink-900 rounded hover:bg-pink-400"
                    onClick={() => handleUpdatePayment(payment.idPayment)}
                  >
                    Update
                  </button>
                  <button
                    className="px-2 py-1 font-bold text-white bg-purple-900 rounded hover:bg-purple-400"
                    onClick={() => handleDeletePayment(payment.idPayment)}
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

export default Payment;
