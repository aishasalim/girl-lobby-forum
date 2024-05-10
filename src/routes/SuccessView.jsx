import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../client.js'
import { Link } from 'react-router-dom';

const SuccessView = () => {
    const [setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            // Fetch user data to check if email is confirmed
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user);
            
            const isEmailConfirmed = user?.confirmed_at;
            if (isEmailConfirmed) {
                navigate("/success");
            }
        }
        getUserData();
    }, [navigate]);

    async function signOut() {
        await supabase.auth.signOut();
        navigate("/");
     }

    return (
        <>
            <h2>You are all set!</h2>
            <p>Your email is confirmed. You can now access the app.</p>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={() => signOut()} style={{ marginBottom: '10px', width: '150px' }}>
                    Sign Out
                </button>

                <Link to="/" style={{ width: '150px', display: 'flex', justifyContent: 'center' }}>
                    <button style={{ width: '100%' }}>
                        Main Page
                    </button>
                </Link>
            </div>
        </>
    );
};

export default SuccessView;
