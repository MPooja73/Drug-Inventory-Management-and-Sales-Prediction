// src/api.js

const BASE_URL = 'http://localhost:8085'; // Your backend API URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { 'Authorization': `Bearer ${token}` }
    : {};
};

export const logout = () => {
  localStorage.removeItem('token');
  // You can add additional cleanup here if needed
  console.log('User logged out successfully');
};

export const get = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
export const gets = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Extract the JSON data here
    return data; // Return the actual data
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
export const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Check if the response has content and is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Return the text response as an object
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error('Error posting data: ', error);
    throw error;
  }
};

export const put = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Check if the response has content and is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Return the text response as an object
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error('Error putting data: ', error);
    throw error;
  }
};