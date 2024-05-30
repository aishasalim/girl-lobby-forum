import "./LoginView.css"
import React from 'react';
import { supabase } from '../client.js'
import googleIcon from "../assets/google.svg";


const LoginView = () => {

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: 'https://lambent-flan-5d68f6.netlify.app/success'
            }
          })
    
    }

    return (
        <>
        <div className="login-container">
            <h2>Explore the girl forum!</h2>
            <p>Use Google to Sign In</p>
            <button onClick={signInWithGoogle} className="google-button">
                <img src={googleIcon} className="google-icon" alt="Google Logo" width="25px"/>
                Sign in with Google
            </button>
        </div>
        </>
    );
};

export default LoginView;
