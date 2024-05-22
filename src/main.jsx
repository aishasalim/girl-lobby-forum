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
import EmailVerifView from './routes/EmailVerifView.jsx';
import ProfileView from './routes/ProfileView.jsx';

import NewestPosts from './routes/NewestPosts.jsx';
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
            <Route path="create" element={<CreateView />} />
            <Route path="/:id" element={<PostInfoView />} />
            <Route path="/edit/:id" element={<EditView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="success" element={<SuccessView />} />
            <Route path="emailverify" element={<EmailVerifView />} />
            <Route path="profile/:id" element={<ProfileView />} />

            <Route path="/newest" element={<NewestPosts />} />
            <Route path="/oldest" element={<OldestPosts />} />
            <Route path="/popular" element={<PopularPosts />} />
          </Route>
        </Routes>
      </SearchQueryContext.Provider>
    </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);