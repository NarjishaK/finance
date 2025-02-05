import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const AllTransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/financials/transactions_list/");
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching transactions");
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="panel">
      <h3>Transactions List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Service</th>
            <th>Amount Paid</th>
            <th>Payment Status</th>
            <th>Payment Mode</th>
            <th>Tax Rate</th>
            <th>Sale Date</th>
            <th>Remarks</th>
            <th>Action</th>
            {/* <th>Transaction Type</th> */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.username}</td>
              <td>{transaction.service}</td>
              <td>{transaction.amount_paid}</td>
              <td>{transaction.payment_status}</td>
              <td>{transaction.payment_mode}</td>
              <td>{transaction.tax_rate}</td>
              <td>{transaction.sale_date}</td>
              <td>{transaction.remarks}</td>
              
              {/* <td>{transaction.transaction_type}</td> */}
            <td>
                        <div className="btn-box">
                            {/* <button><i className="fa-light fa-eye"></i></button> */}
                            <button><i className="fa-light fa-pen"></i></button>
                            <button><i className="fa-light fa-trash"></i></button>
                        </div>
                    </td>
                    </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllTransactionsTable;
