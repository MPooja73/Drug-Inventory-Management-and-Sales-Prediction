import React from 'react';

const MedicationResults = ({ 
  filteredDrugs, 
  isLoading, 
  currentPage, 
  setCurrentPage, 
  itemsPerPage = 6,
  clearFilters,
  openOrderModal 
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredDrugs.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">
        {filteredDrugs.length} Medications Found
      </h2>

      {/* Loading */}
      {isLoading ? (
        <div className="text-center py-20">Loading medications...</div>
      ) : filteredDrugs.length === 0 ? (
        <div className="text-center bg-white p-10 rounded shadow">
          <p className="text-gray-600 mb-4">No medications found matching your filters.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Medications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrugs
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((drug) => (
                <MedicationCard
                  key={drug.id}
                  drug={drug}
                  onClick={() => openOrderModal(drug)}
                />
              ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 rounded ${
                    currentPage === number ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const MedicationCard = ({ drug, onClick }) => (
  <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
    <h3 className="font-bold text-lg mb-2">{drug.name}</h3>
    <p className="text-sm text-gray-700">{drug.dosage}</p>
    <p className="text-sm text-gray-500">{drug.description}</p>
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Click to order
    </button>
  </div>
);

export default MedicationResults;
