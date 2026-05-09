import React, { useContext } from 'react';
import { User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1 className="text-h1" style={{ color: 'var(--color-primary-dark)', marginBottom: '2rem' }}>Account Settings</h1>
      
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>{user.name}</h2>
          <p className="text-body" style={{ marginBottom: '0.25rem' }}>{user.email}</p>
          <p className="text-small" style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#e0e7ff', color: 'var(--color-accent-blue)', borderRadius: '1rem', fontWeight: 600, marginTop: '0.5rem' }}>
            {user.role.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 className="text-h3" style={{ marginBottom: '1.5rem' }}>Profile Information</h3>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" className="input-field" value={user.name} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" className="input-field" value={user.email} disabled />
        </div>
        <p className="text-small" style={{ marginTop: '1rem' }}>
          * Currently, changing profile information is disabled in this basic version.
        </p>
      </div>

      <button className="btn-primary" onClick={handleLogout} style={{ backgroundColor: 'var(--color-accent-red)' }}>
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  );
};

export default Settings;
