import { useContext } from 'react';
import { User, Plus, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Layout.css';

const SidebarRight = ({ onAddCourse, onSubmitFeedback }) => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar-right">
      <div className="profile-section">
        <div className="profile-avatar" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-accent-blue))', color: 'white' }}>
          {user ? user.name.charAt(0).toUpperCase() : <User size={32} />}
        </div>
        <h3 className="text-h3" style={{ marginBottom: '0.25rem' }}>{user ? user.name : 'Guest'}</h3>
        <p className="text-small">{user ? (user.role === 'admin' ? 'System Administrator' : 'Student') : ''}</p>
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
        <h3 className="text-h3" style={{ marginBottom: '1rem' }}>Quick Tips</h3>
        <div className="news-card">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Constructive Feedback</h4>
          <p className="text-small">Focus on specific aspects of the course structure, teaching methodology, and materials when writing your feedback.</p>
        </div>
        <div className="news-card">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Anonymity Settings</h4>
          <p className="text-small">While your feedback is tracked in your profile, aggregated analytics shown to instructors do not expose individual student identities.</p>
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
