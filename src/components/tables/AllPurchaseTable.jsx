
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { allProductData } from '../../data/Data';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';

const AllPurchaseTable = () => {
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
                    <th>ID</th>
                    <th>Transaction ID</th>
                    <th>User Name</th>
                    <th>Service </th>
                    <th>Service price</th>
                    <th>Amount Paid</th>
                    <th>Payment Status</th>
                    <th>Payment Mode</th>
                    <th>Sale Date</th>
                    <th>Remarks </th>
                    <th>Transaction Type</th>
                    <th>Quantity</th>
                    <th>Pay</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
                <tr>
                    <td>1 </td>
                    <td>ID 123</td>
                    <td>Fathima</td>
                    <td>Serice</td>
                    <td>$100</td>
                    <td>$50</td>
                    <td>Pending</td>
                    <td>COD</td>
                    <td>11/02/2025</td>
                  <td>Testing</td>
                  <td>Purchase</td>
                  <td>1</td>
                  <td><button className='btn btn-primary'>Pay Now</button></td>
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
    <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers}/>
    </>
  )
}

export default AllPurchaseTable