import React from 'react';

const PostForm = ({ newPostText, setNewPostText, handleCreatePost, loading }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Post</h2>
      <textarea
        className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder="What's on your mind?"
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={handleCreatePost}
          className={`${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-5 py-2 rounded-full transition font-semibold`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default PostForm;
