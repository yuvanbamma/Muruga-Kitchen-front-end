import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
      <div className="signup-success">
        <span className="signup-success-icon">✓</span>
        <h2>Registered</h2>
        <p>Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-visual signup-visual">
        <div className="auth-visual-overlay">
          <h1>Join the mission</h1>
          <p>Help connect surplus food with those in need.</p>
        </div>
      </div>
      <div className="auth-form-wrap signup-form-wrap">
        <div className="auth-card signup-card">
          <h2>Sign up</h2>
          <div className="role-select">
            <button type="button" className={`role-btn ${role === 'MISSION_HERO' ? 'active' : ''}`} onClick={() => setRole('MISSION_HERO')}>Hero</button>
            <button type="button" className={`role-btn ${role === 'ORPHANAGE' ? 'active' : ''}`} onClick={() => setRole('ORPHANAGE')}>Orphanage</button>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
              <div className="form-group"><label>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Phone</label><input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required /></div>
              <div className="form-group"><label>Country</label><input type="text" name="country" value={formData.country} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Latitude (optional)</label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  step="0.000001"
                />
              </div>
              <div className="form-group">
                <label>Longitude (optional)</label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  step="0.000001"
                />
              </div>
            </div>
            <p className="location-hint">
              For now you can paste coordinates from Google Maps. Later this can be replaced with a small map picker.
            </p>
            {role === 'ORPHANAGE' && (
              <>
                <div className="form-row">
                  <div className="form-group"><label>Orphanage name</label><input type="text" name="officialName" value={formData.officialName} onChange={handleChange} required /></div>
                  <div className="form-group"><label>Registration no.</label><input type="text" name="registeredNumber" value={formData.registeredNumber} onChange={handleChange} required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Contact phone</label><input type="text" name="contactPersonContact" value={formData.contactPersonContact} onChange={handleChange} required /></div>
                  <div className="form-group"><label>Total children</label><input type="text" name="totalChilders" value={formData.totalChilders} onChange={handleChange} required /></div>
                </div>
                <div className="form-group"><label>Address</label><input type="text" name="fullAddress" value={formData.fullAddress} onChange={handleChange} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Landmark</label><input type="text" name="landmark" value={formData.landmark} onChange={handleChange} required /></div>
                  <div className="form-group"><label>Visit policy</label><input type="text" name="visitPolicy" value={formData.visitPolicy} onChange={handleChange} /></div>
                </div>
                <div className="form-group"><label>Website (optional)</label><input type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} /></div>
                <div className="form-group"><label>Bio</label><textarea name="bio" value={formData.bio} onChange={handleChange} required rows={3} /></div>
              </>
            )}
            <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : `Register as ${role === 'MISSION_HERO' ? 'Hero' : 'Orphanage'}`}
            </button>
          </form>
          <p className="auth-footer">
            Have an account? <button type="button" className="auth-link" onClick={() => navigate('/login')}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
