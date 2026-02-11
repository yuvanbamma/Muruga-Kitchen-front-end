import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CreateFoodPost.css';

const CreateFoodPost = ({ setView }) => {
    const { isOrphanage, isAuthenticated } = useAuth();
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
            <div className="create-portal-container unauthorized">
                <div className="portal-header">
                    <h2>Unauthorized Access</h2>
                    <p>Only <strong>Authorized Orphanages</strong> can post food requirements. Please sign in with an orphanage account.</p>
                    <button className="primary-btn-lg" onClick={() => setView('login')}>Sign In as Orphanage</button>
                    <button className="secondary-btn-lg" onClick={() => navigate('/')}>Back to Home</button>
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

        const foodPostData = {
            name: name,
            requirement: requirement,
            quantityRequired: parseInt(quantityRequired, 10),
            expireTime: expireTime ? new Date(expireTime).toISOString() : null,
            collectedQuantity: 0 // New requirements start at 0
        };

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(foodPostData)], { type: 'application/json' }));
        if (image) {
            formData.append('file', image);
        }

        try {
            await api.multipartRequest('/food-posts', formData);
            setMessage('Requirement posted successfully! Wait for Mission Heroes to connect.');
            setName('');
            setRequirement('');
            setQuantityRequired('');
            setExpireTime('');
            setImage(null);
            setPreviewUrl('');
        } catch (error) {
            setMessage(error.message || 'Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-portal-container">
            <div className="portal-header">
                <h2>Post Food Requirement</h2>
                <p>Let the world know your needs. Mission Heroes are ready to serve your children.</p>
            </div>

            <div className="portal-content">
                <form onSubmit={handleSubmit} className="portal-form">

                    {/* Item Details */}
                    <div className="form-section">
                        <h3>Requirement Details</h3>
                        <div className="input-group">
                            <label>Title (e.g. Sunday Lunch Support)</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Need food for 50 kids"
                                required
                                className="premium-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>Specific Needs & Details</label>
                            <textarea
                                value={requirement}
                                onChange={(e) => setRequirement(e.target.value)}
                                placeholder="Describe the specific food needed, dietary restrictions, or occasion..."
                                rows="4"
                                required
                                className="premium-input"
                            />
                        </div>

                        <div className="form-row-pro">
                            <div className="input-group">
                                <label>Total Servings Required</label>
                                <input
                                    type="number"
                                    value={quantityRequired}
                                    onChange={(e) => setQuantityRequired(e.target.value)}
                                    placeholder="e.g. 100"
                                    required
                                    className="premium-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>Needed Before</label>
                                <input
                                    type="datetime-local"
                                    value={expireTime}
                                    onChange={(e) => setExpireTime(e.target.value)}
                                    required
                                    className="premium-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="form-section">
                        <h3>Item Image</h3>
                        <div className="image-upload-zone">
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <label htmlFor="file-upload" className="upload-label">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="img-preview-full" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <span className="upload-icon">☁️</span>
                                        <strong>Click to upload</strong>
                                        <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn-lg" onClick={() => navigate('/')} style={{ width: 'auto', padding: '12px 24px' }}>Cancel</button>
                        <button type="submit" className="primary-btn-lg" disabled={loading}>
                            {loading ? 'Posting Requirement...' : 'Share Requirement'}
                        </button>
                    </div>

                    {message && (
                        <div className={`status-message ${message.includes('success') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                </form>

                {/* Preview Card (Visual feedback) */}
                <div className="preview-section">
                    <h3>Preview</h3>
                    <div className="food-card-pro" style={{ pointerEvents: 'none' }}>
                        <div className="card-media">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="card-img" />
                            ) : (
                                <div className="no-image-placeholder" style={{ height: '100%', background: '#eee' }}></div>
                            )}
                            <div className="promoted-badge">Surplus</div>
                            <div className="time-badge">Fresh</div>
                        </div>
                        <div className="card-details">
                            <div className="card-header-row">
                                <h3 className="dish-name">{name || 'Mission Name'}</h3>
                                <div className="rating-badge mission">Mission</div>
                            </div>
                            <div className="card-meta-row">
                                <span className="cuisine-tag">{requirement ? requirement.substring(0, 20) : 'Need details...'}</span>
                                <span className="price-estimate">Goal: {quantityRequired || 0} Servings</span>
                            </div>
                            <div className="card-divider"></div>
                            <div className="card-footer-row">
                                <div className="progress-mini-bar">
                                    <div className="progress-fill" style={{ width: '0%' }}></div>
                                </div>
                                <span className="trend-text">0 / {quantityRequired || 0} Collected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFoodPost;
