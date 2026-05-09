import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, LayoutDashboard, MessageSquarePlus, Settings } from 'lucide-react';
import './Layout.css';

const SidebarLeft = () => {
  return (
    <aside className="sidebar-left">
      <div className="sidebar-logo">
        <BookOpen size={28} color="white" />
        <span>EduFeedback</span>
      </div>
      <nav className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          end
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink 
          to="/courses" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          Courses
        </NavLink>
        {/* Placeholder links to mimic full dashboard feel */}
        <div className="nav-item">
          <MessageSquarePlus size={20} />
          My Feedbacks
        </div>
        <div className="nav-item">
          <Settings size={20} />
          Settings
        </div>
      </nav>
    </aside>
  );
};

export default SidebarLeft;
