// import React, { useState } from 'react'
// import { Form } from 'react-bootstrap'

// const SaleData = () => {
//     const [sizes, setSizes] = useState([
//         { size: "Lesson1", stock: 0, selected: false },
//         { size: "Lesson2", stock: 0, selected: false },
//       ]);
    
//       const handleSizeChange = (index) => {
//         const updatedSizes = [...sizes];
//         updatedSizes[index].selected = !updatedSizes[index].selected;
//         setSizes(updatedSizes);
//       };
    
     
//   return (
//     <div className="panel">
//         <form > 
//         <div className="row g-3 mb-3">
//             <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm"> Category</label>
//             <div className="col-md-6">
//             <div className="form-control-sm p-0">
//                     <select className="form-control form-control-sm">
//                         <option value="1">select main category</option>
//                         <option value="2">Dress</option>
//                     </select>
//                 </div>            
//             </div>
//             <div className="col-md-4">
//                 <div className="form-control-sm p-0">
//                     <select className="form-control form-control-sm">
//                         <option value="1">Sub Category</option>
//                         <option value="2">Shirt</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//         <div className='row g-3'>
//             <label htmlFor="Title" className="col-md-2 col-form-label col-form-label-sm">Title</label>
//             <div className="col-md-10">
//                 <input type="text" className="form-control form-control-sm" id="Title" placeholder='Title'/>
//             </div>
//         </div>
//         <br/>
//         <div className="row g-3 ">
//             <label htmlFor="Description" className="col-md-2 col-form-label col-form-label-sm">Description</label>
//             <div className="col-md-10">
//                 <textarea type="text" className="form-control form-control-sm" id="Description" placeholder='Description'/>
//             </div>
//         </div>
//         <br/>
//         <div className="row g-3 mb-3">
//             <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm">Images & Color</label>
//             <div className="col-md-6">
//             <div className="form-control-sm p-0">
//             <input type="file" className="form-control form-control-sm" id="image" placeholder='Images'/>
//             </div>            
//             </div>
//             <div className="col-md-4">
//                 <div className="form-control-sm p-0">
//                     <select className="form-control form-control-sm">
//                         <option value="1">Select Language</option>
//                         <option value="2">Malayalam</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//         <div className="row g-3 mb-3">
//             <label htmlFor="regularPrice" className="col-md-2 col-form-label col-form-label-sm"> Instructor</label>
//             <div className="col-md-10">
//                 <input type="text" className="form-control form-control-sm" id="regularPrice" placeholder='Instructor'/>
//             </div>
//         </div>
//         <div className="row g-3 mb-3">
//             <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm">Price</label>
//             <div className="col-md-6">
//             <div className="form-control-sm p-0">
//             <input type="number" className="form-control form-control-sm" id="regularPrice" placeholder='Price'/>
//             </div>            
//             </div>
//             <div className="col-md-4">
//             <input type="text" className="form-control form-control-sm" id="regularPrice" placeholder='Offer Price'/>
//             </div>
//         </div>
//         <div className="row g-3 mb-3">
//             <label htmlFor="" className=" col-form-label col-form-label-sm">What you will learn this  course</label>
//             <input type="text" className="form-control form-control-sm" name="introduction" placeholder="benifits description"/>

//             <div className="col-md-8">
//             <div className="form-control-sm p-0">
//             <input type="number" className="form-control form-control-sm" id="regularPrice" placeholder='Points'/>
//             </div>            
//             </div>
//             <div className="col-md-2">
//             <button className="btn btn-sm btn-icon btn-primary" id="addAttr" >
//                 <i className='fa-plus'></i>
//             </button>
//             </div>
//         </div>
//         <br/>
//         <div className="row align-items-center g-3 mb-3">
//             <label className="col-md-2 col-form-label col-form-label-sm">Introduction</label>
//             <div className="col-md-10">
//                 <input type="text" className="form-control form-control-sm" name="introduction" placeholder="Introduction description"/>
//             </div>
//         </div>
       
//         <div className="row g-3">
//             <label className="col-md-2 col-form-label col-form-label-sm">Video Link</label>
//             <div className="col-md-10">
//                 <input type="url" className="form-control form-control-sm" name="video_link" placeholder="Video Link"/>
//                 <span className="input-additional-txt">Use proper link without extra parameter. Don't use short share link/embeded iframe code.</span>
//             </div>
//         </div>
//         <br/>
//         <div className="row g-3 mb-3">
//           <label className="col-md-2 col-form-label col-form-label-sm">Course Includes</label>
//           <div className="col-md-10">
//             {sizes.map((size, index) => (
//               <div className="row mb-2">
//                 <div className="col-md-2">
//                   <div className="form-check">
//                     <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id={`Course Includes ${index}`}
//                       onChange={() => handleSizeChange(index)}
//                     />
//                     <label htmlFor='Course Includes' className="form-check-label">
//                     {size.size} 
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//     </form>
//     <br/>
//     </div>
//   )
// }

// export default SaleData



import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PurchaseData = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customer: '',
    service: '',
    amount_paid: '',
    payment_status: 'pending',
    payment_mode: '',
    tax_rate: 'none',
    sale_date: new Date().toISOString().split('T')[0],
    remarks: '',
    total_amount: '',
    transaction_type: 'sale',
  });

  const PAYMENT_STATUS_CHOICES = [
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
    { value: "completely_paid", label: "Completely Paid" },
    { value: "pending", label: "Pending" }
  ];

  const PAYMENT_MODE_CHOICES = [
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "upi", label: "UPI" },
    { value: "other", label: "Other" }
  ];

  const TAX_CHOICES = [
    { value: "GST_5", label: "5% GST" },
    { value: "GST_12", label: "12% GST" },
    { value: "GST_18", label: "18% GST" },
    { value: "GST_28", label: "28% GST" },
    { value: "none", label: "No Tax" }
  ];

  const TRANSACTION_TYPE_CHOICES = [
    { value: "sale", label: "Sale" },
    { value: "purchase", label: "Purchase" }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/services/');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/v1/transactions/', formData);
      alert('Transaction created successfully!');
      setFormData({
        customer: '',
        service: '',
        amount_paid: '',
        payment_status: 'pending',
        payment_mode: '',
        tax_rate: 'none',
        sale_date: new Date().toISOString().split('T')[0],
        remarks: '',
        total_amount: '',
        transaction_type: 'sale',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create transaction.');
    }
  };

  return (
    <div className="panel">
      <form onSubmit={handleSubmit}>
        {/* Customer (Text Input) */}
        <div className="row g-3 mb-3">
          <label htmlFor="customer" className="col-md-2 col-form-label col-form-label-sm">Customer</label>
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control form-control-sm" 
              id="customer" 
              name="customer" 
              value={formData.customer} 
              onChange={handleInputChange} 
              placeholder="Enter customer name"
            />
          </div>
        </div>

        {/* Service */}
        <div className="row g-3 mb-3">
          <label htmlFor="service" className="col-md-2 col-form-label col-form-label-sm">Service</label>
          <div className="col-md-6">
            <select id="service" name="service" className="form-control form-control-sm" value={formData.service} onChange={handleInputChange}>
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount Paid */}
        <div className="row g-3 mb-3">
          <label htmlFor="amount_paid" className="col-md-2 col-form-label col-form-label-sm">Amount Paid</label>
          <div className="col-md-6">
            <input 
              type="number" 
              className="form-control form-control-sm" 
              id="amount_paid" 
              name="amount_paid" 
              value={formData.amount_paid} 
              onChange={handleInputChange} 
            />
          </div>
        </div>

        {/* Payment Status */}
        <div className="row g-3 mb-3">
          <label htmlFor="payment_status" className="col-md-2 col-form-label col-form-label-sm">Payment Status</label>
          <div className="col-md-6">
            <select id="payment_status" name="payment_status" className="form-control form-control-sm" value={formData.payment_status} onChange={handleInputChange}>
              {PAYMENT_STATUS_CHOICES.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Payment Mode */}
        <div className="row g-3 mb-3">
          <label htmlFor="payment_mode" className="col-md-2 col-form-label col-form-label-sm">Payment Mode</label>
          <div className="col-md-6">
            <select id="payment_mode" name="payment_mode" className="form-control form-control-sm" value={formData.payment_mode} onChange={handleInputChange}>
              {PAYMENT_MODE_CHOICES.map((mode) => (
                <option key={mode.value} value={mode.value}>{mode.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tax Rate */}
        <div className="row g-3 mb-3">
          <label htmlFor="tax_rate" className="col-md-2 col-form-label col-form-label-sm">Tax Rate</label>
          <div className="col-md-6">
            <select id="tax_rate" name="tax_rate" className="form-control form-control-sm" value={formData.tax_rate} onChange={handleInputChange}>
              {TAX_CHOICES.map((tax) => (
                <option key={tax.value} value={tax.value}>{tax.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="row g-3">
          <div className="col-md-10 offset-md-2">
            <Button type="submit" className="btn btn-primary btn-sm">Create Transaction</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PurchaseData;
