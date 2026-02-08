import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './EditFoodModal.css';

const EditFoodModal = ({ post, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: post.name || '',
        description: post.description || '',
        quantity: post.quantity || 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Track original data to send only changed fields if possible
    // Note: Backend has @NotNull on some fields, so we send the full set if needed.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Prepare the request body
        // User asked to send only changing fields, but including the ID
        const postId = post.id || post.uuid || post.foodPostId;
        const updatePayload = {
            id: postId,
            ...formData
        };

        try {
            const updatedPost = await api.put(`/food-posts/${postId}`, updatePayload);
            onSave(updatedPost);
            onClose();
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container slide-up">
                <div className="modal-header">
                    <h2>Edit Mission Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Mission/Event Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Wedding Surplus Donation"
                        />
                    </div>

                    <div className="form-group">
                        <label>Details & Safety Info</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="Describe the food and storage info..."
                        />
                    </div>

                    <div className="form-group">
                        <label>People it can serve</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    {error && <div className="modal-error">⚠️ {error}</div>}

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? 'Updating Mission...' : 'Update Mission'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFoodModal;
