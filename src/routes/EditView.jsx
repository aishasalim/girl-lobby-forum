import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import PostForm from '../components/PostForm.jsx';

const EditView = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
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
        const newValue = value.toLowerCase() === 'none' ? '' : value;
    
        setPost(prev => ({
            ...prev,
            [name]: newValue,
        }));
    }

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error.message);
            } else {
                setPost(data); // Update post state with fetched data
            }
        };

        fetchPost();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();
            
        // Convert the file data to a base64 string if available
        const imgData = fileData ? fileData.split(",")[1] : null;
    
        // If there's a new image file uploaded, update the 'img' field
        const updatedPostData = {
            title: post.title,
            text: post.text,
        };
    
        if (imgData) {
            updatedPostData.img = imgData;
        } else {
            // If no new image file is uploaded, retain the existing image data
            updatedPostData.img = post.img;
        }
    
        await supabase
            .from('posts')
            .update(updatedPostData)
            .eq('id', id);
    
        window.location = `/${id}`;
    }
    
    const clearImageInput = () => {
        setFileData(null);
        setPost((prev) => ({
          ...prev,
          img: "",
        }));
      };

    
    // Render loading if post is still being fetched
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main-block'>
            <h2>Create a post about beads bag you made! 📿👝 </h2>

            <PostForm
                handleSubmit={updatePost}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                clearImageInput={clearImageInput}
                title={post.title}
                text={post.text}
                img={post.img}
            />

        </div>
    );
};

export default EditView;
