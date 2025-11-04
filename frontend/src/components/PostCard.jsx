import { useState } from "react";
import { FaRegComment, FaRegHeart, FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PostCard = ({
  post,
  editable = false, 
  onDelete = () => {}, 
  onEdit = () => {}
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || []);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [liked, setLiked] = useState(
    userId && post.likes.includes(userId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

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

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/posts/${post._id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

const handleLike = async () => {
  if (!token) return alert("You must be logged in to like posts!");

  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/posts/${post._id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update likes array and liked state from response
    setLikes(res.data.likes);
    setLiked(res.data.liked);
  } catch (err) {
    console.error("Error toggling like:", err);
  }
};



  const handleSaveEdit = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-zinc-900 text-white shadow-md rounded-xl p-4 w-full max-w-[600px] mx-auto border border-zinc-700 hover:shadow-xl transition">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-semibold text-sm">{post.name}</h2>
          <p className="text-xs text-zinc-400">{timeAgo(post.createdAt)}</p>
        </div>
        {editable && (
          <div className="flex items-center gap-3">
            {/* Edit Icon */}
            {!isEditing && (
              <FaEdit
                className="text-blue-400 hover:text-blue-500 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            )}

            {/* Delete Icon */}
            <FaTrash
              className="text-red-400 hover:text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-2 whitespace-pre-wrap wrap-break-words text-sm">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="bg-zinc-800 text-white p-2 rounded-md w-full"
              rows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => { setIsEditing(false); setEditContent(post.content); }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          post.content
        )}
      </div>

      {/* Like & Comment buttons */}
      <div className="flex items-center gap-6 mt-4 pt-2 border-t border-zinc-700">
        <button
          className={`flex items-center gap-2 ${liked ? "text-red-500" : "hover:text-blue-500"}`}
          onClick={handleLike}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="text-sm">{likes.length}</span>
        </button>

        <button
          className="flex items-center gap-2 hover:text-blue-500"
          onClick={() => setShowComments(!showComments)}
        >
          <FaRegComment /> <span className="text-sm">{comments.length}</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 border-t border-zinc-700 pt-3 space-y-3">

          {/* Comment Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-full border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 rounded-full hover:bg-blue-700 transition"
            >
              Post
            </button>
          </div>

          {/* Existing Comments */}
          <div className="max-h-64 overflow-y-auto space-y-2 mt-2">
            {comments.map((c, idx) => (
              <div
                key={idx}
                className={`flex flex-col p-2 rounded-lg ${
                  c.userId === userId ? "bg-blue-900" : "bg-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold text-sm text-white">{c.name}</span>
                  <span className="text-[10px]">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="text-sm text-white mt-1 whitespace-pre-wrap">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
