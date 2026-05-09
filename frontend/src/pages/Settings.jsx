import { useContext, useState } from 'react';
import { LogOut, Save, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile, changePassword } from '../api';

const Settings = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Profile editing state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage(null);

    try {
      const result = await updateProfile({
        name: profileData.name.trim(),
        email: profileData.email.trim(),
      });
      
      // Update the auth context with new user data
      setUser(result.data);
      
      // Update token if a new one was issued (name changed in JWT)
      if (result.token) {
        localStorage.setItem('token', result.token);
      }

      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMessage({
        type: 'error',
        text: err.response?.data?.error?.message || 'Failed to update profile.',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    setPasswordLoading(true);

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMessage({
        type: 'error',
        text: err.response?.data?.error?.message || 'Failed to change password.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '2rem' }}>
      <h1 className="text-h1" style={{ color: 'var(--color-primary-dark)', marginBottom: '2rem' }}>Account Settings</h1>
      
      {/* Profile Card */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-accent-blue))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 700, flexShrink: 0 }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>{user.name}</h2>
          <p className="text-body" style={{ marginBottom: '0.25rem' }}>{user.email}</p>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: user.role === 'admin' ? '#fef3c7' : '#e0e7ff', color: user.role === 'admin' ? '#92400e' : 'var(--color-accent-blue)', borderRadius: '1rem', fontWeight: 600, fontSize: '0.8rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {user.role}
          </span>
        </div>
      </div>

      {/* Profile Information — Editable */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 className="text-h3" style={{ marginBottom: '1.5rem' }}>Profile Information</h3>
        
        {profileMessage && (
          <div style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            background: profileMessage.type === 'success' ? '#ecfdf5' : '#fee2e2',
            color: profileMessage.type === 'success' ? '#065f46' : '#b91c1c',
          }}>
            {profileMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {profileMessage.text}
          </div>
        )}

        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="input-field"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={profileLoading} style={{ marginTop: '0.5rem' }}>
            <Save size={18} />
            {profileLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 className="text-h3" style={{ marginBottom: '1.5rem' }}>Change Password</h3>

        {passwordMessage && (
          <div style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            background: passwordMessage.type === 'success' ? '#ecfdf5' : '#fee2e2',
            color: passwordMessage.type === 'success' ? '#065f46' : '#b91c1c',
          }}>
            {passwordMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {passwordMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="At least 6 characters"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Re-enter new password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={passwordLoading} style={{ marginTop: '0.5rem' }}>
            <Lock size={18} />
            {passwordLoading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderLeft: '4px solid var(--color-accent-red)' }}>
        <h3 className="text-h3" style={{ marginBottom: '1rem', color: 'var(--color-accent-red)' }}>Session</h3>
        <p className="text-body" style={{ marginBottom: '1.25rem' }}>
          Sign out from your account. You'll need to sign in again to access the platform.
        </p>
        <button className="btn-primary" onClick={handleLogout} style={{ backgroundColor: 'var(--color-accent-red)' }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
