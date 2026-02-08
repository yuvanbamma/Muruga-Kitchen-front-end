import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CreateFoodPost.css';

const CreateFoodPost = ({ setView }) => {
    const { isDonor, isAuthenticated } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isAuthenticated || !isDonor) {
        return (
            <div className="create-portal-container unauthorized">
                <div className="portal-header">
                    <h2>Unauthorized Access</h2>
                    <p>Only registered <strong>Donation Partners</strong> can share surplus food. Please sign in with a donor account.</p>
                    <button className="primary-btn-lg" onClick={() => setView('login')}>Sign In as Partner</button>
                    <button className="secondary-btn-lg" onClick={() => setView('dashboard')}>Back to Home</button>
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
            description: description,
            quantity: parseInt(quantity, 10)
        };

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(foodPostData)], { type: 'application/json' }));
        if (image) {
            formData.append('file', image);
        }

        try {
            await api.multipartRequest('/food-posts', formData);
            setMessage('Surplus food mission shared successfully!');
            setName('');
            setDescription('');
            setQuantity('');
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
                <h2>Post Surplus Food</h2>
                <p>Help us reduce waste. Share untouched food from your event with those in need.</p>
            </div>

            <div className="portal-content">
                <form onSubmit={handleSubmit} className="portal-form">

                    {/* Item Details */}
                    <div className="form-section">
                        <h3>Donation Details</h3>
                        <div className="input-group">
                            <label>Event/Item Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Wedding Buffet Surplus"
                                required
                                className="premium-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>Details & Safety Info</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the food, when it was prepared, and any storage instructions..."
                                rows="4"
                                required
                                className="premium-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>Approx. People it can serve</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="e.g. 50"
                                required
                                className="premium-input"
                            />
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
                        <button type="button" className="secondary-btn-lg" style={{ width: 'auto', padding: '12px 24px' }}>Cancel</button>
                        <button type="submit" className="primary-btn-lg" disabled={loading}>
                            {loading ? 'Sharing Mission...' : 'Share Surplus Food'}
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
                                <div className="rating-badge">Mission ★</div>
                            </div>
                            <div className="card-meta-row">
                                <span className="cuisine-tag">{description ? description.substring(0, 20) : 'Mission details...'}</span>
                                <span className="price-estimate">Serves {quantity || 0} needy</span>
                            </div>
                            <div className="card-divider"></div>
                            <div className="card-footer-row">
                                <span className="trend-text">Ready for immediate pickup</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFoodPost;
