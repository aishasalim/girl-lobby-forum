import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from './routes/Theme.jsx'; 

import Layout from './routes/Layout.jsx';
import CreateView from './routes/CreateView.jsx';
import { SearchQueryContext } from './SearchQueryContext';
import EditView from './routes/EditView.jsx';
import PostInfoView from './routes/PostInfoView.jsx';
import LoginView from './routes/LoginView.jsx';
import SuccessView from './routes/SuccessView.jsx';
import ProfileView from './routes/ProfileView.jsx';
import NotFound from './routes/NotFound.jsx';
import CommunityView from './routes/CommunityView.jsx';

import OldestPosts from './routes/OldestPosts.jsx';
import PopularPosts from './routes/PopularPosts.jsx';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider> 
    <BrowserRouter>
      <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index={true} element={<App />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="create" element={<CreateView />} />
            <Route path="/:id" element={<PostInfoView />} />
            <Route path="/edit/:id" element={<EditView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="success" element={<SuccessView />} />
            <Route path="profile/:nickname" element={<ProfileView />} />
            <Route path="/oldest" element={<OldestPosts />} />
            <Route path="/popular" element={<PopularPosts />} />
            <Route path="/community/:name/:id" element={<CommunityView />} />
          </Route>
        </Routes>
      </SearchQueryContext.Provider>
    </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);