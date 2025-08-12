import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { createPost, usePosts } from '../../api/social/post';
import { likePost, unlikePost } from '../../api/social/like';
import { createComment } from '../../api/social/comment';
import useAuth from 'hooks/useAuth';
import PostForm from './PostForm';
import PostItem from './PostItem';

function Posts() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [newPostText, setNewPostText] = useState('');
  const [commentText, setCommentText] = useState({}); // 🔹 per post comment text

  // Fetch posts with pagination
  const { posts, loading: postsLoading } = usePosts(page, 5);

  // Append posts when fetched
  useEffect(() => {
    if (Array.isArray(posts) && posts.length) {
      const normalized = posts.map(p => ({
        ...p,
        comments: p.comments || [], // 🔹 ensure comments array exists
      }));
      setAllPosts(prev => [...prev, ...normalized]);
      if (posts.length < 5) setHasMore(false);
    }
  }, [posts]);

  const fetchMorePosts = () => {
    setPage(prev => prev + 1);
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return alert('Post content cannot be empty!');

    const payload = { content: newPostText, createdAt: new Date().toISOString() };
    setLoading(true);

    try {
      const res = await createPost(payload);
      setLoading(false);

      if (res.success) {
        const newPost = {
          id: res.data?.id || Date.now(),
          username: user?.username || 'Anonymous',
          content: newPostText,
          likesCount: 0,
          commentsCount: 0,
          createdAt: payload.createdAt,
          comments: [],
        };
        setAllPosts(prev => [newPost, ...prev]);
        setNewPostText('');
      } else {
        alert(`❌ Failed: ${res.error}`);
      }
    } catch {
      setLoading(false);
      alert('❌ Something went wrong.');
    }
  };

  const handleLike = async (id, isLiked) => {
    try {
      let res = isLiked ? await unlikePost(id) : await likePost(id);
      if (res.success) {
        setAllPosts(prev =>
          prev.map(post =>
            post.id === id
              ? { ...post, likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1, likedByUser: !isLiked }
              : post
          )
        );
      }
    } catch {
      alert('❌ Something went wrong.');
    }
  };

const handleComment = async (postId, addToLocal) => {
  if (!commentText[postId]?.trim()) return alert('Comment cannot be empty!');

  const payload = { content: commentText[postId], postId, createdAt: new Date().toISOString() };
  setLoading(true);

  try {
    const res = await createComment(payload);
    setLoading(false);

    if (res.success) {
      const newComment = {
        id: res.data?.id || Date.now(),
        username: user?.username || 'Anonymous',
        content: commentText[postId],
        createdAt: payload.createdAt,
      };

      // ✅ update comments count in Posts state
      setAllPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
            : post
        )
      );

      // ✅ immediately update PostItem’s local UI
      if (typeof addToLocal === 'function') {
        addToLocal(newComment);
      }

      setCommentText(prev => ({ ...prev, [postId]: '' }));
    }
  } catch {
    setLoading(false);
    alert('❌ Something went wrong.');
  }
};


  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <PostForm
        newPostText={newPostText}
        setNewPostText={setNewPostText}
        handleCreatePost={handleCreatePost}
        loading={loading}
      />

      {postsLoading && page === 0 ? (
        <p className="text-center text-gray-500 mt-10">Loading posts...</p>
      ) : (
        <InfiniteScroll
          dataLength={allPosts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<p className="text-center text-gray-500 mt-4">Loading more posts...</p>}
          endMessage={<p className="text-center text-gray-500 mt-4">No more posts</p>}
        >
          {allPosts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              user={user}
              onLike={() => handleLike(post.id, post.likedByUser)}
              onComment={(postId, addToLocal) => handleComment(postId, addToLocal)} // ✅ pass updater
              commentText={commentText}
              setCommentText={setCommentText}
              loading={loading}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Posts;
