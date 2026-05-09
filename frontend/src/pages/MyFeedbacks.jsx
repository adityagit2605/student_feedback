import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Star } from 'lucide-react';
import api from '../api';

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/feedback/me')
      .then(res => {
        setFeedbacks(res.data.data);
      })
      .catch(err => {
        console.error("Failed to load your feedbacks:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
                  {fb.course.courseName}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <Calendar size={14} />
                  {new Date(fb.createdAt).toLocaleDateString()}
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
