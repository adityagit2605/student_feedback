import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return null; // Or a full screen spinner
  if (user) return <Navigate to="/" replace />; // Already logged in

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        if (!formData.name) {
          setError('Name is required for registration');
          setIsLoading(false);
          return;
        }
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-brand">
          <BookOpen size={32} />
          <span>EduFeedback</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-h1" style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Empowering <br /> Educational Excellence
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '400px' }}>
            Join our platform to provide valuable feedback, improve course quality, and help administrators track student satisfaction.
          </p>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-box">
          <h2 className="text-h2" style={{ marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
            {isRegistering ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-body" style={{ marginBottom: '2rem' }}>
            {isRegistering ? 'Sign up to start sharing your feedback.' : 'Please sign in to your account.'}
          </p>

          {error && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={isRegistering}
                />
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
              {isLoading ? 'Please wait...' : (isRegistering ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <div className="auth-switch">
            {isRegistering ? (
              <p>Already have an account? <span onClick={() => setIsRegistering(false)}>Sign In</span></p>
            ) : (
              <p>Don't have an account? <span onClick={() => setIsRegistering(true)}>Sign Up</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
