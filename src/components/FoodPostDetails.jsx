import { useState, useEffect } from 'react';
import api from '../utils/api';
import './FoodPostDetails.css';
import EditFoodModal from './EditFoodModal';
import { useAuth } from '../context/AuthContext';

const FoodPostDetails = ({ postId, onBack }) => {
  const { user, isOrphanage } = useAuth();
  const [post, setPost] = useState(null);
  const [orphanageDetails, setOrphanageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/food-posts/${postId}`);
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [postId]);

  const fetchContact = async () => {
    if (!post?.orphaneId) return;
    setContactLoading(true);
    try {
      const org = await api.get(`/orphanage?orphanageId=${post.orphaneId}`);
      let userData = { email: 'N/A', phoneNumber: 'N/A' };
      if (org.userIdentity) {
        try {
          userData = await api.get(`/users?userId=${org.userIdentity}`);
        } catch (_) {}
      }
      setOrphanageDetails({ ...org, ...userData });
      setShowContact(true);
    } catch (_) {
      alert('Could not load contact details.');
    } finally {
      setContactLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this requirement?')) return;
    try {
      await api.delete(`/food-posts?id=${postId}`);
      onBack();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  if (loading) return (
    <div className="details-loading">
      <div className="loader-spinner" />
      <p>Loading...</p>
    </div>
  );
  if (error) return (
    <div className="details-error">
      <h2>Unable to load</h2>
      <p>{error}</p>
      <button className="btn-secondary" onClick={onBack}>Back</button>
    </div>
  );
  if (!post) return null;

  const progress = Math.min(100, Math.round((post.collectedQuantity || 0) / (post.quantityRequired || 1) * 100));
  const distanceKm = typeof post.distance === 'number' ? post.distance : null;
  const isOwner = user?.userId === post.userId;

  return (
    <div className="details">
      <div className="details-nav">
        <button className="details-back" onClick={onBack}>← Back</button>
      </div>
      <div className="details-main">
        <div className="details-media">
          <img
            src={post.imageUrl ? (post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.VITE_API_URL}${post.imageUrl}`) : 'https://placehold.co/800x480?text=Need'}
            alt={post.name}
            onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x480?text=Need'; }}
          />
          <div className="details-stats">
            <div className="details-stat"><span className="val">{post.quantityRequired || 0}</span><span className="lbl">Goal</span></div>
            <div className="details-stat"><span className="val">{post.collectedQuantity || 0}</span><span className="lbl">Collected</span></div>
            <div className="details-stat"><span className="val">{post.expireTime ? new Date(post.expireTime).toLocaleDateString() : 'ASAP'}</span><span className="lbl">Deadline</span></div>
            <div className="details-stat"><span className="val">{distanceKm != null ? distanceKm.toFixed(1) : '–'}</span><span className="lbl">Distance (km)</span></div>
          </div>
        </div>
        <div className="details-content">
          <h1>{post.name}</h1>
          <div className="details-org">
            <div className="details-org-avatar">{orphanageDetails?.officialName?.charAt(0) || 'O'}</div>
            <div>
              <strong>{orphanageDetails?.officialName || 'Orphanage'}</strong>
              <span>{orphanageDetails?.landmark || 'Verified'}</span>
            </div>
          </div>
          <div className="details-desc">
            <h3>About</h3>
            <p>{post.requirement || post.description || 'This organization needs your support for meals.'}</p>
          </div>
          <div className="details-progress">
            <div className="details-progress-header"><span>Progress</span><strong>{progress}%</strong></div>
            <div className="details-progress-bar"><div style={{ width: `${progress}%` }} /></div>
            <p className="details-progress-note">{(post.quantityRequired || 0) - (post.collectedQuantity || 0)} servings still needed.</p>
          </div>
          <div className="details-actions">
            {isOwner ? (
              <>
                <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn-secondary" onClick={handleDelete} style={{ color: 'var(--error)' }}>Delete</button>
              </>
            ) : (
              <button className="btn-primary" onClick={fetchContact} disabled={contactLoading}>
                {contactLoading ? 'Loading...' : 'Connect & Donate'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showContact && orphanageDetails && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{orphanageDetails.officialName}</h2>
              <button className="modal-close" onClick={() => setShowContact(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="contact-row">
                <span>Phone</span>
                <a href={`tel:${orphanageDetails.userPhone || orphanageDetails.contactPersonContact}`}>{orphanageDetails.userPhone || orphanageDetails.contactPersonContact || 'N/A'}</a>
              </div>
              <div className="contact-row">
                <span>Email</span>
                <a href={`mailto:${orphanageDetails.userEmail || orphanageDetails.email}`}>{orphanageDetails.userEmail || orphanageDetails.email || 'N/A'}</a>
              </div>
              {orphanageDetails.fullAddress && (
                <div className="contact-row">
                  <span>Address</span>
                  <p>{orphanageDetails.fullAddress}{orphanageDetails.landmark ? ` (${orphanageDetails.landmark})` : ''}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => window.open(`tel:${orphanageDetails.userPhone || orphanageDetails.contactPersonContact}`)}>Call</button>
              <button className="btn-secondary" onClick={() => setShowContact(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <EditFoodModal post={post} onSave={p => { setPost(p); setIsEditing(false); }} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default FoodPostDetails;
