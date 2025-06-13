import React from "react";
import { Link } from "react-router-dom";

const StallCard = ({ stall }) => (
  <Link to={`/stalls/${stall._id}`}>
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      {stall.dishimage && (
        <img
          src={stall.dishimage}
          alt={stall.dishname}
          className="w-full h-40 object-cover mb-2 rounded"
        />
      )}
      <h3 className="text-lg font-semibold">{stall.dishname}</h3>
      <p className="text-gray-600">Stall: {stall.stallname}</p>
      <p className="text-gray-600">Area: {stall.area}</p>
      <p className="text-yellow-500">
        ⭐ {stall.numreviews > 0 ? Number(stall.averagerating).toFixed(1) : "No rating"}
      </p>
    </div>
  </Link>
);

export default StallCard;
