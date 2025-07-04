  import { useState, useEffect } from 'react';
  import { Bell, Package, PlusCircle, ShoppingCart, Archive, Search, LogOut, User, ChevronDown, AlertTriangle } from 'lucide-react';
  import { get, post, put,logout } from '../../api'; 


  export default function VendorDashboard() {
    // State management
    const [activeTab, setActiveTab] = useState('inventory');
  
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vendorId, setVendorId] = useState(null); // Will be set from auth context
  
    
    const [notifications, setNotifications] = useState([
      { id: 1, message: 'Metformin is low on stock!', read: false, date: '2025-04-26' },
      { id: 2, message: 'New order #102 received', read: true, date: '2025-04-24' },
      { id: 3, message: 'Price update for Amoxicillin pending approval', read: false, date: '2025-04-22' },
    ]);
    
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    
    // Form state for adding new drug
    const [newDrug, setNewDrug] = useState({
      name: '',
      description: '',
      category: 'PAINKILLER',
      form: 'TABLET',
      price: 0,
      available: true,
      quantity: 0
    });
    
    // Calculate unread notifications
    const unreadNotificationsCount = notifications.filter(n => !n.read).length;
    // const formatAddress = (address) => {
    //   if (!address) return 'N/A';

    //   // If address is a string, return directly
    //   if (typeof address === 'string') return address;
    //   // const { fullName, phone, addressLine, pincode} = address;
    //   return `${address.fullName}, ${address.phone}, ${address.addressLine} - ${address.pincode}`;
    // };
    
     // New function to fetch orders for the vendor
     const fetchVendorOrders = async () => {
      try {
        setLoading(true);
        setError(null);
    
        // 🔥 Hit the secure backend endpoint that uses Principal to resolve vendor
        const response = await get(`/api/orders/vendor/my-orders`);
    
        if (response) {
          console.log(response);
          const formattedOrders = response.map(order => ({
            id: order.id,
            customer: order.user?.name || 'Unknown Customer',
            items: [{
              drugName: order.drugName || 'Unknown Drug',
              quantity: order.quantity || 1,
              seller: { name: 'Seller Not Available' }
            }],
            deliveryAddress: order.deliveryAddress,
            date: order.orderDate
              ? new Date(order.orderDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
            status: order.status || 'Pending'
            
          }));
    
          setOrders(formattedOrders);
        } else {
          console.error('Unexpected orders response format:', response);
          setError('Failed to load orders data');
        }
      } catch (error) {
        console.error('Error fetching vendor orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  // Function to update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      // Call the API to update the order status - adjust endpoint to match your backend
      await put(`/api/orders/${orderId}/status`, { status });
      
      // Update local state to reflect the change
      setOrders(orders.map(order => 
        order.id === orderId ? {...order, status} : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  }; // Load orders when the component mounts or when activeTab changes to 'orders'
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchVendorOrders();
    }
  }, [activeTab, vendorId]);
  
  
    
    
    // Filter inventory based on search term
    const filteredInventory = inventory.filter(drug => 
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.form.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const fetchInventory = async (page = 0, pageSize = 10) => {
      try {
        // The token is automatically included by getAuthHeaders() in your get function
        // so you don't need to handle it manually here
        const response = await get(`/api/drugs/my-drugs?page=${page}&size=${pageSize}`);
        
        // Check if the response has the expected structure
        if (response && response.data) {
          setInventory(response.data);
          return response.data;
        } else {
          console.error('Unexpected response format:', response);
          alert('Received unexpected data format from server');
          return null;
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        alert('Failed to fetch drug inventory');
        return null;
      }
    };
    
    // Add a new drug
    const handleAddDrug = async () => {
      try {
        const response = await post('/api/drugs/add', newDrug); // Assuming backend base path
    
        const updatedDrug = response.data; // Based on ApiResponse<T>
        alert(response.message); // Show success message
    
        setInventory(prev => {
          const exists = prev.find(d => d.name === updatedDrug.name);
          if (exists) {
            return prev.map(d => d.name === updatedDrug.name ? updatedDrug : d);
          }
          return [...prev, updatedDrug];
        });
    
        // Reset the form and close modal
        setNewDrug({
          name: '',
          description: '',
          category: 'PAINKILLER',
          form: 'TABLET',
          price: 0,
          available: true,
          quantity: 0
        });
        
        setShowUploadModal(false);
      } catch (error) {
        console.error('Error adding/updating drug:', error);
        alert('Failed to add/update drug');
      }
    };
    
    // Handle input changes for new drug form
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setNewDrug({
        ...newDrug,
        [name]: type === 'checkbox' ? checked : 
                name === 'quantity' ? parseInt(value, 10) : 
                name === 'price' ? parseFloat(value) : 
                value
      });
    };
    
    // Mark all notifications as read
    const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({...n, read: true})));
    };
    
    // // Update order status
    // const updateOrderStatus = (orderId, status) => {
    //   setOrders(orders.map(order => 
    //     order.id === orderId ? {...order, status} : order
    //   ));
    // };
    
    // Handle logout
    const handleLogout = async () => {
      try {
        await logout();
        window.location.href = '/';
        // Redirect will be handled by the logout function or AuthProvider
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Failed to log out. Please try again.');
      }
    };
    
    useEffect(() => {
      fetchInventory();
    }, [page]);

    // When modal is opened, prevent body scrolling
    useEffect(() => {
      if (showUploadModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      
      // Cleanup function
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [showUploadModal]);

     const handleForecast = () => {
    window.location.href='http://localhost:5000'
  };

    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-16 md:w-64 bg-blue-800 text-white flex flex-col">
          <div className="p-4 text-lg md:text-xl font-bold hidden md:block">MedVendor Dashboard</div>
          <div className="p-4 text-lg font-bold md:hidden text-center">MV</div>
          <nav className="mt-8 flex-1">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'inventory' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
            >
              <Package className="mx-auto md:mr-3 md:ml-0" size={20} />
              <span className="hidden md:inline">Inventory</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'orders' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
            >
              <ShoppingCart className="mx-auto md:mr-3 md:ml-0" size={20} />
              <span className="hidden md:inline">Orders</span>
            </button>
            
            {/* <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'notifications' ? 'bg-blue-900' : 'hover:bg-blue-700'} relative`}
            >
              <Bell className="mx-auto md:mr-3 md:ml-0" size={20} />
              <span className="hidden md:inline">Notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 md:static md:ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {unreadNotificationsCount}
                </span>
              )}
            </button> */}
          </nav>
          <div className="p-4">
            <button 
              className="flex items-center text-white hover:text-gray-300 w-full justify-center md:justify-start"
              onClick={handleLogout}
            >
              <LogOut className="md:mr-2" size={20} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2 text-gray-400" size={20} />
            </div>
            
            <div className="flex items-center space-x-4 ml-4">
              <div className="relative">
                {/* <button 
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                >
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button> */}
                
                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-2">
                    <div className="flex justify-between items-center p-2 border-b">
                      <h3 className="font-medium">Notifications</h3>
                      <button 
                        className="text-xs text-blue-600 hover:text-blue-800"
                        onClick={markAllAsRead}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.slice(0, 5).map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-2 border-b text-sm ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                        >
                          <div className="font-medium">{notification.message}</div>
                          <div className="text-xs text-gray-500">{notification.date}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center">
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setActiveTab('notifications');
                          setShowNotificationsDropdown(false);
                        }}
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleForecast}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
              >
                
                Forecast
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="font-medium hidden md:inline">Vendor Admin</span>
                
              </div>
            </div>
          </header>
          
          {/* Content Area */}
          <main className="flex-1 overflow-auto p-2 md:p-6">
            {activeTab === 'inventory' && (
              <div>
                <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                  <h1 className="text-xl md:text-2xl font-bold">Drug Inventory</h1>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center text-sm md:text-base"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <PlusCircle size={18} className="mr-1 md:mr-2" />
                    Add New Drug
                  </button>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInventory.map((drug) => (
                        <tr key={drug.id}>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{drug.name}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4">
                            <div className="text-sm text-gray-500 max-w-xs md:max-w-md truncate">{drug.description}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{drug.category}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{drug.quantity} units</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{drug.form}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Rs{drug.price.toFixed(2)}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            {!drug.available ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Unavailable
                              </span>
                            ) : drug.quantity <= drug.lowStockThreshold ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                In Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-xl md:text-2xl font-bold">Received Orders</h1>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Address</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">#{order.id}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.customer}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4">
  <div className="text-sm text-gray-500">
    {order.items.map((item, idx) => (
      <div key={idx}>
      
        {item.drugName} (x{item.quantity})
        {/* <span className="block text-xs text-gray-400">Sold by: {item.seller?.name}</span> */}
      </div>
    ))}
  </div>
</td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.date}</div>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm">
                            <select 
                              className="border rounded px-2 py-1 text-sm"
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-700">
  {order.deliveryAddress || 'N/A'}
</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                  <h1 className="text-xl md:text-2xl font-bold">Notifications</h1>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
                    onClick={markAllAsRead}
                  >
                    Mark All as Read
                  </button>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 md:p-4 flex items-start ${notification.read ? '' : 'bg-blue-50'}`}
                    >
                      {notification.message.includes('low on stock') ? (
                        <AlertTriangle className="mr-3 text-yellow-500 flex-shrink-0" size={24} />
                      ) : notification.message.includes('order') ? (
                        <Package className="mr-3 text-blue-500 flex-shrink-0" size={24} />
                      ) : (
                        <Bell className="mr-3 text-gray-500 flex-shrink-0" size={24} />
                      )}
                      
                      <div className="flex-1">
                        <div className="font-medium">{notification.message}</div>
                        <div className="text-sm text-gray-500 mt-1">{notification.date}</div>
                      </div>
                      
                      {!notification.read && (
                        <span className="bg-blue-500 w-2 h-2 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
        
        {/* Add Drug Modal - Fixed position with scrollable content */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-screen overflow-hidden flex flex-col">
              <h2 className="text-lg md:text-xl font-bold mb-4">Add New Drug</h2>
              
              {/* Scrollable form area */}
              <div className="overflow-y-auto flex-1 pr-1">
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drug Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newDrug.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter drug name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newDrug.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Enter drug description"
                      maxLength="1000"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        name="category"
                        value={newDrug.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="PAINKILLER">PAINKILLER</option>
                        <option value="ANTIBIOTIC">ANTIBIOTIC</option>
                        <option value="SUPPLEMENT">SUPPLEMENT</option>
                        <option value="ANTIHISTAMINE">ANTIHISTAMINE</option>
                        <option value="VITAMIN">VITAMIN</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Form *</label>
                      <select
                        name="form"
                        value={newDrug.form}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="TABLET">TABLET</option>
                        <option value="SYRUP">SYRUP</option>
                        <option value="INJECTION">INJECTION</option>
                        <option value="CAPSULE">CAPSULE</option>
                        <option value="DROPS">DROPS</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs) *</label>
                      <input
                        type="number"
                        name="price"
                        value={newDrug.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                      <input
                        type="number"
                        name="quantity"
                        value={newDrug.quantity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="available"
                      name="available"
                      checked={newDrug.available}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                      Available for Purchase
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Fixed footer with action buttons */}
              <div className="mt-4 pt-3 border-t flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleAddDrug}
                >
                  Add Drug
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }