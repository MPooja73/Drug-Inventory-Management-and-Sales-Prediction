import React from 'react';

const DrugFilter = ({
  searchTerm,
  category,
  form,
  formsList,
  priceRange,
  availability,
  categories,
  onSearchChange,
  onCategoryChange,
  onFormChange,
  onPriceRangeChange,
  onAvailabilityChange,
  onClearFilters
}) => { 
 
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0 md:space-x-6">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search medications..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Category Dropdown */}
        <div className="w-full md:w-48">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        {/* Form Dropdown */}
        <div className="w-full md:w-48">
          <label htmlFor="form" className="block text-sm font-medium text-gray-700 mb-1">
            Form
          </label>
          <select
            id="form"
            value={form}
            onChange={(e) => onFormChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Forms</option>
            {formsList.map((formItem) => (
              <option key={formItem} value={formItem}>
                {formItem}
                

              </option>
            ))}
          </select>
        </div>
        
        {/* Availability Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
        
        {/* Clear Filters Button */}
        <div className="w-full md:w-auto">
          <button
            onClick={onClearFilters}
            className="w-full md:w-auto px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Price Range Slider */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range: Rs{priceRange[0]} - Rs{priceRange[1]}
        </label>
        <div className="flex space-x-4">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
            className="w-1/2"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default DrugFilter;
