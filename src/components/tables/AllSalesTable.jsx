// import React, { useEffect, useState } from 'react';
// import { Table, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// import PaginationSection from './PaginationSection';

// const AllSalesTable = ({ categoryId }) => {
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const dataPerPage = 10;
//     const [selectedService, setSelectedService] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);

//     useEffect(() => {
//         fetchServices();
//     }, [categoryId]);

//     const fetchServices = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/v1/services/services`);
//             // const response = await axios.get(`http://127.0.0.1:8000/api/v1/categories/${categoryId}/services/`);
//             setServices(response.data);
//         } catch (err) {
//             setError('Failed to fetch services');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (service) => {
//         setSelectedService(service);
//         setShowEditModal(true);
//     };

//     const handleDelete = (service) => {
//         setSelectedService(service);
//         setShowDeleteModal(true);
//     };

//     // const updateService = async (updatedService) => {
//     //     try {
//     //         await axios.put(`http://127.0.0.1:8000/api/v1/categories/${categoryId}/services/${updatedService.id}/update/`, updatedService);
//     //         fetchServices();
//     //         setShowEditModal(false);
//     //     } catch (error) {
//     //         alert("Failed to update service");
//     //     }
//     // };

//     const updateService = async (updatedService) => {
//         try {
//             await axios.put(`http://127.0.0.1:8000/api/v1/services/${updatedService.id}/update/`, updatedService);
//             fetchServices();
//             setShowEditModal(false);
//         } catch (error) {
//             alert("Failed to update service");
//         }
//     };
    

//     const deleteService = async () => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/v1/categories/${categoryId}/services/${selectedService.id}/delete/`);
//             fetchServices();
//             setShowDeleteModal(false);
//         } catch (error) {
//             alert("Failed to delete service");
//         }
//     };

//     const indexOfLastData = currentPage * dataPerPage;
//     const indexOfFirstData = indexOfLastData - dataPerPage;
//     const currentData = services.slice(indexOfFirstData, indexOfLastData);
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const totalPages = Math.ceil(services.length / dataPerPage);
//     const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

//     return (
//         <>
//             <OverlayScrollbarsComponent>
//                 {loading && <Spinner animation="border" variant="primary" />}
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 {!loading && !error && (
//                     <Table className="table table-hover table-striped">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Description</th>
//                                 <th>Category</th>
//                                 <th>HSN Code</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                                 <th>Discount</th>
//                                 <th>Tax Rate</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentData.map((service) => (
//                                 <tr key={service.id}>
//                                     <td>{service.id}</td>
//                                     <td>{service.name}</td>
//                                     <td>{service.description}</td>
//                                     <td>{service.category_name}</td>
//                                     <td>{service.hsn_code}</td>
//                                     <td>{service.quantity}</td>
//                                     <td>${service.price}</td>
//                                     <td>{service.discount}%</td>
//                                     <td>{service.tax_rate}%</td>
//                                     <td>{service.is_active ? "Active" : "Inactive"}</td>
//                                     <td>
//                                         <div className="btn-box">
//                                             <button onClick={() => handleEdit(service)}><i className="fa-light fa-pen"></i></button>
//                                             <button onClick={() => handleDelete(service)}><i className="fa-light fa-trash"></i></button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 )}
//             </OverlayScrollbarsComponent>
//             <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />

//             {/* Edit Modal */}
//             {selectedService && (
//                 <EditServiceModal
//                     show={showEditModal}
//                     handleClose={() => setShowEditModal(false)}
//                     service={selectedService}
//                     updateService={updateService}
//                 />
//             )}

//             {/* Delete Modal */}
//             {selectedService && (
//                 <DeleteServiceModal
//                     show={showDeleteModal}
//                     handleClose={() => setShowDeleteModal(false)}
//                     handleDelete={deleteService}
//                     service={selectedService}
//                 />
//             )}
//         </>
//     );
// };

// // Edit Service Modal
// const EditServiceModal = ({ show, handleClose, service, updateService }) => {
//     const [formData, setFormData] = useState({ ...service });

//     useEffect(() => {
//         setFormData({ ...service });
//     }, [service]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         updateService(formData);
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Service</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group>
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Category</Form.Label>
//                         <Form.Control type="text" name="category_name" value={formData.category_name} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group></Form.Group>
//                     <Form.Group>
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>HSN Code</Form.Label>
//                         <Form.Control type="text" name="hsn_code" value={formData.hsn_code} onChange={handleChange} required />
//                     </Form.Group>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                         <Button type="submit" variant="primary">Save Changes</Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// // Delete Confirmation Modal
// const DeleteServiceModal = ({ show, handleClose, handleDelete, service }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Confirm Delete</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>Are you sure you want to delete the service <strong>{service.name}</strong>?</p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                 <Button variant="danger" onClick={handleDelete}>Delete</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default AllSalesTable;



import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { allProductData } from '../../data/Data';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';

const AllSalesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const dataList = allProductData
     
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
                    <th className="no-sort">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="markAllProduct"/>
                        </div>
                    </th>
                    <th>Product</th>
                    <th>ID</th>
                    <th>Stock</th>
                    <th>InStock</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Modal Number</th>
                    <th>Added Date</th>
                    <th>Status </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((data)=>(
                <tr key={data.id}>
                    <td>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox"/>
                        </div>
                    </td>
                    <td>
                        <div className="table-product-card">
                            <div className="part-img">
                                <img src={data.image} alt={data.product_name}/>
                            </div>
                            <div className="part-txt">
                                <span className="product-name">{data.product_name}</span>
                                <span className="product-category">Category: {data.category}</span>
                            </div>
                        </div>
                    </td>
                    <td>{data.sku}</td>
                    <td>{data.stock}</td>
                    <td>10</td>
                    <td>Blue</td>
                    <td>6</td>
                    <td>${data.price}</td>
                    <td>{data.sales}</td>
                    {/* <td>
                        <div className="rating">
                            <div className="star">
                                <i className="fa-solid fa-star starred"></i>
                                <i className="fa-solid fa-star starred"></i>
                                <i className="fa-solid fa-star starred"></i>
                                <i className="fa-solid fa-star starred"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div className="rating-amount">({data.rating})</div>
                        </div>
                    </td> */}
                    <td>{data.published}</td>
                  <td>In Stock</td>
                    <td>
                        <div className="btn-box">
                            <button><i className="fa-light fa-eye"></i></button>
                            <button><i className="fa-light fa-pen"></i></button>
                            <button><i className="fa-light fa-trash"></i></button>
                        </div>
                    </td>
                </tr>  
                ))}
            
            </tbody>
        </Table>
    </OverlayScrollbarsComponent>
    <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers}/>
    </>
  )
}

export default AllSalesTable