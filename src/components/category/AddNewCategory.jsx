
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const AddNewCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        is_active: true
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [showThumbnail, setShowThumbnail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle thumbnail upload
    const onDropSingle = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setThumbnail(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropSingle,
        accept: 'image/*',
        maxFiles: 1
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append('name', categoryData.name);
            formData.append('description', categoryData.description);
            formData.append('is_active', categoryData.is_active);
            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }

            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/services/categories/create/', 
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setSuccess(true);
            setCategoryData({ name: '', description: '', is_active: true });
            setThumbnail(null);
        } catch (err) {
            setError('Failed to create category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-xxl-4 col-md-5">
            <div className="panel">
                <div className="panel-header">
                    <h5>Add New Category</h5>
                </div>
                <div className="panel-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">Category Name</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea 
                                    rows="5" 
                                    className="form-control form-control-sm"
                                    name="description"
                                    value={categoryData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            {/* <div className="col-12">
                                <div className="upload-category-thumbnail">
                                    <label className="form-label mb-0" role='button' onClick={() => setShowThumbnail(!showThumbnail)}>
                                        Add Category Thumbnail
                                    </label>
                                    <div {...getRootProps()} className={`${showThumbnail ? '' : 'd-none'}`}>
                                        <input {...getInputProps()} />
                                        <div className="jquery-uploader">
                                            <div className="jquery-uploader-preview-container">
                                                <div className="jquery-uploader-select-card">
                                                    <div className="jquery-uploader-select">
                                                        <div className="upload-button">
                                                            <i className="fa fa-plus"></i><br />
                                                            <a>Upload</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {thumbnail && <p>{thumbnail.name}</p>}
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-12 d-flex justify-content-end">
                                <button className="btn btn-sm btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Category'}
                                </button>
                            </div>
                        </div>
                    </form>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    {success && <p className="text-success mt-2">Category added successfully!</p>}
                </div>
            </div>
        </div>
    );
};

export default AddNewCategory;


// import React, { useState, useEffect } from 'react';
// import { Form } from 'react-bootstrap';
// import axios from 'axios';

// const SeoData = () => {
//   const [categories, setCategories] = useState([]);
//   const [taxChoices, setTaxChoices] = useState([
//     { value: "GST_5", label: "5% GST" },
//     { value: "GST_12", label: "12% GST" },
//     { value: "GST_18", label: "18% GST" },
//     { value: "GST_28", label: "28% GST" },
//     { value: "none", label: "No Tax" }
//   ]);
//   const [formData, setFormData] = useState({
//     category: '',
//     title: '',
//     description: '',
//     instructor: '',
//     price: '',
//     offerPrice: '',
//     introduction: '',
//     taxRate: 'none',
//     hsnCode: '',
//     quantity: 1
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/services/categories/');
//         setCategories(response.data); // Assuming the response is a list of categories
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setError('Failed to fetch categories');
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle Create Service
//   const handleCreateService = async () => {
//     setError(null); // Reset error state before the request
//     setSuccess(false); // Reset success state before the request
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/api/v1/services/categories/${formData.category}/services/create/`,
//         formData
//       );
//       if (response.status === 201) {
//         setSuccess(true);
//         setFormData({
//           category: '',
//           title: '',
//           description: '',
//           instructor: '',
//           price: '',
//           offerPrice: '',
//           introduction: '',
//           taxRate: 'none',
//           hsnCode: '',
//           quantity: 1
//         });
//       }
//     } catch (error) {
//       console.error('Error creating service:', error);
//       setError('Failed to create service');
//     }
//   };

//   return (
//     <div className="panel">
//       <form>
//         {/* Category Dropdown */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="category" className="col-md-2 col-form-label col-form-label-sm">Category</label>
//           <div className="col-md-6">
//             <div className="form-control-sm p-0">
//               <select
//                 id="category"
//                 name="category"
//                 className="form-control form-control-sm"
//                 value={formData.category}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* name */}
//         <div className="row g-3">
//           <label htmlFor="name" className="col-md-2 col-form-label col-form-label-sm">Title</label>
//           <div className="col-md-10">
//             <input
//               type="text"
//               className="form-control form-control-sm"
//               id="name"
//               name="name"
//               placeholder="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <br />

//         {/* Description */}
//         <div className="row g-3">
//           <label htmlFor="description" className="col-md-2 col-form-label col-form-label-sm">Description</label>
//           <div className="col-md-10">
//             <textarea
//               className="form-control form-control-sm"
//               id="description"
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <br />

//         {/* Price */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="price" className="col-md-2 col-form-label col-form-label-sm">Price</label>
//           <div className="col-md-3">
//             <input
//               type="number"
//               className="form-control form-control-sm"
//               id="price"
//               name="price"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Offer Price */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="discount" className="col-md-2 col-form-label col-form-label-sm">Offer Price</label>
//           <div className="col-md-3">
//             <input
//               type="number"
//               className="form-control form-control-sm"
//               id="discount"
//               name="discount"
//               placeholder="discount Price"
//               value={formData.discount}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <br />

//         {/* Tax Rate Dropdown */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="tax_rate" className="col-md-2 col-form-label col-form-label-sm">Tax Rate</label>
//           <div className="col-md-5">
//             <select
//               id="tax_rate"
//               name="tax_rate"
//               className="form-control form-control-sm"
//               value={formData.taxRate}
//               onChange={handleInputChange}
//             >
//               {taxChoices.map((taxChoice) => (
//                 <option key={taxChoice.value} value={taxChoice.value}>
//                   {taxChoice.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* HSN Code */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="hsn_code" className="col-md-2 col-form-label col-form-label-sm">HSN Code</label>
//           <div className="col-md-10">
//             <input
//               type="text"
//               className="form-control form-control-sm"
//               id="hsn_code"
//               name="hsn_code"
//               placeholder="hsn_code"
//               value={formData.hsn_code}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Quantity */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="quantity" className="col-md-2 col-form-label col-form-label-sm">Quantity</label>
//           <div className="col-md-10">
//             <input
//               type="number"
//               className="form-control form-control-sm"
//               id="quantity"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Error and Success messages */}
//         {error && <p className="text-danger mt-2">{error}</p>}
//         {success && <p className="text-success mt-2">Service added successfully!</p>}

//         {/* Submit Button */}
//         <div className="row g-3 mb-3">
//           <div className="col-md-10"></div> {/* Empty space on the left */}
//           <div className="col-md-2 text-end">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={handleCreateService}
//             >
//               Create Service
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SeoData;
