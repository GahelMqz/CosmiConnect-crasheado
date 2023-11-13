import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login_G() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            setLoggedIn(true);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setLoggedIn(false);
    };

    return (
        <>
            <div>
                {loggedIn ? (
                    <div>
                        <img src={profile.picture} alt="user image" />
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Cerrar sesión</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Google 🚀 </button>
                )}
            </div>
        </>
    );
}

export default Login_G;