import { useState, useEffect, useContext } from 'react';
import Card from './Card.jsx';
import { supabase } from '../client.js';
import './GalleryPostDetail.css';
import { SearchQueryContext } from '../SearchQueryContext';
import SearchBar from "./SearchBar.jsx";
import SortingButtons from "./SortingButtons.jsx";

const GalleryPostDetail = () => {
const [posts, setPosts] = useState([]);
const { searchQuery, setSearchQuery  } = useContext(SearchQueryContext);
      
useEffect(() => {
    const fetchPosts = async () => {
            try {
              let { data, error } = await supabase
                .from('posts')
                .select()
                .order('created_at', { ascending: false });
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
            <div className="ghost-searchbar">
                  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
                      
            <SortingButtons />
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

export default GalleryPostDetail;

