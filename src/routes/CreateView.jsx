import React, { useState } from 'react';
import './CreateView.css'
import { supabase } from '../client.js';
import PostForm from '../components/PostForm.jsx';

const CreateView = () => {
  const [post, setPost] = useState({ title: "", text: "", img: "", secret_key: ""});
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const createPost = async (event) => {
    event.preventDefault();
      // Check if the title or text fields are empty
      if (!post.title.trim() || !post.text.trim()) {
        alert("Please enter both title and text creating a post.");
        return;
      }
    // Convert the file data to a base64 string if available
    const imgData = fileData ? fileData.split(",")[1] : null;
    await supabase
      .from('posts')
      .insert({ 
        title: post.title, 
        text: post.text, 
        img: imgData, 
        secret_key: post.secret_key
      })
      .select();
    setPost({ title: "", text: "", img: "", secret_key: "" });
    setFileData(null);
  
    window.location = "/";
  };

  const clearImageInput = () => {
    setFileData(null);
    setPost((prev) => ({
      ...prev,
      img: "",
    }));
  };
  
  return (
    <>
    <div className='main-block'>
      <h2>Create a post about beads bag you made! 📿👝 </h2>

      <PostForm
        handleSubmit={createPost}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        clearImageInput={clearImageInput}
        title={post.title}
        text={post.text}
        img={post.img}
        secretKeyPlaceholder="Enter a secret key"
      />


      </div>
    </>
  );
};

export default CreateView;
