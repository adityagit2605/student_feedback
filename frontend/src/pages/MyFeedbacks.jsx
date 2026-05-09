import { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MessageSquare, Calendar, Star, Trash2 } from 'lucide-react';
import { fetchMyFeedbacks, deleteFeedback } from '../api';

const MyFeedbacks = () => {
  const { refreshKey } = useOutletContext();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchMyFeedbacks({ limit: 100 });
      setFeedbacks(result.data);
    } catch (err) {
      setError('Failed to load your feedbacks. Please try again.');
      console.error("Failed to load your feedbacks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFeedbacks();
  }, [loadFeedbacks, refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      await deleteFeedback(id);
      setFeedbacks(prev => prev.filter(fb => fb.id !== id));
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to delete feedback.');
    }
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={14} 
            fill={star <= rating ? 'var(--color-accent-yellow)' : 'transparent'} 
            color={star <= rating ? 'var(--color-accent-yellow)' : '#cbd5e1'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <h1 className="text-h1" style={{ color: 'var(--color-primary-dark)', marginBottom: '2rem' }}>My Feedbacks</h1>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading your feedbacks...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--border-radius-lg)', color: 'var(--color-accent-red)' }}>
          {error}
        </div>
      ) : feedbacks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--border-radius-lg)' }}>
          <MessageSquare size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>No Feedbacks Yet</h3>
          <p className="text-body">You haven't submitted any feedback yet. Check out the courses and be the first to share your thoughts!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {feedbacks.map(fb => (
            <div key={fb.id} className="card" style={{ padding: '1.5rem' }}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <h3 className="text-h3" style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>
                  {fb.course?.courseName || 'Unknown Course'}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <Calendar size={14} />
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => handleDelete(fb.id)}
                    style={{ color: 'var(--color-text-muted)', padding: '0.25rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent-red)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                    title="Delete feedback"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                {renderStars(fb.rating)}
              </div>
              <p className="text-body">{fb.comments}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFeedbacks;
