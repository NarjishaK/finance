import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const SaleData = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        service: "",
        amount_paid: "",
        payment_status: "pending",
        payment_mode: "cash",
        tax_rate: "none",
        sale_date: new Date().toISOString().split("T")[0],
        remarks: "",
        quantity: 1,
        transaction_type: "sale",
        billing_address: "",
    });

    const PAYMENT_STATUS_CHOICES = [
        { value: "paid", label: "Paid" },
        { value: "unpaid", label: "Unpaid" },
        { value: "completely_paid", label: "Completely Paid" },
        { value: "pending", label: "Pending" },
    ];

    const PAYMENT_MODE_CHOICES = [
        { value: "cash", label: "Cash" },
        { value: "cheque", label: "Cheque" },
        { value: "upi", label: "UPI" },
        { value: "other", label: "Other" },
    ];

    const TAX_CHOICES = [
        { value: "GST_5", label: "5% GST" },
        { value: "GST_12", label: "12% GST" },
        { value: "GST_18", label: "18% GST" },
        { value: "GST_28", label: "28% GST" },
        { value: "none", label: "No Tax" },
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/v1/services/services");
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
                setErrorMessage("Error fetching services. Please try again later.");
            }
        };
        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        const amountPaid = parseFloat(formData.amount_paid);
        const quantity = parseInt(formData.quantity, 10);

        if (isNaN(amountPaid) || isNaN(quantity)) {
            setErrorMessage("Please enter valid numbers for Amount Paid and Quantity.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/financials/transactions/", {
                ...formData,
                amount_paid: amountPaid || 0,
                quantity: quantity || 1,
            });

            setTransactionId(response.data.transaction_id);
            setSuccessMessage(`Transaction created successfully! ID: ${response.data.transaction_id}`);

            setFormData({
                username: "",
                service: "",
                amount_paid: "",
                payment_status: "pending",
                payment_mode: "cash",
                tax_rate: "none",
                sale_date: new Date().toISOString().split("T")[0],
                remarks: "",
                quantity: 1,
                transaction_type: "sale",
                billing_address: "",
            });
            setSelectedService(null);
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("Failed to create transaction. Please check the details and try again.");
        }
    };

    return (
        <div className="panel">
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="row g-3 mb-3">
                    <label htmlFor="transaction_type" className="col-md-2 col-form-label col-form-label-sm">
                        Transaction Type
                    </label>
                    <div className="col-md-6">
                        <select
                            id="transaction_type"
                            name="transaction_type"
                            className="form-control form-control-sm"
                            value={formData.transaction_type}
                            onChange={handleInputChange}
                        >
                            <option value="sale">Sale</option>
                            <option value="purchase">Purchase</option>
                        </select>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="username" className="col-md-2 col-form-label col-form-label-sm">
                        Username
                    </label>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="billing_address" className="col-md-2 col-form-label col-form-label-sm">
                        Billing Address
                    </label>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="billing_address"
                            name="billing_address"
                            value={formData.billing_address}
                            onChange={handleInputChange}
                            placeholder="Billing address"
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="service" className="col-md-2 col-form-label col-form-label-sm">
                        Services
                    </label>
                    <div className="col-md-6">
                        <select
                            id="service"
                            name="service"
                            className="form-control form-control-sm"
                            value={selectedService ? selectedService.id : ''}
                            onChange={(e) => {
                                const serviceId = e.target.value;
                                const foundService = services.find(s => s.id === parseInt(serviceId, 10));
                                setSelectedService(foundService);
                                setFormData({ ...formData, service: serviceId })
                            }}
                        >
                            <option value="">Select Service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="service_price" className="col-md-2 col-form-label col-form-label-sm">
                        Service Price
                    </label>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="service_price"
                            value={selectedService ? selectedService.price : ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="quantity" className="col-md-2 col-form-label col-form-label-sm">
                        Quantity
                    </label>
                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            min="1"
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="amount_paid" className="col-md-2 col-form-label col-form-label-sm">
                        Amount Paid
                    </label>
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

                <div className="row g-3 mb-3">
                    <label htmlFor="payment_status" className="col-md-2 col-form-label col-form-label-sm">
                        Payment Status
                    </label>
                    <div className="col-md-6">
                        <select
                            id="payment_status"
                            name="payment_status"
                            className="form-control form-control-sm"
                            value={formData.payment_status}
                            onChange={handleInputChange}
                        >
                            {PAYMENT_STATUS_CHOICES.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="payment_mode" className="col-md-2 col-form-label col-form-label-sm">
                        Payment Mode
                    </label>
                    <div className="col-md-6">
                        <select
                            id="payment_mode"
                            name="payment_mode"
                            className="form-control form-control-sm"
                            value={formData.payment_mode}
                            onChange={handleInputChange}
                        >
                            {PAYMENT_MODE_CHOICES.map((mode) => (
                                <option key={mode.value} value={mode.value}>
                                    {mode.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="tax_rate" className="col-md-2 col-form-label col-form-label-sm">
                        Tax Rate
                    </label>
                    <div className="col-md-6">
                        <select
                            id="tax_rate"
                            name="tax_rate"
                            className="form-control form-control-sm"
                            value={formData.tax_rate}
                            onChange={handleInputChange}
                        >
                            {TAX_CHOICES.map((tax) => (
                                <option key={tax.value} value={tax.value}>
                                    {tax.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <label htmlFor="remarks" className="col-md-2 col-form-label col-form-label-sm">
                        Remarks
                    </label>
                    <div className="col-md-6">
                        <textarea
                            className="form-control form-control-sm"
                            id="remarks"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Enter any remarks"
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <Button type="submit" className="btn btn-primary btn-sm">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            <Modal show={successMessage !== null} onHide={() => setSuccessMessage(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{successMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSuccessMessage(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Error Modal */}
            <Modal show={errorMessage !== null} onHide={() => setErrorMessage(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setErrorMessage(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SaleData;

// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import axios from "axios";

// const SaleData = () => {
//     const [services, setServices] = useState([]);
//     const [selectedService, setSelectedService] = useState(null);
//     const [transactionId, setTransactionId] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [formData, setFormData] = useState({
//         username: "",
//         service: "",
//         amount_paid: "",
//         payment_status: "pending",
//         payment_mode: "cash",
//         tax_rate: "none",
//         sale_date: new Date().toISOString().split("T")[0],
//         remarks: "",
//         quantity: 1,
//         transaction_type: "sale",
//         billing_address: "",
//     });

//     const PAYMENT_STATUS_CHOICES = [
//         { value: "paid", label: "Paid" },
//         { value: "unpaid", label: "Unpaid" },
//         { value: "completely_paid", label: "Completely Paid" },
//         { value: "pending", label: "Pending" },
//     ];

//     const PAYMENT_MODE_CHOICES = [
//         { value: "cash", label: "Cash" },
//         { value: "cheque", label: "Cheque" },
//         { value: "upi", label: "UPI" },
//         { value: "other", label: "Other" },
//     ];

//     const TAX_CHOICES = [
//         { value: "GST_5", label: "5% GST" },
//         { value: "GST_12", label: "12% GST" },
//         { value: "GST_18", label: "18% GST" },
//         { value: "GST_28", label: "28% GST" },
//         { value: "none", label: "No Tax" },
//     ];

//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/api/v1/services/services");
//                 setServices(response.data);
//             } catch (error) {
//                 console.error("Error fetching services:", error);
//                 setErrorMessage("Error fetching services. Please try again later.");
//             }
//         };
//         fetchServices();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage(null);
//         const amountPaid = parseFloat(formData.amount_paid);
//         const quantity = parseInt(formData.quantity, 10);

//         if (isNaN(amountPaid) || isNaN(quantity)) {
//             setErrorMessage("Please enter valid numbers for Amount Paid and Quantity.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/v1/financials/transactions/", {
//                 ...formData,
//                 amount_paid: amountPaid || 0,
//                 quantity: quantity || 1,
//             });

//             setTransactionId(response.data.transaction_id);
//             setSuccessMessage(`Transaction created successfully! ID: ${response.data.transaction_id}`);

//             setFormData({
//                 username: "",
//                 service: "",
//                 amount_paid: "",
//                 payment_status: "pending",
//                 payment_mode: "cash",
//                 tax_rate: "none",
//                 sale_date: new Date().toISOString().split("T")[0],
//                 remarks: "",
//                 quantity: 1,
//                 transaction_type: "sale",
//                 billing_address: "",
//             });
//             setSelectedService(null);

//             setTimeout(() => setSuccessMessage(null), 5000);

//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setErrorMessage("Failed to create transaction. Please check the details and try again.");
//         }
//     };

//     return (
//         <div className="panel">
//             {successMessage && <div className="alert alert-success mb-3">{successMessage}</div>}
//             {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}

//             <form onSubmit={handleSubmit}>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="transaction_type" className="col-md-2 col-form-label col-form-label-sm">
//                         Transaction Type
//                     </label>
//                     <div className="col-md-6">
//                         <select
//                             id="transaction_type"
//                             name="transaction_type"
//                             className="form-control form-control-sm"
//                             value={formData.transaction_type}
//                             onChange={handleInputChange}
//                         >
//                             <option value="sale">Sale</option>
//                             <option value="purchase">Purchase</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="username" className="col-md-2 col-form-label col-form-label-sm">
//                         Username
//                     </label>
//                     <div className="col-md-6">
//                         <input
//                             type="text"
//                             className="form-control form-control-sm"
//                             id="username"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleInputChange}
//                             placeholder="Enter username"
//                         />
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="billing_address" className="col-md-2 col-form-label col-form-label-sm">
//                         Billing Address
//                     </label>
//                     <div className="col-md-6">
//                         <input
//                             type="text"
//                             className="form-control form-control-sm"
//                             id="billing_address"
//                             name="billing_address"
//                             value={formData.billing_address}
//                             onChange={handleInputChange}
//                             placeholder="Billing address"
//                         />
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="service" className="col-md-2 col-form-label col-form-label-sm">
//                         Services
//                     </label>
//                     <div className="col-md-6">
//                         <select
//                             id="service"
//                             name="service"
//                             className="form-control form-control-sm"
//                             value={selectedService ? selectedService.id : ''}
//                             onChange={(e) => {
//                                 const serviceId = e.target.value;
//                                 const foundService = services.find(s => s.id === parseInt(serviceId, 10));
//                                 setSelectedService(foundService);
//                                 setFormData({ ...formData, service: serviceId })
//                             }}
//                         >
//                             <option value="">Select Service</option>
//                             {services.map((service) => (
//                                 <option key={service.id} value={service.id}>
//                                     {service.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="service_price" className="col-md-2 col-form-label col-form-label-sm">
//                         Service Price
//                     </label>
//                     <div className="col-md-4">
//                         <input
//                             type="text"
//                             className="form-control form-control-sm"
//                             id="service_price"
//                             value={selectedService ? selectedService.price : ''}
//                             readOnly
//                         />
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="quantity" className="col-md-2 col-form-label col-form-label-sm">
//                         Quantity
//                     </label>
//                     <div className="col-md-6">
//                         <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             id="quantity"
//                             name="quantity"
//                             value={formData.quantity}
//                             onChange={handleInputChange}
//                             min="1"
//                         />
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="amount_paid" className="col-md-2 col-form-label col-form-label-sm">
//                         Amount Paid
//                     </label>
//                     <div className="col-md-6">
//                         <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             id="amount_paid"
//                             name="amount_paid"
//                             value={formData.amount_paid}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="payment_status" className="col-md-2 col-form-label col-form-label-sm">
//                         Payment Status
//                     </label>
//                     <div className="col-md-6">
//                         <select
//                             id="payment_status"
//                             name="payment_status"
//                             className="form-control form-control-sm"
//                             value={formData.payment_status}
//                             onChange={handleInputChange}
//                         >
//                             {PAYMENT_STATUS_CHOICES.map((status) => (
//                                 <option key={status.value} value={status.value}>
//                                     {status.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="payment_mode" className="col-md-2 col-form-label col-form-label-sm">
//                         Payment Mode
//                     </label>
//                     <div className="col-md-6">
//                         <select
//                             id="payment_mode"
//                             name="payment_mode"
//                             className="form-control form-control-sm"
//                             value={formData.payment_mode}
//                             onChange={handleInputChange}
//                         >
//                             {PAYMENT_MODE_CHOICES.map((mode) => (
//                                 <option key={mode.value} value={mode.value}>
//                                     {mode.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="tax_rate" className="col-md-2 col-form-label col-form-label-sm">
//                         Tax Rate
//                     </label>
//                     <div className="col-md-6">
//                         <select
//                             id="tax_rate"
//                             name="tax_rate"
//                             className="form-control form-control-sm"
//                             value={formData.tax_rate}
//                             onChange={handleInputChange}
//                         >
//                             {TAX_CHOICES.map((tax) => (
//                                 <option key={tax.value} value={tax.value}>
//                                     {tax.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div className="row g-3 mb-3">
//                     <label htmlFor="sale_date" className="col-md-2 col-form-label col-form-label-sm">
//                         Sale Date
//                     </label>
//                     <div className="col-md-6">
//                         <input
//                             type="date"
//                             className="form-control form-control-sm"
//                             id="sale_date"
//                             name="sale_date"
//                             value={formData.sale_date}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                 </div>


//                 <div className="row g-3 mb-3">
//                     <label htmlFor="remarks" className="col-md-2 col-form-label col-form-label-sm">
//                         Remarks
//                     </label>
//                     <div className="col-md-6">
//                         <textarea
//                             className="form-control form-control-sm"
//                             id="remarks"
//                             name="remarks"
//                             value={formData.remarks}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                 </div>

//                 <div className="row g-3">
//                     <div className="col-md-10 offset-md-2">
//                         <Button type="submit" className="btn btn-primary btn-sm">
//                             Create Transaction
//                         </Button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default SaleData;


// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import axios from "axios";

// const SaleData = () => {
//   const [services, setServices] = useState([]);
//   const [transactionId, setTransactionId] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     service: "",
//     amount_paid: "",
//     payment_status: "pending",
//     payment_mode: "cash",
//     tax_rate: "none",
//     sale_date: new Date().toISOString().split("T")[0],
//     remarks: "",
//     quantity: 1,
//     transaction_type: "sale",
//     billing_address: "",
//   });

//   const PAYMENT_STATUS_CHOICES = [
//     { value: "paid", label: "Paid" },
//     { value: "unpaid", label: "Unpaid" },
//     { value: "completely_paid", label: "Completely Paid" },
//     { value: "pending", label: "Pending" },
//   ];

//   const PAYMENT_MODE_CHOICES = [
//     { value: "cash", label: "Cash" },
//     { value: "cheque", label: "Cheque" },
//     { value: "upi", label: "UPI" },
//     { value: "other", label: "Other" },
//   ];

//   const TAX_CHOICES = [
//     { value: "GST_5", label: "5% GST" },
//     { value: "GST_12", label: "12% GST" },
//     { value: "GST_18", label: "18% GST" },
//     { value: "GST_28", label: "28% GST" },
//     { value: "none", label: "No Tax" },
//   ];

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/v1/services/services");
//         setServices(response.data);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };
//     fetchServices();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/api/v1/financials/transactions/", {
//         ...formData,
//         amount_paid: parseFloat(formData.amount_paid) || 0,
//         quantity: parseInt(formData.quantity, 10) || 1,
//       });
//       setTransactionId(response.data.transaction_id);
//       alert("Transaction created successfully!");
//       setFormData({
//         username: "",
//         service: "",
//         amount_paid: "",
//         payment_status: "pending",
//         payment_mode: "cash",
//         tax_rate: "none",
//         sale_date: new Date().toISOString().split("T")[0],
//         remarks: "",
//         quantity: 1,
//         transaction_type: "sale",
//         billing_address: "",
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to create transaction.");
//     }
//   };

//   return (
//     <div className="panel">
//       <form onSubmit={handleSubmit}>

//       <div className="row g-3 mb-3">
//           <label htmlFor="transaction_type" className="col-md-2 col-form-label col-form-label-sm">
//             Transaction Type
//           </label>
//           <div className="col-md-6">
//             <select
//               id="transaction_type"
//               name="transaction_type"
//               className="form-control form-control-sm"
//               value={formData.transaction_type}
//               onChange={handleInputChange}
//             >
//               <option value="sale">Sale</option>
//               <option value="purchase">Purchase</option>
//             </select>
//           </div>
//         </div>

//         {/* Username */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="username" className="col-md-2 col-form-label col-form-label-sm">
//             Username
//           </label>
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control form-control-sm"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               placeholder="Enter username"
//             />
//           </div>
//         </div>

//         {/* Billing Address */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="billing_address" className="col-md-2 col-form-label col-form-label-sm">
//             Billing Address
//           </label>
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control form-control-sm"
//               id="billing_address"
//               name="billing_address"
//               value={formData.billing_address}
//               onChange={handleInputChange}
//               placeholder="Billing address"
//             />
//           </div>
//         </div>

//         {/* Service Selection */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="service" className="col-md-2 col-form-label col-form-label-sm">
//             Services
//           </label>
//           <div className="col-md-6">
//             <select
//               id="service"
//               name="service"
//               className="form-control form-control-sm"
//               value={formData.service}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Service</option>
//               {services.map((service) => (
//                 <option key={service.id} value={service.id}>
//                   {service.name} 
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="row g-3 mb-3">
//           <label htmlFor="service" className="col-md-2 col-form-label col-form-label-sm">
//             Service Price
//           </label>
//           <div className="col-md-4">
//             <select
//               id="service"
//               name="service"
//               className="form-control form-control-sm"
//               value={formData.service}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Service</option>
//               {services.map((service) => (
//                 <option key={service.id} value={service.id}>
//                   {service.price}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>


//         {/* Quantity */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="quantity" className="col-md-2 col-form-label col-form-label-sm">
//             Quantity
//           </label>
//           <div className="col-md-6">
//             <input
//               type="number"
//               className="form-control form-control-sm"
//               id="quantity"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//               min="1"
//             />
//           </div>
//         </div>

//         {/* Amount Paid */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="amount_paid" className="col-md-2 col-form-label col-form-label-sm">
//             Amount Paid
//           </label>
//           <div className="col-md-6">
//             <input
//               type="number"
//               className="form-control form-control-sm"
//               id="amount_paid"
//               name="amount_paid"
//               value={formData.amount_paid}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Payment Status */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="payment_status" className="col-md-2 col-form-label col-form-label-sm">
//             Payment Status
//           </label>
//           <div className="col-md-6">
//             <select
//               id="payment_status"
//               name="payment_status"
//               className="form-control form-control-sm"
//               value={formData.payment_status}
//               onChange={handleInputChange}
//             >
//               {PAYMENT_STATUS_CHOICES.map((status) => (
//                 <option key={status.value} value={status.value}>
//                   {status.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Payment Mode */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="payment_mode" className="col-md-2 col-form-label col-form-label-sm">
//             Payment Mode
//           </label>
//           <div className="col-md-6">
//             <select
//               id="payment_mode"
//               name="payment_mode"
//               className="form-control form-control-sm"
//               value={formData.payment_mode}
//               onChange={handleInputChange}
//             >
//               {PAYMENT_MODE_CHOICES.map((mode) => (
//                 <option key={mode.value} value={mode.value}>
//                   {mode.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Remarks */}
//         <div className="row g-3 mb-3">
//           <label htmlFor="remarks" className="col-md-2 col-form-label col-form-label-sm">
//             Remarks
//           </label>
//           <div className="col-md-6">
//             <textarea
//               className="form-control form-control-sm"
//               id="remarks"
//               name="remarks"
//               value={formData.remarks}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="row g-3">
//           <div className="col-md-10 offset-md-2">
//             <Button type="submit" className="btn btn-primary btn-sm">
//               Create Transaction
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SaleData;
