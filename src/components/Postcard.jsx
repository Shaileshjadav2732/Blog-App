import React from "react";
import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block transform transition duration-300 hover:scale-105"
    >
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
