import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CreateFoodPost.css';

const CreateFoodPost = () => {
  const navigate = useNavigate();
  const { isOrphanage, isAuthenticated, user } = useAuth();
  const [name, setName] = useState('');
  const [requirement, setRequirement] = useState('');
  const [quantityRequired, setQuantityRequired] = useState('');
  const [expireTime, setExpireTime] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || !isOrphanage) {
    return (
      <div className="create-unauth">
        <h2>Unauthorized</h2>
        <p>Only authorized orphanages can post requirements. Sign in with an orphanage account.</p>
        <div className="create-unauth-actions">
          <button className="btn-primary" onClick={() => navigate('/login')}>Sign in</button>
          <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
        </div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    if (!user?.userId) {
      setMessage('Session expired. Please sign in again.');
      setLoading(false);
      return;
    }
    const foodPostData = {
      name,
      description: requirement,
      quantity: parseInt(quantityRequired, 10),
      quantityRequired: parseInt(quantityRequired, 10),
      orphaneId: user.orphanageId,
      userId: user.userId,
      requirement,
      expireTime: expireTime ? new Date(expireTime).toISOString() : null,
      collectedQuantity: 0
    };
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(foodPostData)], { type: 'application/json' }));
    if (image) formData.append('file', image);
    try {
      await api.multipartRequest('/food-posts', formData);
      setMessage('Posted successfully.');
      setName('');
      setRequirement('');
      setQuantityRequired('');
      setExpireTime('');
      setImage(null);
      setPreviewUrl('');
    } catch (err) {
      setMessage(err.message || 'Failed to post. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h1>Post Requirement</h1>
        <p>Share your needs. Heroes will respond.</p>
      </div>
      <div className="create-layout">
        <form onSubmit={handleSubmit} className="create-form">
          <section className="create-section">
            <h3>Details</h3>
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sunday Lunch" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="Food type, dietary needs, occasion..." rows={4} required />
            </div>
            <div className="create-row">
              <div className="form-group">
                <label>Servings needed</label>
                <input type="number" value={quantityRequired} onChange={(e) => setQuantityRequired(e.target.value)} placeholder="100" required min={1} />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="datetime-local" value={expireTime} onChange={(e) => setExpireTime(e.target.value)} required />
              </div>
            </div>
          </section>
          <section className="create-section">
            <h3>Image</h3>
            <div className="create-upload">
              <input type="file" id="upload" accept="image/*" onChange={handleImageChange} />
              <label htmlFor="upload">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="create-preview" />
                ) : (
                  <span>Click to upload image</span>
                )}
              </label>
            </div>
          </section>
          <div className="create-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Posting...' : 'Post'}</button>
          </div>
          {message && <p className={`create-msg ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateFoodPost;
