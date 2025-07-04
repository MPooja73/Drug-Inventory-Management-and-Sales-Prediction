// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <div className="p-4 bg-gray-100 h-full min-h-screen w-64 shadow-md">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        {role === 'USER' && (
          <>
            <li><Link to="/dashboard/user" className="block p-2 hover:bg-gray-200">My Drugs</Link></li>
            {/* Add more user-specific links */}
          </>
        )}
        {role === 'VENDOR' && (
          <>
            <li><Link to="/dashboard/vendor" className="block p-2 hover:bg-gray-200">Manage Stock</Link></li>
            {/* Add more vendor-specific links */}
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
