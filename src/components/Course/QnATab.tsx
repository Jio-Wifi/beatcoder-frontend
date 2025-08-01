import React, { useEffect, useState } from "react";
import { FaReply, FaEllipsisV } from "react-icons/fa";
import { useUser } from "../../hooks/user/userUser";

interface Comment {
  id: string;
  text: string;
  userId: string;
  parentId?: string;
  timestamp: string;
}

const QnATab: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { user } = useUser()

  const userId = `${user?.name}`; // Replace with actual user ID from auth system

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("qna-comments");
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("qna-comments", JSON.stringify(comments));
  }, [comments]);

  const getUserInitials = (id: string) => {
    const parts = id.split("-");
    return parts.length >= 2
      ? parts[1].substring(0, 2).toUpperCase()
      : id.substring(0, 2).toUpperCase();
  };

  const handlePost = () => {
    if (!newComment.trim()) return;

    const newEntry: Comment = {
      id: Date.now().toString(),
      text: newComment,
      userId,
      timestamp: new Date().toISOString(),
      ...(replyTo ? { parentId: replyTo } : {}),
    };

    setComments([...comments, newEntry]);
    setNewComment("");
    setReplyTo(null);
  };

  const handleDelete = (id: string) => {
    const toDeleteIds = [id, ...comments.filter(c => c.parentId === id).map(c => c.id)];
    setComments(comments.filter(c => !toDeleteIds.includes(c.id)));
  };

  const handleEdit = () => {
    if (!editText.trim() || !editingCommentId) return;
    setComments(prev =>
      prev.map(c => (c.id === editingCommentId ? { ...c, text: editText } : c))
    );
    setEditingCommentId(null);
    setEditText("");
  };

  const handleReply = (id: string) => {
    setReplyTo(id);
    setNewComment("");
  };

  const renderComment = (comment: Comment) => {
    const isOwner = comment.userId === userId;
    const isEditing = editingCommentId === comment.id;
    const replies = comments.filter(c => c.parentId === comment.id);

    return (
      <div key={comment.id} className="mb-4 ml-0 md:ml-4">
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-semibold">
            {getUserInitials(comment.userId)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {comment.userId}
                </div>
                {isEditing ? (
                  <>
                    <textarea
                     aria-label="editText"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={handleEdit}
                        className="text-xs text-white bg-accent px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="text-xs text-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {comment.text}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(comment.timestamp).toLocaleString()}
                    </div>
                  </>
                )}
              </div>

              {isOwner && (
                <div className="relative">
                  <button
                   aria-label="editComment"
                    onClick={() =>
                      setEditingCommentId(
                        editingCommentId === comment.id ? null : comment.id
                      )
                    }
                    className="text-gray-500 hover:text-accent"
                  >
                    <FaEllipsisV size={14} />
                  </button>

                  {editingCommentId === comment.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 shadow rounded z-10">
                      <button
                        onClick={() => {
                          setEditText(comment.text);
                          setEditingCommentId(comment.id);
                        }}
                        className="block w-full text-left text-sm px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="block w-full text-left text-sm px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!isEditing && (
              <button
                onClick={() => handleReply(comment.id)}
                className="flex items-center gap-1 text-xs mt-1 text-gray-600 dark:text-gray-400 hover:text-accent"
              >
                <FaReply size={12} /> Reply
              </button>
            )}
          </div>
        </div>

        {replies.length > 0 && (
          <div className="mt-2 ml-6 border-l pl-4">
            {replies.map(renderComment)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="text-sm text-gray-800 dark:text-gray-200">
      <h3 className="font-semibold mb-3">Questions & Answers</h3>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={
          replyTo
            ? "Write your reply..."
            : "Ask a question or start a discussion..."
        }
        className="w-full border dark:border-gray-600 rounded p-2 mb-2 text-sm dark:bg-dark"
        rows={2}
      />

      <div className="flex justify-between mb-4">
        <button
          onClick={handlePost}
          className="bg-accent text-white px-3 py-1 rounded text-sm"
        >
          {replyTo ? "Reply" : "Ask"}
        </button>
        {replyTo && (
          <button
            onClick={() => setReplyTo(null)}
            className="text-xs text-gray-500"
          >
            Cancel reply
          </button>
        )}
      </div>

      <div>{comments.filter(c => !c.parentId).map(renderComment)}</div>
    </div>
  );
};

export default QnATab;
