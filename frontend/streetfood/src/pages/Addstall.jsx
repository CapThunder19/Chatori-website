import React, { useState } from 'react';
import axios from 'axios';

const AddStall = () => {
  const [formData, setFormData] = useState({
    stallname: '',
    dishname: '',
    area: '',
    openinghours: '',
    phonenumber: '',
    dishimage: null,
    lng: '',
    lat: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'dishimage') {
      setFormData({ ...formData, dishimage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }

      const token = localStorage.getItem('token');

      const res = await axios.post('https://chatori-website.onrender.com/api/stalls', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Stall added successfully!');
      setFormData({
        stallname: '',
        dishname: '',
        area: '',
        openinghours: '',
        phonenumber: '',
        dishimage: null,
        lng: '',
        lat: ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add stall');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Stall</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="stallname"
          placeholder="Stall Name"
          value={formData.stallname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="dishname"
          placeholder="Dish Name"
          value={formData.dishname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="openinghours"
          placeholder="Opening Hours"
          value={formData.openinghours}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phonenumber"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={handleChange}
          step="any"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={handleChange}
          step="any"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="dishimage"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Stall
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default AddStall;
