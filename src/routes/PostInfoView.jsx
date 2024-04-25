import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link, useParams } from "react-router-dom";
import "./PostInfoView.css";

import Comments from '../components/Comments';
import { useTheme } from '../routes/Theme'; 


const PostInfoView = () => {
 const { darkMode } = useTheme();
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", text: "", img: "", likes: "", secret_key: ""});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching post:', error.message);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching post:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLikeClick = async () => {
      try {
          // Update the likes count in the database
          const { error } = await supabase
              .from('posts')
              .update({ likes: post.likes + 1 }) // Increase the likes count by 1
              .eq('id', id)
              .single();

          if (error) {
              throw new Error(error.message);
          }
          
          // Update the local state with the new likes count
          setPost(prevPost => ({ ...prevPost, likes: prevPost.likes + 1 }));
      } catch (error) {
          console.error('Error updating likes:', error.message);
      }
  };

  const handleDeletePost = async () => {
      let secretCode = "";
  
      if (post.secret_key !== "") {
          secretCode = prompt('Please enter the secret code to delete this post:');
      }
  
      if (post.secret_key === "" || secretCode === post.secret_key) { 
          const confirmation = window.confirm('Are you sure you want to delete this post?');
          if (confirmation) {
              const { error } = await supabase
                  .from('posts')
                  .delete()
                  .eq('id', id);
              if (!error) {
                  alert('Post deleted successfully');
                  window.location = "/";
              } else {
                  alert('Failed to delete the post. Please try again later.');
              }
          }
      } else {
          alert('Incorrect secret code or secret code is not provided.');
      }
  };

  const handleEditClick = (event) => {
      event.preventDefault();
  
      let secretCode = "";
      if (post.secret_key === "") {
          window.location.href = `/edit/${id}`;
      } else {
          secretCode = prompt('Please enter the secret code to edit this post:');
          if (secretCode === null) {
              return;
          }
          if (secretCode === post.secret_key) {
              window.location.href = `/edit/${id}`;
          } else {
              alert('Incorrect secret key. Access denied.');
          }
      }
  };
  
  

  return (
      <>
      <div className='post-info-card'>
          <div className='post-contents'>
              <h2>{post.title}</h2>
              {post.img ? (
                <img src={post.img.startsWith('http') ? post.img : `data:image/jpeg;base64,${post.img}`} alt={post.title} width="50%" style={{borderRadius: "10px"}}/>
                ) : null}
              <p>{post.text}</p>
          </div>
          <div className="container" onClick={handleLikeClick}>
              <div className='like-container'>
                <span style={{ marginRight: "10px"}} className="like-icon" >
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: "-20px"}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z" fill={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000"}/>
                    </svg>
                </span>
                  <p>{post.likes} likes</p>
              </div>

              <div className='edit-delete-container'>
                  <Link to={`/edit/${id}`} onClick={handleEditClick}>
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginBottom: "0px" }}
                    >
                    <path
                        d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
                        stroke={darkMode ? "#fff" : "#000"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    </svg>

                  </Link>
                  <svg
                    width="28px"
                    height="28px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    alt="Delete" onClick={handleDeletePost} style={{ cursor: 'pointer' }}
                    >
                    <path
                        d="M7.69231 8.70833H5V8.16667H9.84615M7.69231 8.70833V19H16.3077V8.70833M7.69231 8.70833H16.3077M16.3077 8.70833H19V8.16667H14.1538M9.84615 8.16667V6H14.1538V8.16667M9.84615 8.16667H14.1538"
                        stroke={darkMode ? "#fff" : "#000"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 11V17"
                        stroke={darkMode ? "#fff" : "#000"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 11V17"
                        stroke={darkMode ? "#fff" : "#000"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 11V17"
                        stroke={darkMode ? "#fff" : "#000"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
              </div>

          </div>

          <hr />

          <Comments id={id} />

      </div>
      </>
  );
};
  
  export default PostInfoView;