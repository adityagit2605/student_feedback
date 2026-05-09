import React from 'react';
import { User, Plus, Star } from 'lucide-react';
import './Layout.css';

const SidebarRight = ({ onAddCourse, onSubmitFeedback }) => {
  return (
    <aside className="sidebar-right">
      <div className="profile-section">
        <div className="profile-avatar">
          <User size={32} />
        </div>
        <h3 className="text-h3" style={{ marginBottom: '0.25rem' }}>Aditya Pandey</h3>
        <p className="text-small">System Administrator</p>
      </div>

      <div className="quick-actions">
        <button className="quick-btn primary" onClick={onAddCourse}>
          <Plus size={20} />
          Add New Course
        </button>
        <button className="quick-btn outline" onClick={onSubmitFeedback}>
          <Star size={20} />
          Submit Feedback
        </button>
      </div>

      <div className="news-section">
        <h3 className="text-h3" style={{ marginBottom: '1rem' }}>Platform Updates</h3>
        <div className="news-card">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>New Analytics Feature</h4>
          <p className="text-small">We've added visual star ratings to all course listings to help you evaluate feedback faster.</p>
        </div>
        <div className="news-card">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Fall Semester Courses</h4>
          <p className="text-small">Make sure to submit your feedback before the end of the term. Your opinion matters!</p>
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
