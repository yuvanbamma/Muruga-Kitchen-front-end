import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LocationPicker from './LocationPicker';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [role, setRole] = useState('MISSION_HERO');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    country: 'India',
    countryCode: '+91',
    latitude: 13.0827,
    longitude: 80.2707,
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

  const handleLocationChange = (lat, lng) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const result = await signup(formData, role);
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
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem', color: 'var(--success)' }}>✓</span>
          <h2>Account created successfully!</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Redirecting you to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join our community</h1>
          <p>Start making a difference today</p>
        </div>
        
        <div className="role-selector">
          <button 
            type="button" 
            className={`role-option ${role === 'MISSION_HERO' ? 'selected' : ''}`} 
            onClick={() => setRole('MISSION_HERO')}
          >
            <span className="role-option-icon">🤝</span>
            <span className="role-option-title">Donor</span>
            <span className="role-option-desc">Give resources & help</span>
          </button>
          <button 
            type="button" 
            className={`role-option ${role === 'ORPHANAGE' ? 'selected' : ''}`} 
            onClick={() => setRole('ORPHANAGE')}
          >
            <span className="role-option-icon">🏛</span>
            <span className="role-option-title">Organization</span>
            <span className="role-option-desc">Post your needs</span>
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number</label>
            <input id="phoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+91 98765 43210" required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input id="country" type="text" name="country" value={formData.country} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Your location</label>
            <LocationPicker
              lat={formData.latitude}
              lng={formData.longitude}
              onChange={handleLocationChange}
            />
          </div>

          {role === 'ORPHANAGE' && (
            <>
              <div className="form-group">
                <label htmlFor="officialName">Organization name</label>
                <input id="officialName" type="text" name="officialName" value={formData.officialName} onChange={handleChange} placeholder="Official registered name" required />
              </div>
              <div className="form-group">
                <label htmlFor="registeredNumber">Registration number</label>
                <input id="registeredNumber" type="text" name="registeredNumber" value={formData.registeredNumber} onChange={handleChange} placeholder="Government registration no." required />
              </div>
              <div className="form-group">
                <label htmlFor="contactPersonContact">Contact phone</label>
                <input id="contactPersonContact" type="tel" name="contactPersonContact" value={formData.contactPersonContact} onChange={handleChange} placeholder="Primary contact" required />
              </div>
              <div className="form-group">
                <label htmlFor="totalChilders">Total beneficiaries</label>
                <input id="totalChilders" type="number" name="totalChilders" value={formData.totalChilders} onChange={handleChange} placeholder="Number of people served" required />
              </div>
              <div className="form-group">
                <label htmlFor="fullAddress">Full address</label>
                <textarea id="fullAddress" name="fullAddress" value={formData.fullAddress} onChange={handleChange} placeholder="Complete address with city and state" required />
              </div>
              <div className="form-group">
                <label htmlFor="landmark">Landmark</label>
                <input id="landmark" type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Nearby landmark for easy location" required />
              </div>
              <div className="form-group">
                <label htmlFor="visitPolicy">Visit policy</label>
                <input id="visitPolicy" type="text" name="visitPolicy" value={formData.visitPolicy} onChange={handleChange} placeholder="e.g., Open for visitors on weekdays" />
              </div>
              <div className="form-group">
                <label htmlFor="websiteUrl">Website (optional)</label>
                <input id="websiteUrl" type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder="https://yourwebsite.com" />
              </div>
              <div className="form-group">
                <label htmlFor="bio">About your organization</label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about your mission and the people you serve..." required />
              </div>
            </>
          )}
          
          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : `Create ${role === 'MISSION_HERO' ? 'Donor' : 'Organization'} Account`}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
