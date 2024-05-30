import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ alignItems: 'center', margin:'auto' }}>
        <button >
                        Main Page
        </button>
    </Link>
    </div>
  );
};

export default NotFound;
