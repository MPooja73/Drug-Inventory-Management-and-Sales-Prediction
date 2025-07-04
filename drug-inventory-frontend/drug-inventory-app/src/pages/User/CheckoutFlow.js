// CheckoutFlow.jsx
import React, { useState } from 'react';

const CheckoutFlow = ({ onComplete, onCancel }) => {
  // State management
  const [currentStep, setCurrentStep] = useState('address'); // 'address' or 'payment'
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Address form state
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  // Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value
    });
  };

  // Handle proceed to payment
  const proceedToPayment = (e) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  // Handle back to address
  const backToAddress = () => {
    setCurrentStep('address');
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  // Handle final order submission
  const submitOrderWithPayment = () => {
    // Call the callback with the order details
    onComplete({
      shippingAddress: addressForm,
      paymentMethod: paymentMethod
    });
  };

  // Close the checkout modal
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // Check if address form is complete
  const isAddressFormComplete = () => {
    const requiredFields = ['fullName', 'addressLine1', 'city', 'state', 'zipCode', 'phone'];
    return requiredFields.every(field => addressForm[field].trim() !== '');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {currentStep === 'address' ? 'Shipping Address' : 'Payment Method'}
            </h2>
            <button 
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Step indicator */}
          <div className="flex justify-between mb-6">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'address' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
              }`}>
                1
              </div>
              <span className="text-sm mt-1">Address</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`flex-1 h-0.5 ${
                currentStep === 'payment' ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'payment' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
              }`}>
                2
              </div>
              <span className="text-sm mt-1">Payment</span>
            </div>
          </div>

          {/* Address Form */}
          {currentStep === 'address' && (
            <form onSubmit={proceedToPayment}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={addressForm.fullName}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={addressForm.addressLine1}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={addressForm.addressLine2}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={addressForm.zipCode}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isAddressFormComplete()}
                  className={`px-4 py-2 text-white rounded-md focus:outline-none ${
                    isAddressFormComplete() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                  }`}
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* Payment Method Options */}
          {currentStep === 'payment' && (
            <>
              <div className="flex flex-col space-y-3 mb-6">
                <button 
                  type="button"
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
                  type="button"
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
                  type="button"
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
                  type="button"
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
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={backToAddress}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Back to Address
                </button>
                <button
                  type="button"
                  onClick={submitOrderWithPayment}
                  disabled={!paymentMethod}
                  className={`px-4 py-2 text-white rounded-md focus:outline-none ${
                    paymentMethod ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                  }`}
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;