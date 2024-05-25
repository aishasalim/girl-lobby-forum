import PropTypes from 'prop-types';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            style={{color: 'black', 
            backgroundColor: '#e8e6e6', 
            minWidth: '270px', 
            padding: '5px', 
            marginBottom: '10px'}}
            type="text"
            placeholder="🔍 Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};
SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
  };

export default SearchBar;