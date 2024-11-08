import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { allCustomerData } from '../../data/Data';
import { Link } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';

const AllCustomerTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const dataList = allCustomerData
     // Pagination logic
     const indexOfLastData = currentPage * dataPerPage;
     const indexOfFirstData = indexOfLastData - dataPerPage;
     const currentData = dataList.slice(indexOfFirstData, indexOfLastData);
   
     const paginate = (pageNumber) => {
       setCurrentPage(pageNumber);
     };
   
     // Calculate total number of pages
     const totalPages = Math.ceil(dataList.length / dataPerPage);
     const pageNumbers = [];
     for (let i = 1; i <= totalPages; i++) {
       pageNumbers.push(i);
     }
   
  return (
    <>
      <OverlayScrollbarsComponent>
        <Table
          className="table table-dashed table-hover digi-dataTable all-product-table table-striped"
          id="allProductTable"
        >
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllProduct"
                  />
                </div>
              </th>
              <th>No</th>
              <th>Name</th>
              <th>Shop Name</th>
              <th>Date </th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => (
              <tr key={data.userName}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>1</td>
                <td>
                  <Link to="#">{data.name}</Link>
                </td>
                <td>{data.userName}</td>
                <td>{data.dateRegistered}</td>
                <td>
                  <Link to="#">{data.email}</Link>
                </td>
                <td>Kuttiady </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </OverlayScrollbarsComponent>
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
      />
    </>
  );
}

export default AllCustomerTable