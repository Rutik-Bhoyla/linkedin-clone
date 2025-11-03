import { useState } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  // Format timestamp like LinkedIn
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
    for (let interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  // Add comment to backend
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments(res.data); // update comment list
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4 w-full max-w-[600px] mx-auto border">

      {/* Username + Timestamp */}
      <div>
        <h2 className="font-semibold text-gray-900 text-sm">{post.name}</h2>
        <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
      </div>

      {/* Content */}
      <div className="mt-3 text-gray-800 whitespace-pre-wrap break-word text-sm">{post.content}</div>

      {/* Icons (Like & Comment) */}
      <div className="flex items-center gap-6 mt-4 text-gray-600">
        <button className="flex items-center gap-1 hover:text-blue-500">
          <FaRegHeart /> <span className="text-sm">Like</span>
        </button>
        <button
          className="flex items-center gap-1 hover:text-blue-500"
          onClick={() => setShowComments(!showComments)}
        >
          <FaRegComment /> <span className="text-sm">{comments.length}</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 border-t pt-3 space-y-2">
          {/* Username on top */}
          <p className="font-semibold text-gray-900 text-sm">{post.user?.name}</p>

          {/* Comment input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-l-md px-3 py-1 text-sm focus:outline-none"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
            >
              Post
            </button>
          </div>

          {/* Show existing comments */}
          <div className="max-h-32 overflow-auto mt-2 space-y-1">
            {comments.map((c, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold">{c.name}: </span>
                {c.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
