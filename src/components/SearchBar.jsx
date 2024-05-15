import PropTypes from 'prop-types';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            style={{color: 'black'}}
            type="text"
            placeholder="Search"
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