import { useState } from 'react';
import api from '../utils/api';
import './EditFoodModal.css';

const EditFoodModal = ({ post, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: post.name || '',
    description: post.description || post.requirement || '',
    quantity: post.quantity || post.quantityRequired || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const postId = post.id || post.uuid || post.foodPostId;
    try {
      const updated = await api.put(`/food-posts/${postId}`, { id: postId, ...formData });
      onSave(updated);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h2>Edit</h2>
          <button className="edit-modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Mission name" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Details..." />
          </div>
          <div className="form-group">
            <label>Quantity (servings)</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min={0} />
          </div>
          {error && <div className="edit-modal-error">{error}</div>}
          <div className="edit-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodModal;
