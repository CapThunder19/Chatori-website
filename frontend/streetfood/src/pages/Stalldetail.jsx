import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import StarRating from "../components/StarRating";

const StallDetails = () => {
  const { stallId } = useParams();
  const [stall, setStall] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ username: "", rating: "", comment: "" });

  useEffect(() => {
    fetchStall();
    fetchReviews();
  }, [stallId]);

  const fetchStall = async () => {
    const res = await axios.get(`/api/stalls/${stallId}`);
    setStall(res.data);
  };

  const fetchReviews = async () => {
    const res = await axios.get(`/api/stalls/${stallId}/reviews`);
    setReviews(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReview = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`/api/stalls/${stallId}/reviews`, form);
    setForm({ username: "", rating: "", comment: "" });
    fetchReviews();
  } catch (err) {
    console.error("Failed to submit review:", err.response?.data || err.message);
    alert("Failed to submit review. Please try again.");
  }
};


  if (!stall) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{stall.dishname}</h2>
      <img src={stall.dishimage} alt={stall.dishname} className="w-full rounded mb-4" />
      <p><strong>Stall:</strong> {stall.stallname}</p>
      <p><strong>Area:</strong> {stall.area}</p>
      <p><strong>Phone:</strong> {stall.phonenumber}</p>
      <p><strong>Opening Hours:</strong> {stall.openinghours}</p>
      <p><strong>Rating:</strong> {stall.rating || "No rating yet"}</p>

      
      {stall.location?.coordinates && (
        <MapContainer
          center={[stall.location.coordinates[1], stall.location.coordinates[0]]}
          zoom={15}
          style={{ height: "300px", width: "100%" }}
          className="mt-4"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[stall.location.coordinates[1], stall.location.coordinates[0]]}>
            <Popup>{stall.stallname}</Popup>
          </Marker>
        </MapContainer>
      )}

      
      {/* ➕ Add Review */}
      <form onSubmit={submitReview} className="mt-4 space-y-2">
        <input
          type="text"
          name="username"
          placeholder="Your Name"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <div>
  <label className="block mb-1 font-medium">Your Rating</label>
  <StarRating
    value={Number(form.rating)}
    onChange={(star) => setForm({ ...form, rating: star })}
  />
</div>
        <textarea
          name="comment"
          placeholder="Your review"
          value={form.comment}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit Review
        </button>
      </form>

      {/* 📝 Reviews */}
      <h3 className="mt-6 text-xl font-semibold">Reviews</h3>
      {reviews.map((r) => (
        <div key={r._id} className="border p-2 my-2 rounded">
          <p className="font-semibold">{r.username} - ⭐ {r.rating}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default StallDetails;
