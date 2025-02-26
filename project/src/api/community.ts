import api from './axios';

// Fetch Posts
export const getPosts = async () => {
  const { data } = await api.get('/community/posts');
  return data;
};

// Delete Post
export const deletePost = async (postId: string) => {
  try {
    console.log(postId);

   
   
 

    const { data } = await api.delete(`/community/posts/${postId}`);
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// Create Post
export const createPost = async (postData: { content: string }) => {
  try {
    // Get user from localStorage and parse JSON
    const userString = localStorage.getItem("user");
   
    let user = null;

    if (userString) {
      user = JSON.parse(userString);
    } else {
      console.warn("⚠️ No user found in localStorage!");
    }
   

    // Construct request payload
    const requestData = {
      content: postData.content,
      name: user?.name || "unanomous",
      email: user?.email || "guest@example.com", // Fallback if no user
      role: user?.role || "guest", // Fallback role
    };
   

    // Send POST request
    const { data } = await api.post('/community/posts', requestData);
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
