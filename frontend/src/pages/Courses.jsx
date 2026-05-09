import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Star, ArrowRight, Search } from 'lucide-react';
import { fetchCourses } from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchCourses({ search: searchTerm, limit: 100 });
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadCourses, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const renderStars = (rating) => {
    if (!rating) return <span className="text-small">No ratings yet</span>;
    return (
      <div className="rating-display" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-accent-yellow)', fontWeight: 600 }}>
        {rating} <Star size={16} fill="var(--color-accent-yellow)" color="var(--color-accent-yellow)" />
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1 className="text-h1" style={{ color: 'var(--color-primary-dark)' }}>All Courses</h1>
        
        <div style={{ display: 'flex', gap: '1rem', width: '300px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading courses...</div>
      ) : courses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--border-radius-lg)' }}>
          No courses found matching your search.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {courses.map(course => (
            <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 className="text-h3" style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>{course.courseName}</h3>
                <p className="text-small">by {course.instructorName} • {course.credits} Credits</p>
              </div>
              <div style={{ flex: 1, marginBottom: '1.5rem' }}>
                <p className="text-body" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {course.description}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <div>
                  {renderStars(course.averageRating)}
                  <span className="text-small" style={{ display: 'block', marginTop: '0.25rem' }}>
                    {course.feedbackCount} reviews
                  </span>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ padding: '0.5rem 1rem' }}
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
