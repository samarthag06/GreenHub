import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, deletePost } from '../api/community';

function Community() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [localUser, setLocalUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState({ content: '' });

  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to track last post
  const parallaxRef = useRef<HTMLDivElement>(null); // Ref for parallax background

  // ✅ Redirect if user is not logged in
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setLocalUser(JSON.parse(userString));
    } else {
      navigate('/login'); // Redirect to login if no user is found
    }
  }, [navigate]);

  // ✅ Fetch posts only if user exists
  const { data: posts } = useQuery({
    queryKey: ['communityPosts'],
    queryFn: getPosts,
    enabled: !!localUser, // Prevents API call if user is not logged in
  });

  const addPostMutation = useMutation({
    mutationFn: () => createPost({ content: newMessage.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
      setNewMessage({ content: '' });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.content.trim()) {
      addPostMutation.mutate();
    }
  };
  

  // ✅ Scroll to the last post whenever posts change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [posts]);

  // ✅ Parallax Effect on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`; // Adjust the multiplier for parallax speed
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Prevent rendering before redirect
  if (!localUser) {
    return null;
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
          transition: 'transform 0.1s ease-out', // Smooth parallax movement
        }}
      ></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col h-full relative z-10">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Green Community</h1>

        {/* Posts List with Auto-Scrolling */}
        <div className="flex-grow h-0 overflow-y-auto flex flex-col px-2 mt-4 space-y-4 scrollbar pb-24">
          {posts?.length === 0 && (
            <p className="text-center text-gray-500">No posts yet. Be the first to post!</p>
          )}

          {posts?.slice().reverse().map((post: any, index: number) => {
            const isCurrentUser = post.user._id === localUser?.id;

            return (
              <div
                key={post._id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: `fade-in 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0, // Start invisible for the animation
                }}
              >
                <div
                  className={`p-4 rounded-lg shadow-sm w-2/3 max-w-md transform transition-transform duration-300 hover:scale-105 ${
                    isCurrentUser ? 'bg-green-100 border border-green-200' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {isCurrentUser && (
                      <button
                        className="text-red-500 hover:text-red-600 text-sm transition-colors duration-200"
                        onClick={() => deletePostMutation.mutate(post._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800 mb-2 text-sm">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Auto-scroll target */}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Post Input Bar at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-20">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Write a post..."
              value={newMessage.content}
              onChange={(e) => setNewMessage({ content: e.target.value })}
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              disabled={!newMessage.content.trim()}
            >
              Post
            </button>
          </form>
        </div>
      </div>

      {/* Inline CSS for Animations and Scrollbar */}
      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Custom Scrollbar */
          .scrollbar::-webkit-scrollbar {
            width: 6px; /* Width of the scrollbar */
          }

          .scrollbar::-webkit-scrollbar-track {
            background:rgb(224, 250, 227); /* Color of the track */
            border-radius: 4px;
          }

          .scrollbar::-webkit-scrollbar-thumb {
            background: rgb(12, 74, 19); /* Color of the scrollbar thumb */
            border-radius: 4px;
          }

          .scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555; /* Color of the scrollbar thumb on hover */
          }
          h1{
          color: green;
          margin-top: 3.4rem;
          margin-bottom: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default Community;