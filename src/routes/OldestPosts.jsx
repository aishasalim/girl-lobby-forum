import Card from '../components/Card';
import { supabase } from '../client';
import { useState, useEffect, useContext } from 'react';
import { SearchQueryContext } from '../SearchQueryContext';
import SearchBar from "../components/SearchBar.jsx";
import SortingButtons from "../components/SortingButtons.jsx";

const OldestPosts = () => {
    const [posts, setPosts] = useState([]);
    const { searchQuery, setSearchQuery  } = useContext(SearchQueryContext);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          let { data, error } = await supabase
            .from('posts')
            .select()
            .order('created_at', { ascending: true })
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
              <h2>No Posts Yet 😞</h2>
          )}
          </div>
      </>
    );
  };

export default OldestPosts;