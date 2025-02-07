import React, { useState } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { allProductData } from '../../data/Data';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';

const AllPurchaseTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const dataList = allProductData;
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState('');
    
    // Open Modal
    const handleShowModal = () => setShowModal(true);
    // Close Modal
    const handleCloseModal = () => setShowModal(false);
    // Handle Payment
    const handleConfirmPayment = () => {
        alert(`Payment Amount :$${amount}`)
        setShowModal(false);  
    };

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(dataList.length / dataPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <OverlayScrollbarsComponent>
                <Table className="table table-dashed table-hover digi-dataTable all-product-table table-striped" id="allProductTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Transaction ID</th>
                            <th>User Name</th>
                            <th>Service</th>
                            <th>Service Price</th>
                            <th>Amount Paid</th>
                            <th>Payment Status</th>
                            <th>Payment Mode</th>
                            <th>Sale Date</th>
                            <th>Remarks</th>
                            <th>Transaction Type</th>
                            <th>Quantity</th>
                            <th>Pay</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>ID 123</td>
                            <td>Fathima</td>
                            <td>Service</td>
                            <td>$100</td>
                            <td>$50</td>
                            <td>Pending</td>
                            <td>COD</td>
                            <td>11/02/2025</td>
                            <td>Testing</td>
                            <td>Purchase</td>
                            <td>1</td>
                            <td>
                                <button className='btn btn-primary' onClick={handleShowModal}>Pay Now</button>
                            </td>
                            <td>
                                <div className="btn-box">
                                    <button><i className="fa-light fa-pen"></i></button>
                                    <button><i className="fa-light fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </OverlayScrollbarsComponent>
            <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Payment Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleConfirmPayment}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllPurchaseTable;
