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

    const fetchPosts = async () => {
        try {
            let query = supabase.from('posts').select();

            // Apply search filter
            if (searchQuery) {
                query = query.filter('title', 'ilike', `%${searchQuery}%`);
            }

            const { data, error } = await query;
            if (error) {
                throw new Error(error.message);
            }
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [searchQuery]);

    return (
        <>
            <div className="ghost-searchbar">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            
            <SortingButtons />
            
            <div className="ReadPosts" style={{ marginBottom: "80px" }}>
                <hr/>
                {posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Card key={post.id} id={String(post.id)} title={post.title} likes={post.likes} created_at={post.created_at} author={post.author} />
                    ) : 
                    <h2>No Posts Yet 😞</h2>
                }
            </div>
        </>
    );
};

export default GalleryPostDetail;

