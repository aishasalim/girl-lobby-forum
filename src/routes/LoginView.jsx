import "./LoginView.css"
import React, { useState } from 'react';
import { supabase } from '../client.js'
import googleIcon from "../assets/google.svg";


const LoginView = () => {
    const [activeButton, setActiveButton] = useState('login');
    const handleButtonClick = (buttonType) => {
        if (buttonType !== activeButton) {
            setActiveButton(buttonType);
        }
    };

    const [account, setAccount] = useState({username: "", email: "", password: ""})
    const handleChange = (event) => {
        const {name, value} = event.target;
        setAccount( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createAccount = async (event) => {
        event.preventDefault();

        const { error } = await supabase.auth.signUp(
            {
              email: account.email,
              password: account.password,
              options: {
                emailRedirectTo: 'https://lambent-flan-5d68f6.netlify.app/success'
              }
            }
          )
        
        if (error) {
            console.log('Error signing up:', error);
            return;
        }

        setAccount({username: "", email: "", password: ""});
        window.location = "/emailverify";
    }
      

    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: 'https://lambent-flan-5d68f6.netlify.app/success'
            }
          })
    
    }


    const loginUser = async (event) => {
        event.preventDefault();
        const {email, password} = account;
        await login(email, password);
    }

    const login = async (email, password) => {
        const {  data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.log('Error logging in:', error);
            alert('Error logging in email or password is not correct');
            return;
        }

        // Redirect or perform actions after successful login
        window.location = "/";
    }


    return (
        <>
        <h2>Explore beaded world!</h2>
        <div className="login-container">
            <div className="login-card">
                <div className="buttons">
                    <label
                        htmlFor="chbox"
                        className={`login btn ${activeButton === 'login' ? 'active' : 'inactive'}`}
                        onClick={() => handleButtonClick('login')}
                    >
                        <span>Log in</span>
                    </label>
                    <label
                        htmlFor="chbox"
                        className={`SignUp btn ${activeButton === 'signUp' ? 'active' : 'inactive'}`}
                        onClick={() => handleButtonClick('signUp')}
                    >
                        <span>Create account</span>
                    </label>
                </div>

                <input type="checkbox" id="chbox" />
                <div className="login_form" style={{ display: activeButton === 'login' ? 'flex' : 'none' }}>
                <br /><input type="text" placeholder="email" name="email" onChange={handleChange} /><br />
                <input type="password" placeholder="password" name="password" onChange={handleChange} /><br />
                <button className="submit" onClick={loginUser}>Submit</button>

                    <p>Or use Google to sign in</p>
                    <button onClick={signInWithGoogle} className="google-button">
                        <img src={googleIcon} alt="Google Logo" width="25px"/>
                            Sign in with Google
                    </button>
                </div>

                <div className="SignUp_form" style={{ display: activeButton === 'signUp' ? 'flex' : 'none' }}>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange} /><br />
                    <input type="email" placeholder="E-Mail" name="email" onChange={handleChange} /><br />
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} /><br />
                    <button className="submit" onClick={createAccount}>Submit</button>
                   
                    <p>Or use Google to sign in</p>
                    <button onClick={signInWithGoogle} className="google-button">
                        <img src={googleIcon} alt="Google Logo" width="25px"/>
                            Sign in with Google
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginView;
