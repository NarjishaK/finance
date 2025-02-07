// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form } from "react-bootstrap";

// const AllTransactionsTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentTransaction, setCurrentTransaction] = useState(null);
//   const [formData, setFormData] = useState({
//     id: "",
//     username: "",
//     service_name: "",
//     amount_paid: "",
//     payment_status: "",
//     payment_mode: "",
//     tax_rate: "",
//     sale_date: "",
//     remarks: "",
//     transaction_type: "",
//     quantity: "",  
//   });

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/v1/financials/transactions_list/");
//       setTransactions(response.data);
//       console.log(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError("Error fetching transactions");
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (transaction) => {
//     setFormData({ ...transaction });
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (transaction) => {
//     setCurrentTransaction(transaction);
//     setShowDeleteModal(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://127.0.0.1:8000/api/v1/financials/transactions/${formData.id}/`, formData);
//       fetchTransactions();
//       setShowEditModal(false);
//     } catch (error) {
//       console.error("Error updating transaction", error);
//     }
//   };

//   const handleDeleteSubmit = async () => {
//     if (!currentTransaction || !currentTransaction.id) {
//       console.error("Transaction ID is undefined");
//       return;
//     }
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/v1/financials/transactions/${currentTransaction.id}/delete/`);
//       fetchTransactions();
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error("Error deleting transaction", error);
//     }
//   };

//   if (loading) return <p>Loading transactions...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="panel">
//       <h3>Transactions List</h3>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tranasction Id</th>
//             <th>Username</th>
//             <th>Service</th>
//             <th>Service Price</th>
//             <th>Amount Paid</th>
//             <th>Payment Status</th>
//             <th>Payment Mode</th>
//             <th>Tax Rate</th>
//             <th>Sale Date</th>
//             {/* <th>Remarks</th> */}
//             <th>Transaction Type</th>
//             <th>Quantity</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction, index) => (
//             <tr key={transaction.id}>
//               <td>{index + 1}</td>
//               <td>{transaction.transaction_id}</td>
//               <td>{transaction.username}</td>
//               <td>{transaction.service_name}</td>
//               <td>Rs{transaction.service_price}</td>             
//               <td>Rs{transaction.amount_paid}</td>
//               <td>{transaction.payment_status}</td>
//               <td>{transaction.payment_mode}</td>
//               <td>{transaction.tax_rate}</td>
//               <td>{transaction.sale_date}</td>
//               {/* <td>{transaction.remarks}</td> */}
//               <td>{transaction.transaction_type}</td>
//               <td>{transaction.quantity}</td>
//               <td>
//               <button onClick={() => handleEditClick(transaction)}><i className="fa-light fa-eye"></i></button>
//               <button onClick={() => handleEditClick(transaction)}><i className="fa-light fa-pen"></i></button>
//               <button onClick={() => handleDeleteClick(transaction)}><i className="fa-light fa-trash"></i></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* calculations display Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Show Transaction</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleEditSubmit}>
//             <Form.Group>
//               <Form.Label>Amount Paid</Form.Label>
//               <Form.Control type="number" value={formData.amount_paid} onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Delete Modal */}
//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Transaction</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this transaction?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
//           <Button variant="danger" onClick={handleDeleteSubmit}>Delete</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AllTransactionsTable;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const AllTransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    service_name: "",
    amount_paid: "",
    payment_status: "",
    payment_mode: "",
    tax_rate: "",
    sale_date: "",
    remarks: "",
    transaction_type: "",
    quantity: "",  
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/financials/transactions_list/");
      setTransactions(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching transactions");
      setLoading(false);
    }
  };

  const handleEditClick = (transaction) => {
    setFormData({ ...transaction });
    setShowEditModal(true);
  };

  const handleDisplayClick = (transaction) => {
    setFormData({ ...transaction });
    setShowDisplayModal(true);
  };

  const handleDeleteClick = (transaction) => {
    setCurrentTransaction(transaction);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/v1/financials/transactions/${formData.id}/`, formData);
      fetchTransactions();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating transaction", error);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!currentTransaction || !currentTransaction.id) {
      console.error("Transaction ID is undefined");
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/financials/transactions/${currentTransaction.id}/delete/`);
      fetchTransactions();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="panel">
      <h3>Transactions List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Transaction Id</th>
            <th>Username</th>
            <th>Service</th>
            <th>Service Price</th>
            <th>Amount Paid</th>
            <th>Payment Status</th>
            <th>Payment Mode</th>
            <th>Tax Rate</th>
            <th>Sale Date</th>
            <th>Transaction Type</th>
            <th>Quantity</th>
            <th>Total Service Amount</th>
            <th>Remaining Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.username}</td>
              <td>{transaction.service_name}</td>
              <td>Rs{transaction.service_price}</td>             
              <td>Rs{transaction.amount_paid}</td>
              <td>{transaction.payment_status}</td>
              <td>{transaction.payment_mode}</td>
              <td>{transaction.tax_rate}</td>
              <td>{transaction.sale_date}</td>
              <td>{transaction.transaction_type}</td>
              <td>{transaction.quantity}</td>
              <td>Rs{transaction.total_service_amount}</td>
              <td>Rs{transaction.remaining_amount}</td>
              <td>
                <button onClick={() => handleEditClick(transaction)}><i className="fa-light fa-eye"></i></button>
                <button onClick={() => handleEditClick(transaction)}><i className="fa-light fa-pen"></i></button>
                <button onClick={() => handleDeleteClick(transaction)}><i className="fa-light fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Show Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group>
                <Form.Label>Total Service Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.total_service_amount} // Display total service amount
                  readOnly
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.amount_paid}
                  onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Remaining Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.remaining_amount} // Display remaining amount
                  readOnly
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
   
          <Form.Group>
              <Form.Label>Payment Status</Form.Label>
              <Form.Control
                as="select"
                value={formData.payment_status}
                onChange={(e) =>
                  setFormData({ ...formData, payment_status: e.target.value })
                }
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="completely_paid">Completely Paid</option>
                <option value="pending">Pending</option>
              </Form.Control>
            </Form.Group>
             <Button variant="primary" type="submit">Save Changes</Button>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteSubmit}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllTransactionsTable;



{/* calculations display Modal */}
      {/* <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control type="number" value={formData.amount_paid} onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal> */}