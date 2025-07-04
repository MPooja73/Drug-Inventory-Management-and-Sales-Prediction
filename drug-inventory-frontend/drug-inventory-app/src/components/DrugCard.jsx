import React from 'react';

const DrugCard = ({ drug, onPlaceOrder }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className={`h-2 ${drug.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{drug.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            drug.available
               ? 'bg-green-100 text-green-800'
               : 'bg-red-100 text-red-800'
          }`}>
            {drug.available ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
         
        <p className="mt-2 text-sm text-gray-600">{drug.description}</p>
         
        <div className="mt-3 text-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Category</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{drug.category}</span>
          </div>
          
          {/* Add Form display if available */}
          {drug.form && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Form</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">{drug.form}</span>
            </div>
          )}

          {/* Add Stock Count display */}
          <div className="flex justify-between items-center mb-2">
  <span className="text-sm">Available Stock</span>
  <span className={`px-3 py-1 text-sm rounded-full ${
    drug.quantity > 10 
      ? 'bg-green-100 text-green-800' 
      : drug.quantity > 0 
        ? 'bg-yellow-100 text-yellow-800' 
        : 'bg-red-100 text-red-800'
  }`}>
    {drug.quantity || 0} units
  </span>
</div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Price</span>
            <span className="font-semibold">₹{drug.price.toFixed(2)}</span>
          </div>
        </div>
         
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={() => onPlaceOrder(drug)}
            className={`w-full py-2 rounded-md text-center font-medium ${
              drug.available
                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!drug.available}
          >
            {drug.available ? 'Place Order' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrugCard;