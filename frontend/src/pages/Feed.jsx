import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);

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
    <div className="min-h-screen bg-black mt-2">
      <Navbar />

      {/* Main layout */}
      <div className="pt-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3">

        {/* Left Column: Sticky CreatePost */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-zinc-900 text-white p-4 rounded-lg shadow-md h-[430px]">
            <CreatePost addPost={addPost} />
          </div>
        </div>

        {/* Right Column: Scrollable Feed */}
        <div className="md:col-span-2 space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Feed;
