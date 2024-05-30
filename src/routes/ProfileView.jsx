import { useState, useEffect } from 'react';
import RightBar from "../components/RightBar.jsx";
import "./ProfileView.css";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Card from '../components/Card.jsx';
import { useTheme } from './Theme'; 
import { supabase } from '../client.js';

const ProfileView = () => {
    const currentAccountInfo = JSON.parse(localStorage.getItem('account_info'));
    const { darkMode } = useTheme();
    const [userPosts, setUserPosts] = useState([]);
    const [userAccountInfo, setUserAccountInfo] = useState(null);
    const { nickname } = useParams();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const { data, error } = await supabase
                .from('accounts')
                .select('*')
                .eq('nickname', nickname)
                .single(); // Assuming there's a unique constraint on the nickname

            if (error) {
                console.error("Error fetching account info:", error);
            } else {
                setUserAccountInfo(data);
            }
        };

        if (nickname) {
            fetchAccountInfo();
        }
    }, [nickname]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (userAccountInfo) {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('author_id', userAccountInfo.account_id);

                if (error) {
                    console.error("Error fetching user posts:", error);
                } else {
                    setUserPosts(data);
                }
            }
        };
        
        fetchUserPosts();
    }, [userAccountInfo]);
    

    return (
        <>
        <div className="profile-container">
            <div className="rightbar-container">
                <RightBar accountDetails={userAccountInfo} />
            </div>
            <div className="profile-nickname-container">
                {userAccountInfo?.account_avatar ? (
                    <img src={userAccountInfo?.account_avatar} alt="avatar" className="avatar" />
                    ) : (
                    <svg width="120px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{marginTop: "5px"}}>
                                    <path fill="none" d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000" } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fill="none" d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path fill="none" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000" } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}

                <h2 style={{marginTop: "30px"}}>{userAccountInfo?.nickname}</h2>
            </div>
                
                
            <div className="profile-rb-container">
                <p><span>{userAccountInfo?.post_count}</span><br/>post</p>
                <p><span>{userAccountInfo?.comments_count}</span><br/>comments</p>
                <p><span>{formatDate(userAccountInfo?.created_at)}</span><br/>Created</p>
            </div>

            {currentAccountInfo?.nickname === userAccountInfo?.nickname && (
                <Link style={{width: "155px", justifyContent: 'left', display: 'flex'}} to="/create">
                    <button style={{borderRadius: "25px", marginTop: "10px"}}> ✍️ Create Post</button>
                </Link>
            )}
            <div className="overview-container">
                <h3>Posts</h3>
            </div>
            <hr />

            <div className="account-posts" style={{ marginBottom: "80px" }}>
                {userPosts && userPosts.length > 0 ?
                    userPosts.map((post) => 
                        <Card key={post.id} id={String(post.id)} title={post.title} likes={post.likes} created_at={post.created_at} author_nickname={post.author_nickname} />
                    ) : 
                    <h2>No Posts Yet 😞</h2>
                }
            </div>   
        </div>
        </>
    );
};

export default ProfileView;