import React from 'react';

const PostComments = ({
  postId,
  comments,
  commentText,
  setCommentText,
  onComment,
  loading,
  onLoadMore,
  hasMoreComments
}) => {
  console.log(comments, 'Comments in PostComments');
  return (
    <>
      {/* Comment Input */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          value={commentText[postId] || ''} // ✅ controlled per post
            onChange={(e) =>
            setCommentText(prev => ({ ...prev, [postId]: e.target.value }))
          }
          disabled={loading}
        />
        <button
          onClick={() => onComment(postId)}
          className={`${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded-full transition font-medium`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Comment'}
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-2">
    
        {comments.map((c, i) => (
          <div
            key={c.id || i}
            className="flex items-start space-x-2 bg-gray-100 px-3 py-2 rounded-md"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div>
              <p className="text-sm text-gray-800 font-medium">{c.username || 'Anonymous'}</p>
              <p className="text-sm text-gray-600">{c.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreComments && (
        <div className="text-center mt-3">
          <button
            onClick={() => onLoadMore(postId)}
            className="text-sm text-green-600 hover:underline"
          >
            Load more comments
          </button>
        </div>
      )}
    </>
  );
};

export default PostComments;
