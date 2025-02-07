import React, { useState } from 'react';
import { Table, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { allProductData1 } from '../../data/Data';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';

const AllPurchaseTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const dataList = allProductData1;
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleConfirmPayment = () => {
        alert(`Payment Amount :$${amount}`)
        setShowModal(false);  
    };
    
    const handleShowEditModal = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleEditChange = (e) => {
        setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
    };
    const handleSaveChanges = () => {
        console.log('Saved changes:', selectedItem);
        setShowEditModal(false);
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
                        {currentData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.transactionId}</td>
                                <td>{item.userName}</td>
                                <td>{item.service}</td>
                                <td>${item.servicePrice}</td>
                                <td>${item.amountPaid}</td>
                                <td>{item.paymentStatus}</td>
                                <td>{item.paymentMode}</td>
                                <td>{item.saleDate}</td>
                                <td>{item.remarks}</td>
                                <td>{item.transactionType}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={handleShowModal}>Pay Now</button>
                                </td>
                                <td>
                                    <div className="btn-box">
                                        <button onClick={() => handleShowEditModal(item)}><i className="fa-light fa-pen"></i></button>
                                        <button><i className="fa-light fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </OverlayScrollbarsComponent>
            <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />

            {/* Payment Modal */}
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

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} centered size='lg'> 
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <Form>
                            <Row>
                                {Object.keys(selectedItem).map((key, index) => (
                                    <Col md={6} key={index}>
                                        <Form.Group>
                                            <Form.Label>{key}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={key}
                                                value={selectedItem[key]}
                                                onChange={handleEditChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllPurchaseTable;
