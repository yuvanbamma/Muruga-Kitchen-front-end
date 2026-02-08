import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [role, setRole] = useState('FOOD_DONATOR'); // 'FOOD_DONATOR' or 'FOOD_DELIVERY_BOY'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        country: 'India',
        countryCode: '+91',
        latitude: 13.0827, // Default to Chennai for demo
        longitude: 80.2707
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const result = await signup(formData, role);
        setIsLoading(true); // Keep it true for success transition logic if needed

        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError(result.message);
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="signup-portal success">
                <div className="success-card">
                    <div className="success-icon">✅</div>
                    <h2>Registration Successful!</h2>
                    <p>Welcome to the Muruga Kitchen family. Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="signup-portal">
            <div className="signup-visual-section">
                <div className="signup-overlay">
                    <h1>Join the Mission</h1>
                    <p>At Muruga Kitchen, we believe nobody should go hungry. Join our startup family and help us bridge the gap between donors and those in need.</p>
                </div>
            </div>

            <div className="signup-form-section">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1>Join the Mission</h1>
                        <p>Select your role in our surplus food donation network.</p>
                    </div>

                    <div className="role-selector">
                        <button
                            className={`role-btn ${role === 'FOOD_DONATOR' ? 'active' : ''}`}
                            onClick={() => setRole('FOOD_DONATOR')}
                        >
                            Donation Partner
                        </button>
                        <button
                            className={`role-btn ${role === 'FOOD_DELIVERY_BOY' ? 'active' : ''}`}
                            onClick={() => setRole('FOOD_DELIVERY_BOY')}
                        >
                            Mission Hero
                        </button>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <span className="error-icon">⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form staggered">
                        <div className="form-row">
                            <div className="form-group-pro">
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required />
                                <label>Email Address</label>
                                <span className="focus-border"></span>
                            </div>
                            <div className="form-group-pro">
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder=" " required />
                                <label>Password</label>
                                <span className="focus-border"></span>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group-pro">
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder=" " required />
                                <label>Phone Number</label>
                                <span className="focus-border"></span>
                            </div>
                            <div className="form-group-pro">
                                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder=" " required />
                                <label>Country</label>
                                <span className="focus-border"></span>
                            </div>
                        </div>

                        <div className="geo-mockup">
                            <div className="geo-icon">📍</div>
                            <div className="geo-text">
                                <strong>Auto-Location Detected</strong>
                                <p>Lat: {formData.latitude}, Long: {formData.longitude}</p>
                            </div>
                        </div>

                        <div className="auth-actions">
                            <button
                                type="submit"
                                className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Joining Mission...' : `Register as ${role === 'FOOD_DONATOR' ? 'Donation Partner' : 'Mission Hero'}`}
                            </button>
                        </div>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <button onClick={() => navigate('/login')}>Sign In</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
