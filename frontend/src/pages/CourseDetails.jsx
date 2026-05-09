import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, BookOpen, Star } from 'lucide-react';
import { fetchCourseById } from '../api';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await fetchCourseById(id);
        setCourse(response.data);
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading course details...</div>;
  if (error) return <div style={{ padding: '3rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!course) return <div style={{ padding: '3rem', textAlign: 'center' }}>Course not found.</div>;

  const { stats, feedbacks } = course;

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={16} 
            fill={star <= rating ? 'var(--color-accent-yellow)' : 'transparent'} 
            color={star <= rating ? 'var(--color-accent-yellow)' : '#cbd5e1'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="course-details-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="course-header-card">
        <div className="course-info">
          <h1 className="text-h1" style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
            {course.courseName}
          </h1>
          <p className="text-body" style={{ fontSize: '1.1rem' }}>{course.description}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <User size={18} />
              <span>{course.instructorName}</span>
            </div>
            <div className="meta-item">
              <BookOpen size={18} />
              <span>{course.credits} Credits</span>
            </div>
          </div>
        </div>

        <div className="course-stats-box">
          <h3 className="text-small" style={{ marginBottom: '0.5rem' }}>Average Rating</h3>
          <div className="big-rating">{stats.averageRating || '0.0'}</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            {renderStars(Math.round(stats.averageRating || 0))}
          </div>
          <p className="text-small" style={{ marginBottom: '1rem' }}>Based on {stats.totalFeedbacks} reviews</p>
          
          {stats.totalFeedbacks > 0 && (
            <div style={{ textAlign: 'left' }}>
              {[5, 4, 3, 2, 1].map(star => {
                const count = stats.ratingDistribution[star] || 0;
                const percentage = (count / stats.totalFeedbacks) * 100;
                return (
                  <div key={star} className="distribution-bar">
                    <span style={{ width: '12px' }}>{star}</span>
                    <Star size={10} fill="#cbd5e1" color="#cbd5e1" />
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span style={{ width: '20px', textAlign: 'right' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="feedbacks-section">
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Student Feedback</h2>
        
        {feedbacks && feedbacks.length > 0 ? (
          feedbacks.map(fb => (
            <div key={fb.id} className="feedback-card">
              <div className="feedback-header">
                <div className="feedback-author">
                  <div className="avatar-small">
                    {fb.studentName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-primary-dark)' }}>{fb.studentName}</div>
                    {renderStars(fb.rating)}
                  </div>
                </div>
                <div className="feedback-date">
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/>
                  {new Date(fb.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-body">{fb.comments}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <MessageSquare size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
            <h3 className="text-h3">No feedback yet</h3>
            <p className="text-body">Be the first to share your thoughts on this course!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
