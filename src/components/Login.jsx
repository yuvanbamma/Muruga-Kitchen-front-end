import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(credentials);
        if (result.success) {
            // Redirect based on role
            if (result.role === 'ORPHANAGE') {
                navigate('/my-requirements');
            } else {
                navigate('/donations');
            }
        } else {
            setError(result.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="login-portal">
            <div className="login-visual-section">
                <div className="login-overlay">
                    <h1>Welcome <br /><span>Back</span></h1>
                    <p>Joining hands to serve the community better.</p>
                </div>
            </div>

            <div className="login-form-section">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Mission Sign In</h2>
                        <p>Welcome back, humanity partner!</p>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <span className="error-icon">⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group-pro">
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label>Email Address</label>
                            <span className="focus-border"></span>
                        </div>

                        <div className="form-group-pro">
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder=" "
                                required
                            />
                            <label>Password</label>
                            <span className="focus-border"></span>
                        </div>

                        <button type="submit" className={`auth-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>New to Muruga Kitchen? <button onClick={() => navigate('/signup')}>Join the mission</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
