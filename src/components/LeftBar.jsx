import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './SideBars.css';
import PopUpForm from './PopUpForm.jsx'; 
import { supabase } from '../client.js';

const LeftBar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const location = useLocation(); 
  const [communities, setCommunities] = useState([]);
               
  useEffect(() => {
    setIsSignedIn(!!userInfo);
  }, [userInfo]);

  const isActive = (path) => location.pathname === path;

  const handleAddCommunityClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchCommunities = async () => {
      const { data: communities, error } = await supabase
        .from('communities')
        .select('*');

      if (error) console.error('Error fetching communities:', error.message);
      else setCommunities(communities);
    };

    fetchCommunities();
  }, []);

  return (
    <div className='leftbar'>
      <ul>
        <Link to="/">
          <li className={`leftbar-link ${isActive('/') ? 'active' : ''}`}> 🏠 Home</li>
        </Link>
        <Link to={isSignedIn ? "/create" : "/login"}>
          <li className={`leftbar-link ${isActive('/create') || isActive('/login') ? 'active' : ''}`}> ✍️ Create Post</li>
        </Link>
        <Link to="/popular">
          <li className={`leftbar-link ${isActive('/popular') ? 'active' : ''}`}> 📈 Popular</li>
        </Link>
        <Link to="/oldest">
          <li className={`leftbar-link ${isActive('/oldest') ? 'active' : ''}`}> ⌛ Oldest Posts</li>
        </Link>
        <hr className='leftbar-hr' />
        <li className='community-section'>
          🤝 Communities
        </li>
        <ul className='community-list'>
          <li className='add-community' onClick={handleAddCommunityClick}>🖋️ Add Community</li>

    
          {communities.map((community) => (
            <Link key={community.id} to={`/community/${community.lowercase_name}/${community.id}`}>
            <li className='community-link'>
              ➡️ {community.lowercase_name}
            </li>
            </Link>
          ))}
        </ul>
      </ul>
      <PopUpForm isOpen={isPopupOpen} onClose={closePopup} />
    </div>
    
  );
};

export default LeftBar;
