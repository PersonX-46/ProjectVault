"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaBook, FaEllipsisV, FaFileDownload } from "react-icons/fa";
import { useSession } from "next-auth/react";

export function ProjectCard({ project, studentId }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(
    project.ProjectLike?.some(like => like.student_id === studentId) || false
  );
  const [likeCount, setLikeCount] = useState(project.ProjectLike?.length || 0);
  const [comments, setComments] = useState(project.ProjectComment || []);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    try {
      const response = await fetch(`/api/project/${project.id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          content: newComment 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // First check if there's a response body
      const text = await response.text();
      const newCommentData = text ? JSON.parse(text) : null;
  
      if (newCommentData) {
        setComments([...comments, {
          ...newCommentData,
          createdAt: new Date().toISOString(),
          student: { name: session?.user?.name || "You" }
        }]);
        setNewComment("");
        setCommentCount(commentCount + 1);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert(`Failed to post comment: ${error.message}`);
    }
  };
  
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/project/${project.id}/like`, {
        method: isLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
      alert("Failed to update like");
    }
  };
  
  const handleBorrowRequest = async () => {
    if (confirm("Request to borrow this project report?")) {
      try {
        const response = await fetch(`/api/project/${project.id}/borrow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          alert("Borrow request submitted successfully!");
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Failed to submit borrow request");
        }
      } catch (error) {
        console.error("Error requesting to borrow:", error);
        alert("Failed to submit borrow request");
      }
    }
  };

  const handleDownloadReport = () => {
    if (project.report_url) {
      window.open(project.report_url, '_blank');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-red-900/50 transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <button className="text-gray-400 hover:text-white">
            <FaEllipsisV />
          </button>
        </div>
        
        <p className="mt-2 text-gray-300">{project.description}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-400">
          <span>By: {project.student?.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{likeCount}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
            >
              <FaComment />
              <span>{commentCount}</span>
            </button>
          </div>

          {project.report_url && (
            <div className="flex space-x-2">
              <button 
                onClick={handleDownloadReport}
                className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-blue-900/30"
              >
                <FaFileDownload />
                <span>View Report</span>
              </button>
              <button 
                onClick={handleBorrowRequest}
                className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg hover:shadow-red-900/30"
              >
                <FaBook />
                <span>Borrow</span>
              </button>
            </div>
          )}
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  required
                />
                <button 
                  type="submit"
                  className="px-3 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium text-white">{comment.student?.name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-200">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No comments yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}