import React, { useEffect, useState } from 'react';
import { get, gets, post, put } from '../../api'; // adjust the path as needed
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DrugFilter from '../../components/DrugFilter';
import DrugCard from '../../components/DrugCard';
import Pagination from '../../components/Pagination';

const UserDashboard = () => {
  const { user, logout } = useAuth(); // Add logout function from AuthProvider
  const navigate = useNavigate(); // Initialize useNavigate
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [formsList, setFormsList] = useState([]);
  const [form, setForm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [availability, setAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(30);
  const [showOrders, setShowOrders] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  
  // New state variables for consumption feature
  const [isConsumptionModalOpen, setIsConsumptionModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [consumedQuantity, setConsumedQuantity] = useState(1);
  const [showReplacementPrompt, setShowReplacementPrompt] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
 
const [replacementQuantity, setReplacementQuantity] = useState('');
const [orderToReplace, setOrderToReplace] = useState(null);
const [drugsCatalog, setDrugsCatalog] = useState({})
const[categories,setCategories] = useState([])
const [apiFormsList, setApiFormsList] = useState([]);
const [drugFormsList, setDrugFormsList] = useState([]);
const [activeFormsList, setActiveFormsList] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
const [paymentMethod, setPaymentMethod] = useState('');
const [selectedAddress, setSelectedAddress] = useState('');


  useEffect(() => {
    if (showOrders) fetchUserOrders();
  }, [showOrders]);
   
  useEffect(() => {
    fetchDrugs();
  }, [currentPage,itemsPerPage]);

  useEffect(() => {
    get("/api/enums/categories")
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  
    get("/api/enums/forms")
      .then((data) => {
        // console.log("Forms data:", data);
        
        // Handle different data formats consistently
        let forms = [];
        if (Array.isArray(data)) {
          forms = data.map(f => typeof f === 'object' ? f.name : f);
        }
        
        // console.log("Processed forms:", forms);
        setFormsList([...new Set(forms)]); // set
        //  API forms
        // console.log(setFormsList)
        // Update active forms list to include these API forms
        setActiveFormsList(prevForms => {
          const combinedForms = [...prevForms, ...forms];
          return [...new Set(combinedForms)]; // ensure unique values
        });
      })
      .catch((err) => console.error("Failed to fetch forms", err));
  }, []);


  const fetchUserOrders = async () => {
    if (!user || !user.id || !user.token) {
      setOrdersError("You must be logged in to view orders");
      return;
    }
  
    setOrdersLoading(true);
    setOrdersError(null);
  
    try {
      const response = await gets(`/api/orders/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Fetched Orders:", response);  // Log the actual data (should be an array or object)
      
      // Make sure order status is consistent (uppercase)
      const processedOrders = Array.isArray(response) ? response.map(order => ({
        ...order,
        status: order.status ? order.status.toUpperCase() : order.status
      })) : [];
      
      setUserOrders(processedOrders);  // Set processed orders
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setOrdersError(error.message || 'Failed to fetch your orders. Please try again.');
      setUserOrders([]);  // In case of error, set empty orders
    } finally {
      setOrdersLoading(false);
    }
  };


  const fetchDrugs = async () => {
    setIsLoading(true);
    try {
      const response = await get(`/api/drugs?page=${Math.max(currentPage - 1, 0)}&size=${itemsPerPage}`);
      
      const drugList = response.data; // extract `data` from API response
      setDrugs(drugList);
      setFilteredDrugs(drugList);
  
      // Create a lookup map for drug details by ID
      const drugsMap = {};
      drugList.forEach(drug => {
        drugsMap[drug.id] = drug;
      });
      setDrugsCatalog(prevCatalog => ({...prevCatalog, ...drugsMap}));
      const uniqueForms = [...new Set(drugList.map(drug => drug.form).filter(Boolean))];
      setDrugFormsList(uniqueForms);
      
      // Update active forms list to include both API forms and drug forms
      setActiveFormsList(prevForms => {
        const combinedForms = [...prevForms, ...uniqueForms];
        return [...new Set(combinedForms)]; // ensure unique values
      });
    } catch (error) {
      console.error('Error fetching drugs:', error);
    } finally {
      setIsLoading(false);
    }
  };  


  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // User will see loading state while new data is fetched
  };
  // Handle logout function
  const handleLogout = () => {
    logout(); // Call the logout function from AuthProvider
    navigate('/login'); // Redirect to login page
  };

  // Navigate to edit profile page
  const handleEditProfile = () => {
    navigate('/user/edit-profile');
  };

  // Filter logic
  useEffect(() => {
    let filtered = drugs.filter(drug =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? drug.category === category : true) &&
      (form ? drug.form === form : true) &&  // Add form filter here
      (availability ? drug.available.toString() === availability : true) &&
      drug.price >= priceRange[0] &&
      drug.price <= priceRange[1]
    );
    setFilteredDrugs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, category, form, priceRange, availability, drugs]);  // Add form to dependency array

  // Get unique categories for filter dropdown
  // let categories = [...new Set(drugs.map(drug => drug.category))];

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setForm('');  // Clear form filter
    setPriceRange([0, 1000]);
    setAvailability('');
  };

  // Open the quantity modal when place order is clicked
  const openOrderModal = (drug) => {
    setSelectedDrug(drug);
    setOrderQuantity(1); // Reset quantity to 1
    setIsOrderModalOpen(true);
  };

  // Close the order modal
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedDrug(null);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setOrderQuantity(value);
    }
  };

  // Increase quantity
  const increaseQuantity = () => {
    setOrderQuantity(prev => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (orderQuantity > 1) {
      setOrderQuantity(prev => prev - 1);
    }
  };
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.fullName}, ${address.phone}, ${address.addressLine} - ${address.pincode}`;
  };
  
  const submitOrderWithPayment = async () => {
    if (!selectedDrug || !paymentMethod) return;
    
    try {
      const payload = {
        userId: user.id,
        drugId: selectedDrug.id,
        drugName: selectedDrug.name,
        quantity: orderQuantity,
        paymentMethod: paymentMethod, // Include payment method in payload
        referenceOrderId: selectedOrder ? selectedOrder.id : null,
        deliveryAddress: typeof selectedAddress === "string"
  ? selectedAddress
  : formatAddress(selectedAddress)
      };
      
      console.log("Order Payload:", payload);
      console.log("Formatted Address:", formatAddress(selectedAddress));
      
      await post('/api/orders/place', payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        }
      });
  
      setOrderSuccess({
        status: true,
        message: `Order for ${orderQuantity} ${orderQuantity === 1 ? 'unit' : 'units'} of ${selectedDrug.name} placed successfully!`
      });
      
      setTimeout(() => {
        setOrderSuccess(null);
      }, 3000);
  
      setIsPaymentModalOpen(false);
      closeOrderModal();
      fetchDrugs();
      fetchUserOrders(); // Refresh orders list
    } catch (error) {
      console.error('Order failed:', error);
      
      setOrderSuccess({
        status: false,
        message: `Order failed: ${error.response?.data || 'Something went wrong'}`
      });
      
      setTimeout(() => {
        setOrderSuccess(null);
      }, 3000);
    }
  };

  // Place order with selected quantity
  const placeOrder = async () => {
    if (!selectedDrug) return;
    setPaymentMethod(''); 
    setIsAddressModalOpen(true)
    setIsPaymentModalOpen(true);
    
  //   try {
  //     const payload = {
  //       userId: user.id,
  //       drugId: selectedDrug.id,
  //       drugName: selectedDrug.name,
  //       quantity: orderQuantity,
  //       paymentMethod: paymentMethod,
  //       referenceOrderId: selectedOrder ? selectedOrder.id : null
  //     };
      
  //     console.log("Order Payload:", payload);
      
  //     await post('/api/orders/place', payload, {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       }
  //     });

  //     setOrderSuccess({
  //       status: true,
  //       message: `Order for ${orderQuantity} ${orderQuantity === 1 ? 'unit' : 'units'} of ${selectedDrug.name} placed successfully!`
  //     });
      
  //     setTimeout(() => {
  //       setOrderSuccess(null);
  //     }, 3000);

  //     setIsPaymentModalOpen(false);
  //     closeOrderModal();
  //     fetchDrugs();
  //     fetchUserOrders(); // Refresh orders list
  //   } catch (error) {
  //     console.error('Order failed:', error);
      
  //     setOrderSuccess({
  //       status: false,
  //       message: `Order failed: ${error.response?.data || 'Something went wrong'}`
  //     });
      
  //     setTimeout(() => {
  //       setOrderSuccess(null);
  //     }, 3000);
  //   }
  };
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentMethod('');
  };
  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
    setAddress({
      fullName: '',
      phone: '',
      addressLine: '',
      pincode: '',
    });
  };
  const handleAddressSubmit = () => {
    setSelectedAddress(address);
    setIsAddressModalOpen(false);
    setIsPaymentModalOpen(true);
  };
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };
  

  // Add the missing handlePageChange function
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   window.scrollTo(0, 0);
  // };

  // Filter handler functions
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  // Add form change handler
  const handleFormChange = (value) => {
    setForm(value);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleAvailabilityChange = (value) => {
    setAvailability(value);
  };
  
  // New functions for consumption tracking feature
  
  // Open consumption modal
  const openConsumptionModal = (order) => {
    setSelectedOrder(order);
    setConsumedQuantity(1); // Default to 1
     // Try to find the drug in our catalog
  const drugInfo = drugsCatalog[order.drugId];
  if (drugInfo) {
    // Pre-store drug info for later use
    setSelectedOrder({
      ...order,
      drugDetails: drugInfo
    });
  }
    setIsConsumptionModalOpen(true);
    setShowReplacementPrompt(false);
  };
  
  // Close consumption modal
  const closeConsumptionModal = () => {
    setIsConsumptionModalOpen(false);
    setSelectedOrder(null);
    setShowReplacementPrompt(false);
  };
  
  // Handle consumed quantity change
  const handleConsumedQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= selectedOrder.quantity) {
      setConsumedQuantity(value);
    }
  };
  
  // Increase consumed quantity
  const increaseConsumedQuantity = () => {
    if (consumedQuantity < selectedOrder.quantity) {
      setConsumedQuantity(prev => prev + 1);
    }
  };
  
  // Decrease consumed quantity
  const decreaseConsumedQuantity = () => {
    if (consumedQuantity > 1) {
      setConsumedQuantity(prev => prev - 1);
    }
  };
  
  // Submit consumption info
  const submitConsumption = async () => {
    try {
      const orderId = selectedOrder.id;
  
      await put(`/api/orders/${orderId}/consume`, {
        orderId: selectedOrder.id,
        consumedQuantity: consumedQuantity
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        }
      });
  
      // Calculate updated total consumption
      const previousConsumed = selectedOrder.consumedQuantity || 0;
      const updatedTotal = previousConsumed + consumedQuantity;
  
      // Update local order state
      const updatedOrders = userOrders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, consumedQuantity: updatedTotal }
          : order
      );
      setUserOrders(updatedOrders);
  
      // Fetch fresh orders (optional, but recommended for sync)
      fetchUserOrders();
  
      // Check if consumption is fully done
      if (updatedTotal === selectedOrder.quantity) {
        setOrderToReplace(selectedOrder); // Save order for replacement
        setShowReplacementPrompt(true);   // Trigger modal
      } else {
        setActionSuccess({
          status: true,
          message: `Consumption of ${consumedQuantity} unit${consumedQuantity === 1 ? '' : 's'} recorded successfully!`
        });
  
        setTimeout(() => {
          setActionSuccess(null);
          closeConsumptionModal();
        }, 2000);
      }
  
    } catch (error) {
      console.error('Failed to record consumption:', error);
      setActionSuccess({
        status: false,
        message: `Failed to record consumption: ${error.response?.data || 'Something went wrong'}`
      });
  
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    }
  };

  
  
  
  // Place replacement order
  const placeReplacementOrder = async () => {
    try {
      // Find the drug in our list that matches the ordered drug
      const drugToOrder = drugs.find(drug => drug.id === selectedOrder.drugId);
      
      if (!drugToOrder) {
        throw new Error("Could not find the medication in current inventory");
      }
      
      const payload = {
        userId: user.id,
        drugId: selectedOrder.drugId,
        drugName: selectedOrder.drugName,
        quantity: consumedQuantity, // Use the same quantity that was consumed
        isReplacement: true,
        originalOrderId: selectedOrder.id
      };
      
      await post('/api/orders/place', payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        }
      });
      
      setActionSuccess({
        status: true,
        message: `Replacement order for ${consumedQuantity} ${consumedQuantity === 1 ? 'unit' : 'units'} of ${selectedOrder.drugName} placed successfully!`
      });
      
      setTimeout(() => {
        setActionSuccess(null);
        closeConsumptionModal();
      }, 2000);
      
      fetchUserOrders(); // Refresh orders list
    } catch (error) {
      console.error('Replacement order failed:', error);
      setActionSuccess({
        status: false,
        message: `Replacement order failed: ${error.response?.data || 'Something went wrong'}`
      });
      
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    }
  };
  const [showConsumptionCompleteModal, setShowConsumptionCompleteModal] = useState(false);

 
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    pincode: '',
  });

  return (
    
    
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Medication Inventory</h1>
              <p className="text-blue-100 mt-2">Browse and search available medications</p>
            </div>
            <div className="flex space-x-4">
              {user && (
                <div className="flex items-center space-x-2 bg-blue-800 bg-opacity-40 rounded-lg px-4 py-2">
                  <span className="text-white">Welcome, {user.email}</span>
                </div>
              )}
              
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={() => setShowOrders(prev => !prev)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
              >
                📦 {showOrders ? "Hide Orders" : "Track Orders"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v7a1 1 0 11-2 0V4H5v16h9v-1a1 1 0 112 0v2a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" clipRule="evenodd" />
                  <path d="M16 12l-4-4v3H8v2h4v3l4-4z" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
  
        
        
          {/* Orders Display Section */}
{showOrders && (
  <div className="mb-8">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Orders</h2>
      
      {ordersLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : ordersError ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{ordersError}</p>
        </div>
      ) : userOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Medication</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Consumed Quantity</th> {/* New column */}
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Order Date</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
                <th className="py-3 px-4 font-semibold">Vendor Email</th>
                <th className="py-3 px-4 font-semibold">Vendor Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.drugName}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">{order.consumedQuantity || 0}</td> {/* Display consumed quantity */}
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      order.status === 'DELIVERED' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {order.status && order.status.toUpperCase() === 'DELIVERED' && (
                      <button
  onClick={() => {
    if ((order.consumedQuantity || 0) >= order.quantity) {
      setShowConsumptionCompleteModal(true);
    } else {
      openConsumptionModal(order);
    }
  }}
  disabled={order.status !== 'DELIVERED'}
  className={`${
    (order.consumedQuantity || 0) >= order.quantity
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-green-500 hover:bg-green-600'
  } text-white px-3 py-1 rounded-md text-sm transition-colors duration-200`}
>
  Consumption
</button>
                    )}
                  </td>
                  <td className="py-3 px-4"> {order.vendor?.email|| 'Unknown Vendor'}</td>
                <td className="py-3 px-4">{order.vendor?.phone|| 'Unknown Vendor'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)}
{showConsumptionCompleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Consumption Completed</h2>
      <p className="text-gray-700 mb-4">You've already consumed the full quantity for this order.</p>
      <div className="flex justify-end">
        <button
          onClick={() => setShowConsumptionCompleteModal(false)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Okay
        </button>
      </div>
    </div>
  </div>
)}


        {/* Filter Section */}
        <DrugFilter
          searchTerm={searchTerm}
          category={category}
          form={form}  
          formsList={formsList}  
          priceRange={priceRange}
          availability={availability}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onFormChange={handleFormChange} 
          onPriceRangeChange={handlePriceRangeChange}
          onAvailabilityChange={handleAvailabilityChange}
          onClearFilters={clearFilters}
        />
        
        
        {/* Notification Toast */}
        {(orderSuccess || actionSuccess) && (
          <div className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg z-50 ${
            (orderSuccess && orderSuccess.status) || (actionSuccess && actionSuccess.status)
              ? 'bg-green-100 border-l-4 border-green-500 text-green-700' 
              : 'bg-red-100 border-l-4 border-red-500 text-red-700'
          }`}>
            <div className="flex items-center">
              <span className="text-2xl mr-2">
                {(orderSuccess && orderSuccess.status) || (actionSuccess && actionSuccess.status) ? '✅' : '❌'}
              </span>
              <div>
                <p className="font-medium">
                  {orderSuccess 
                    ? (orderSuccess.status ? 'Order Placed Successfully' : 'Order Failed')
                    : (actionSuccess.status ? 'Action Successful' : 'Action Failed')
                  }
                </p>
                <p className="text-sm">{orderSuccess ? orderSuccess.message : actionSuccess.message}</p>
              </div>
            </div>
          </div>
        )}
        

          {/* Results Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredDrugs.length} Medications Found
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredDrugs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-lg text-gray-600">No medications found matching your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrugs
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((drug) => (
                    <DrugCard 
                      key={drug.id}
                      drug={drug}
                      onPlaceOrder={() => openOrderModal(drug)}
                    />
                  ))
                }
              </div>
            )}

            {/* Pagination */}
            {filteredDrugs.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
              <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
              itemsPerPage={itemsPerPage}
            />
              </div>
            )}
          </div>
        </div>

      {/* Order Quantity Modal */}
      {isOrderModalOpen && selectedDrug && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Order Quantity</h3>
              <div className="mt-4 px-4 py-3">
                <p className="text-sm text-gray-600 mb-4">
                  Please specify how many units of <span className="font-semibold">{selectedDrug.name}</span> you would like to order:
                </p>
                
                {/* Price information */}
                <div className="mb-4 p-2 bg-blue-50 rounded-md">
                  <p className="text-sm">
                    Price per unit: <span className="font-bold">
                      {selectedDrug && selectedDrug.price !== undefined ? 
                        `Rs${selectedDrug.price.toFixed(2)}` : 
                        'Price not available'}
                    </span>
                  </p>
                  <p className="text-sm font-medium text-blue-700">
                    {selectedDrug && selectedDrug.price !== undefined ? 
                      `Total: Rs${(selectedDrug.price * orderQuantity).toFixed(2)}` : 
                      'Total not available'}
                  </p>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-center mb-6">
                  <button 
                    onClick={decreaseQuantity}
                    className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={orderQuantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center py-1 border-t border-b border-gray-300"
                  />
                  <button 
                    onClick={increaseQuantity}
                    className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex justify-between mt-2">
                  <button
                    onClick={closeOrderModal}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={placeOrder}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{isPaymentModalOpen && selectedDrug && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
    <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Select Payment Method</h3>
        <div className="mt-4 px-4 py-3">
          <p className="text-sm text-gray-600 mb-4">
            Please select your preferred payment method for order of <span className="font-semibold">{orderQuantity}</span> units of <span className="font-semibold">{selectedDrug.name}</span>:
          </p>
          
          {/* Total price */}
          <div className="mb-4 p-2 bg-blue-50 rounded-md">
            <p className="text-sm font-medium text-blue-700">
              {selectedDrug && selectedDrug.price !== undefined ? 
                `Total: Rs${(selectedDrug.price * orderQuantity).toFixed(2)}` : 
                'Total not available'}
            </p>
          </div>
          {/* Delivery Address Modal */}
{isAddressModalOpen && selectedDrug && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
    <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Enter Delivery Address</h3>
        <div className="mt-4 px-4 py-3">
          <p className="text-sm text-gray-600 mb-4">
            Please provide your delivery address for ordering <span className="font-semibold">{orderQuantity}</span> units of <span className="font-semibold">{selectedDrug.name}</span>:
          </p>

          {/* Address Form */}
          <div className="flex flex-col space-y-3 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Address Line"
              rows="3"
              value={address.addressLine}
              onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between mt-2">
            <button
              onClick={closeAddressModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Back
            </button>
            <button
              onClick={handleAddressSubmit}
              disabled={!address.fullName || !address.phone || !address.addressLine || !address.pincode}
              className={`px-4 py-2 text-white rounded-md focus:outline-none ${
                address.fullName && address.phone && address.addressLine && address.pincode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

          {/* Payment Method Options */}
          <div className="flex flex-col space-y-3 mb-6">
            <button 
              onClick={() => handlePaymentMethodSelect('credit_card')}
              className={`flex items-center justify-between px-4 py-3 border rounded-md hover:bg-blue-50 transition-colors ${
                paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h12v2H6V6zm0 4h12v2H6v-2zm0 4h6v2H6v-2z" />
                </svg>
                <span>Credit Card</span>
              </div>
              {paymentMethod === 'credit_card' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <button 
              onClick={() => handlePaymentMethodSelect('debit_card')}
              className={`flex items-center justify-between px-4 py-3 border rounded-md hover:bg-blue-50 transition-colors ${
                paymentMethod === 'debit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h12v2H6V6zm0 4h12v2H6v-2zm0 4h6v2H6v-2z" />
                </svg>
                <span>Debit Card</span>
              </div>
              {paymentMethod === 'debit_card' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button 
    onClick={() => handlePaymentMethodSelect('upi')}
    className={`flex items-center justify-between px-4 py-3 border rounded-md hover:bg-blue-50 transition-colors ${
      paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
    }`}
  >
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z" />
      </svg>
      <span>UPI</span>
    </div>
    {paymentMethod === 'upi' && (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )}
  </button>
            
            <button 
              onClick={() => handlePaymentMethodSelect('cash_on_delivery')}
              className={`flex items-center justify-between px-4 py-3 border rounded-md hover:bg-blue-50 transition-colors ${
                paymentMethod === 'cash_on_delivery' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5h8.12c-.71.72-1.57 1.92-2.38 3.5H8.32c-.81-1.58-1.67-2.78-2.38-3.5zM4.5 9a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zm11 0a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5z" clipRule="evenodd" />
                  <path d="M12.832 12h-5.66a31.478 31.478 0 002.374 3.5H10.5a.5.5 0 110 1H10a.5.5 0 01-.5-.5V15h-1a1 1 0 01-1-1v-1h4.334l.498.99a1 1 0 00.166.01h2.102l.166-.01.498-.99H16v1a1 1 0 01-1 1h-1v.5a.5.5 0 01-.5.5h-.5a.5.5 0 110-1h.246A31.478 31.478 0 0012.832 12z" />
                </svg>
                <span>Cash on Delivery</span>
              </div>
              {paymentMethod === 'cash_on_delivery' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="flex justify-between mt-2">
            <button
              onClick={closePaymentModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Back
            </button>
            <button
              onClick={submitOrderWithPayment}
              disabled={!paymentMethod}
              className={`px-4 py-2 text-white rounded-md focus:outline-none ${
                paymentMethod ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      

      {/* Consumption Modal */}
      {isConsumptionModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              {!showReplacementPrompt ? (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Medication Consumption</h3>
                  <div className="mt-4 px-4 py-3">
                    <p className="text-sm text-gray-600 mb-4">
                      How much quantity of <span className="font-semibold">{selectedOrder.drugName}</span> have you consumed?
                    </p>
                    
                    {/* Order information */}
                    <div className="mb-4 p-2 bg-blue-50 rounded-md">
                      <p className="text-sm">
                        Total ordered quantity: <span className="font-bold">{selectedOrder.quantity} units</span>
                      </p>
                    </div>

                    {/* Quantity selector */}
                    <div className="flex items-center justify-center mb-6">
                      <button 
                        onClick={decreaseConsumedQuantity}
                        className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={selectedOrder.quantity}
                        value={consumedQuantity}
                        onChange={handleConsumedQuantityChange}
                        className="w-16 text-center py-1 border-t border-b border-gray-300"
                      />
                      <button 
                        onClick={increaseConsumedQuantity}
                        className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={closeConsumptionModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                      disabled={selectedOrder.fullyConsumed}
                        onClick={submitConsumption}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Place Replacement Order?</h3>
                  <div className="mt-4 px-4 py-3">
                    <p className="text-sm text-gray-600 mb-6">
                      Would you like to place a replacement order for <span className="font-semibold">{consumedQuantity} {consumedQuantity === 1 ? 'unit' : 'units'}</span> of <span className="font-semibold">{selectedOrder.drugName}</span>?
                    </p>
                    
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={closeConsumptionModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => {
                          // Get drug info either from the pre-stored details or from our catalog
                          const drugInfo = selectedOrder.drugDetails || drugsCatalog[selectedOrder.drugId];
                          
                          // Use what we know from the order
                          setSelectedDrug({
                            id: selectedOrder.drugId,
                            name: selectedOrder.drugName,
                            // Use our catalog price if available, otherwise set to 0 to avoid errors
                            price: drugInfo ? drugInfo.price : 0,
                          });
                          
                          // Set quantity to the consumed quantity by default
                          setOrderQuantity(consumedQuantity);
                          
                          // Close consumption modal and open order modal
                          setIsConsumptionModalOpen(false);
                          setIsOrderModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;