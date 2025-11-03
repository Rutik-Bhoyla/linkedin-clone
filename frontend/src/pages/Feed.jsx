import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch posts from backend
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
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <Navbar/>
      <h1 className="text-2xl font-bold mb-4">LinkedIn Feed</h1>

      {/* Render all posts */}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* Floating Create Post Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <CreatePost closeModal={() => setIsOpen(false)} addPost={addPost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
