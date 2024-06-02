import React, { useEffect, useState } from 'react';
import { supabase } from '../client.js';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Card from '../components/Card';
import './CommunityView.css';

const CommunityView = () => {
    const [community, setCommunity] = useState([]);
    const [posts, setPosts] = useState([]);
    const { name, id } = useParams();
    useEffect(() => {
        const fetchCommunity = async () => {
          const { data: community, error } = await supabase
            .from('communities')
            .select('*')
            .eq('lowercase_name', name)
            .eq('id', id);
      
          if (error) console.error('Error fetching community:', error.message);
          else setCommunity(community[0]); 
        };
      
        fetchCommunity();
      }, [name, id]);

      useEffect(() => {
        const fetchPosts = async () => {
                try {
                  let { data, error } = await supabase
                    .from('posts')
                    .select()
                    .eq('community', id)
                    .order('likes', { ascending: false });
                  if (error) {
                    throw new Error(error.message);
                  }
                  setPosts(data || []);
                } catch (error) {
                  console.error('Error fetching posts:', error.message);
                }
        };
        fetchPosts();
        }, []);
  return (
    <>
    <div className='community-top-container'>
    <div style={{textAlign:"left", marginTop: "7em"}}>
        <h2>{community.lowercase_name}</h2>
        <p>{community.description}</p>
        <p style={{fontWeight: "600"}}>{community.post_count} post</p>  
    </div>
    <Link className='community-create-button' to="/create">
      <button style={{borderRadius: "25px", width: "170px"}}> ✍️ Create Post</button>
    </Link>  
    </div> 
    <hr />

    <div className="ReadPosts">
      {posts.length > 0 ? (
        posts.map((post) => (
      <Card key={post.id} {...post} />
        ))
      ) : (
         <h2 className='no-posts-sing'>No Posts Yet 😞</h2>
      )}
    </div>

    </>
  );
};

export default CommunityView;