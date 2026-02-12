import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(credentials);
    if (result.success) {
      navigate(result.role === 'ORPHANAGE' ? '/my-requirements' : '/donations');
    } else {
      setError(result.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-overlay">
          <h1>Welcome back</h1>
          <p>Sign in to continue your mission.</p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-card">
          <h2>Sign in</h2>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="auth-footer">
            New? <button type="button" className="auth-link" onClick={() => navigate('/signup')}>Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
