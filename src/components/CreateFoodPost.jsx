import { useState } from 'react';
import './CreateFoodPost.css';

const CreateFoodPost = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
            const response = await fetch('/api/food-posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Food item successfully published!');
                setName('');
                setDescription('');
                setQuantity('');
                setImage(null);
                setPreviewUrl('');
            } else {
                setMessage('Failed to create post. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-portal-container">
            <div className="portal-header">
                <h2>Add New Food Item</h2>
                <p>Fill in the details to list menu items on the platform.</p>
            </div>

            <div className="portal-content">
                <form onSubmit={handleSubmit} className="portal-form">

                    {/* Item Details */}
                    <div className="form-section">
                        <h3>Item Details</h3>
                        <div className="input-group">
                            <label>Item Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Hyderabadi Chicken Biryani"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe ingredients, taste profile, etc..."
                                rows="4"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Quantity Available</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="e.g. 50"
                                required
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
                        <button type="button" className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Item'}
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
                    <div className="preview-card">
                        <div className="preview-image-box">
                            {previewUrl ? <img src={previewUrl} alt="Preview" /> : <span>No Image</span>}
                        </div>
                        <div className="preview-details">
                            <h4>{name || 'Item Name'}</h4>
                            <p>{description || 'Description will appear here...'}</p>
                            <div className="preview-badge">Qty: {quantity || '0'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFoodPost;
