import React, { useEffect, useState } from 'react';
import { supabase } from '../client.js';
import { Link, useParams } from 'react-router-dom';

const CommunityView = () => {
    const [community, setCommunity] = useState([]);
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
  return (
    <>
    <div style={{textAlign:"left", margin: "7em 3em 2em"}}>
        <h2>{community.lowercase_name}</h2>
        <p>{community.description}</p>
    </div>
    
    <hr />
    </>
  );
};

export default CommunityView;