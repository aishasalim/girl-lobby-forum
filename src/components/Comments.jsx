import { useState, useEffect } from 'react';
import { supabase } from '../client';
import "../routes/PostInfoView.css";
import TimeAgo from './TimeAgo';
import { useTheme } from '../routes/Theme'; 
import PropTypes from 'prop-types';

const Comments = ({ id }) => {
    const { darkMode } = useTheme();
    const [comment, setComment] = useState({ post_id: "", comment_text: "", comment_likes: "" });
    const [readComment, setReadComment] = useState([]);

    // Add a comment
    const handleChange = (event) => {
        const { name, value } = event.target;
        setComment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createComment = async (event) => {
        event.preventDefault();
        if (comment.comment_text.trim() === "") {
            alert("Comment cannot be empty");
        } else {
            await supabase
                .from('comments')
                .insert({
                    post_id: id,
                    comment_text: comment.comment_text,
                    comment_likes: comment.comment_likes || 0 // Initialize likes to 0 if not provided
                })
                .select();
            setComment({ post_id: "", comment_text: "" });
            window.location.reload();
        }
    };


    // Like a comment
    const likeComment = async (commentId) => {
        // Increment like count locally
        const updatedComments = readComment.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, comment_likes: comment.comment_likes + 1 };
            }
            return comment;
        });

        // Update the state with the new like count
        setReadComment(updatedComments);

        // Update like count in the database
        await supabase
            .from('comments')
            .update({ comment_likes: updatedComments.find(comment => comment.id === commentId).comment_likes })
            .eq('id', commentId);
    };

    // Read Comments
    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('comments')
                .select()
                .eq('post_id', id);

            // Set state of comments with timeAgo
            const dataWithTimeAgo = data ? data.map(comment => ({
                ...comment,
                timeAgo: <TimeAgo created_at={comment.created_at} />
            })) : [];

            // Set state of comments
            setReadComment(dataWithTimeAgo);
        };
        fetchPosts();
    }, [id]);


    Comments.propTypes = {
        id: PropTypes.string.isRequired,
      };

    return (
        <>
        <div className='comment-section'>

        {readComment && readComment.length > 0 ?
            readComment.map((comment) => 
                <div className='comment' key={comment.id}>
                    <p>{comment.comment_text}</p>

                    <div className='under-comment'>
                        <div className='like-container' >
            
                            <span style={{ marginRight: "10px"}} onClick={() => likeComment(comment.id)} className="like-icon" >
                                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: "-13px"}}>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z" fill={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000"}/>
                                </svg>
                            </span>

                            <p>{comment.comment_likes !== null ? comment.comment_likes : 0} likes</p>
                        </div>
                        <p className='comment-date'>Created <TimeAgo created_at={comment.created_at} /></p>
                    </div>
                </div>
            ) : 
            <p>No comments yet!</p>
        }


            <input style={{color: "black"}} className='comment-input' type="text" name="comment_text" placeholder='Add a comment' value={comment.comment_text} onChange={handleChange} />
            <button className='comment-button' onClick={createComment}>Send</button>
        </div>
        </>
    );
};

export default Comments;
