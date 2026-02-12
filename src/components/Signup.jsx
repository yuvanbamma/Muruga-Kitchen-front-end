import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [role, setRole] = useState('MISSION_HERO'); // 'MISSION_HERO' or 'ORPHANAGE'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        country: 'India',
        countryCode: '+91',
        latitude: 13.0827,
        longitude: 80.2707,
        // Orphanage specific fields
        officialName: '',
        registeredNumber: '',
        contactPersonContact: '',
        totalChilders: '',
        fullAddress: '',
        landmark: '',
        bio: '',
        websiteUrl: '',
        visitPolicy: 'Open for visitors'
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
        setIsLoading(true);

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
                            className={`role-btn ${role === 'MISSION_HERO' ? 'active' : ''}`}
                            onClick={() => setRole('MISSION_HERO')}
                        >
                            Mission Hero
                        </button>
                        <button
                            className={`role-btn ${role === 'ORPHANAGE' ? 'active' : ''}`}
                            onClick={() => setRole('ORPHANAGE')}
                        >
                            Authorized Orphanage
                        </button>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <span className="error-icon">⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form staggered">
                        {/* Common Fields */}
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

                        {/* Condition Fields for Orphanage */}
                        {role === 'ORPHANAGE' && (
                            <>
                                <div className="form-row">
                                    <div className="form-group-pro">
                                        <input type="text" name="officialName" value={formData.officialName} onChange={handleChange} placeholder=" " required />
                                        <label>Orphanage Name</label>
                                        <span className="focus-border"></span>
                                    </div>
                                    <div className="form-group-pro">
                                        <input type="text" name="registeredNumber" value={formData.registeredNumber} onChange={handleChange} placeholder=" " required />
                                        <label>Registration No.</label>
                                        <span className="focus-border"></span>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group-pro">
                                        <input type="text" name="contactPersonContact" value={formData.contactPersonContact} onChange={handleChange} placeholder=" " required />
                                        <label>Contact Person Phone</label>
                                        <span className="focus-border"></span>
                                    </div>
                                    <div className="form-group-pro">
                                        <input type="text" name="totalChilders" value={formData.totalChilders} onChange={handleChange} placeholder=" " required />
                                        <label>Total Children</label>
                                        <span className="focus-border"></span>
                                    </div>
                                </div>

                                <div className="form-group-pro">
                                    <input type="text" name="fullAddress" value={formData.fullAddress} onChange={handleChange} placeholder=" " required />
                                    <label>Full Address</label>
                                    <span className="focus-border"></span>
                                </div>

                                <div className="form-row">
                                    <div className="form-group-pro">
                                        <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder=" " required />
                                        <label>Landmark</label>
                                        <span className="focus-border"></span>
                                    </div>
                                    <div className="form-group-pro">
                                        <input type="text" name="visitPolicy" value={formData.visitPolicy} onChange={handleChange} placeholder=" " required />
                                        <label>Visit Policy</label>
                                        <span className="focus-border"></span>
                                    </div>
                                </div>

                                <div className="form-group-pro">
                                    <input type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder=" " />
                                    <label>Website URL (Optional)</label>
                                    <span className="focus-border"></span>
                                </div>

                                <div className="form-group-pro">
                                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder=" " required style={{ minHeight: '80px', paddingTop: '10px' }}></textarea>
                                    <label>About Orphanage (Bio)</label>
                                    <span className="focus-border"></span>
                                </div>
                            </>
                        )}


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
                                {isLoading ? 'Joining Mission...' : `Register as ${role === 'MISSION_HERO' ? 'Mission Hero' : 'Orphanage'}`}
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
