import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/posts/myposts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (postId, newContent) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/posts/${postId}`,
        { content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map(p => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold text-white mb-4">My Posts</h1>

        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            editable={true}
            onDelete={() => handleDelete(post._id)}
            onEdit={(newContent) => handleEdit(post._id, newContent)}
          />
        ))}

        {posts.length === 0 && (
          <p className="text-white text-center mt-10">You haven't posted anything yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
