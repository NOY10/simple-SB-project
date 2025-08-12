import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostComments from './PostComments';
import { useComments } from 'api/social/post';

dayjs.extend(relativeTime);

const PostItem = ({ post, onLike, onComment, commentText, setCommentText, loading }) => {
  const [showComments, setShowComments] = useState(false);
  const [page, setPage] = useState(0);
  const [allComments, setAllComments] = useState(post.comments || []);

  const { comments: commentsData = [], loading: commentsLoading } = useComments(
    showComments ? post.id : null,
    page,
    5
  );

  useEffect(() => {
    if (commentsData.length > 0) {
      setAllComments(prev => {
        const ids = new Set(prev.map(c => c.id));
        const newOnes = commentsData.filter(c => !ids.has(c.id));
        return [...prev, ...newOnes];
      });
    }
  }, [commentsData]);

  const loadMoreComments = () => setPage(prev => prev + 1);
  const hasMoreComments = commentsData.length === 5;

  const addToLocalComments = (newComment) => {
    setAllComments(prev => [newComment, ...prev]);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-4">

      {/* Post Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div> 
          <p className="text-sm font-medium">{post.username || 'Anonymous'}</p>
          <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
        </div>   
      </div>
      {/* Post Content */}
      <p className="text-gray-800 mb-3">{post.content}</p>
      {post.image && (    
        <img
          src={post.image}     
          alt="Post"
          className="w-full h-auto rounded-lg mb-3"
        />
      )}    
  
      {/* Post Info */}
      <div className="flex justify-between border-t border-b border-gray-200 py-2 mb-2">
        <button onClick={() => onLike(post.id, post.likedByUser)}>
          👍 {post.likedByUser ? 'Unlike' : 'Like'} ({post.likesCount || 0})
        </button>
        <button onClick={() => setShowComments(prev => !prev)}>
          💬 Comment ({post?.commentsCount || 0})
        </button>
      </div>

      {showComments && (
        <PostComments
          postId={post.id}
          comments={allComments} // ✅ use local comments
          commentText={commentText}
          setCommentText={setCommentText}
          onComment={(postId) => onComment(postId, addToLocalComments)} // pass updater
          loading={loading || commentsLoading}
          onLoadMore={loadMoreComments}
          hasMoreComments={hasMoreComments}
        />
      )}
    </div>
  );
};


export default PostItem;
