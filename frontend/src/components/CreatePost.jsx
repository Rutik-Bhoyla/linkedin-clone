import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreatePost = ({ closeModal, addPost }) => {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BACKEND_URL}/api/posts`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add new post to feed instantly
      addPost(res.data);

      setContent("");
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg text-white ">Create a Post</h2>

      <textarea
        className="w-full min-h-72 border border-zinc-600 text-white rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500 placeholder:text-zinc-300"
        rows={4}
        placeholder="What do you want to talk about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      
      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-6 py-1 rounded-4xl hover:bg-blue-700 transition"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
