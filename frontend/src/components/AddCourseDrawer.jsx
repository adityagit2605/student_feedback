import React, { useState } from 'react';
import { X, BookPlus } from 'lucide-react';
import { createCourse } from '../api';

const AddCourseDrawer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    instructorName: '',
    credits: 3
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createCourse({
        ...formData,
        credits: parseInt(formData.credits)
      });
      onClose();
      window.location.reload(); // Quick refresh to show new course
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to create course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose} style={{ zIndex: 50 }}></div>
      <div className="drawer-content">
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <div className="flex-center gap-2">
            <BookPlus size={24} color="var(--color-primary-dark)" />
            <h2 className="text-h2">Add New Course</h2>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}
          
          <div className="form-group">
            <label className="form-label">Course Name</label>
            <input 
              type="text" 
              className="input-field" 
              required
              placeholder="e.g., Introduction to React"
              value={formData.courseName}
              onChange={e => setFormData({...formData, courseName: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Instructor Name</label>
            <input 
              type="text" 
              className="input-field" 
              required
              placeholder="e.g., Dr. Jane Smith"
              value={formData.instructorName}
              onChange={e => setFormData({...formData, instructorName: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Credits (1-10)</label>
            <input 
              type="number" 
              className="input-field" 
              required
              min="1" max="10"
              value={formData.credits}
              onChange={e => setFormData({...formData, credits: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="input-field" 
              rows="6" 
              required
              placeholder="Detailed description of the course content..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={loading}>
              {loading ? 'Adding...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourseDrawer;
