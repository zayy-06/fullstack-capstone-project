import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.firstName);
                sessionStorage.setItem('email', email);

                setUserName(json.firstName);
                setIsLoggedIn(true);
                navigate('/app');
            } else {
                setShowerr('Login failed. Please check your credentials.');
            }
        } catch (e) {
            console.error('Error during login:', e);
            setShowerr('Login failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Login</h2>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {showerr && <p className="text-danger">{showerr}</p>}
                    <button className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
