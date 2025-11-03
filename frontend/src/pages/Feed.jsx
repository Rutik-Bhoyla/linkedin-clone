import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { FaPlus } from "react-icons/fa";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false); 

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setShowCreatePost(false); // Auto-close popup after creating post
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Main layout */}
      <div className="pt-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3">

        {/* Left Column (only visible on desktop) */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-20 bg-zinc-900 text-white p-4 rounded-lg shadow-md">
            <CreatePost addPost={addPost} />
          </div>
        </div>

        {/* Right Column: Posts */}
        <div className="md:col-span-2 space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Floating + Button (only on mobile) */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-6 right-6 md:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
      >
        <FaPlus className="text-xl" />
      </button>

     {/* Popup Modal for CreatePost (Mobile) */}
{showCreatePost && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
    <div className="relative bg-zinc-900 p-4 rounded-xl shadow-lg w-[90%] max-w-md">

      <button
        onClick={() => setShowCreatePost(false)}
        className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl font-bold"
      >
        ✖
      </button>
      <CreatePost addPost={addPost} />
    </div>
  </div>
)}

    </div>
  );
};

export default Feed;
