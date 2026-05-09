import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Book, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { fetchCourses } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalCourses: 0, totalFeedbacks: 0, avgRating: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchCourses({ search: searchTerm, limit: 100 });
        const courseData = response.data;
        setCourses(courseData);
        
        // Calculate global stats
        const totalF = courseData.reduce((acc, curr) => acc + (curr.feedbackCount || 0), 0);
        const coursesWithRatings = courseData.filter(c => c.averageRating);
        const avgR = coursesWithRatings.length > 0 
          ? coursesWithRatings.reduce((acc, curr) => acc + curr.averageRating, 0) / coursesWithRatings.length
          : 0;

        setStats({
          totalCourses: courseData.length,
          totalFeedbacks: totalF,
          avgRating: avgR.toFixed(1)
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const renderStars = (rating) => {
    if (!rating) return <span className="text-small">No ratings yet</span>;
    return (
      <div className="rating-display">
        {rating} <Star size={16} fill="var(--color-accent-yellow)" color="var(--color-accent-yellow)" />
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-banner">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="text-h1" style={{ color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              Welcome back, Administrator!
            </h1>
            <p style={{ color: '#475569', maxWidth: '600px', lineHeight: 1.6 }}>
              You are just a few steps away from completing your semester evaluations. Check the latest course feedback and keep track of student satisfaction. You can do this!
            </p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon purple">
            <Book size={24} />
          </div>
          <div>
            <p className="text-small">Total Courses</p>
            <h2 className="text-h2">{stats.totalCourses}</h2>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon blue">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-small">Total Feedbacks</p>
            <h2 className="text-h2">{stats.totalFeedbacks}</h2>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon teal">
            <Star size={24} />
          </div>
          <div>
            <p className="text-small">Platform Avg Rating</p>
            <h2 className="text-h2">{stats.avgRating} <span style={{fontSize:'1rem', color:'var(--color-text-muted)'}}>/ 5</span></h2>
          </div>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search courses by name or instructor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Active Courses</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading courses...</div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--border-radius-lg)' }}>
            No courses found matching your search.
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="card course-card">
                <div className="course-card-header">
                  <h3 className="course-card-title">{course.courseName}</h3>
                  <p className="text-small">by {course.instructorName} • {course.credits} Credits</p>
                </div>
                <div className="course-card-body">
                  <p className="text-body" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {course.description}
                  </p>
                </div>
                <div className="course-card-footer">
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
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
