import { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { fetchCourses, submitFeedback } from '../api';

const SubmitFeedbackModal = ({ onClose, onSuccess }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    rating: 0,
    comments: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCourses({ limit: 100 })
      .then(res => setCourses(res.data))
      .catch(() => setError('Failed to load courses.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseId || !formData.rating || !formData.comments.trim()) {
      setError('Please select a course, choose a rating, and write your comments.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await submitFeedback({
        courseId: parseInt(formData.courseId),
        rating: formData.rating,
        comments: formData.comments.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h2 className="text-h2">Submit Feedback</h2>
          <button onClick={onClose} style={{ padding: '0.25rem', color: 'var(--color-text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--color-accent-teal)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h3 className="text-h3">Thank you for your feedback!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'var(--color-accent-red)', marginBottom: '1rem', fontSize: '0.9rem', padding: '0.75rem', background: '#fee2e2', borderRadius: '8px' }}>{error}</div>}
            
            <div className="form-group">
              <label className="form-label">Course</label>
              <select 
                className="input-field" 
                value={formData.courseId}
                onChange={e => setFormData({...formData, courseId: e.target.value})}
              >
                <option value="">Select a course</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.courseName}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={32}
                    cursor="pointer"
                    fill={(hoveredRating || formData.rating) >= star ? 'var(--color-accent-yellow)' : 'transparent'}
                    color={(hoveredRating || formData.rating) >= star ? 'var(--color-accent-yellow)' : '#cbd5e1'}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setFormData({...formData, rating: star})}
                    style={{ transition: 'all 0.1s ease' }}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Comments</label>
              <textarea 
                className="input-field" 
                rows="4" 
                placeholder="What did you think about the course?"
                value={formData.comments}
                onChange={e => setFormData({...formData, comments: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmitFeedbackModal;
