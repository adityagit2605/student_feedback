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
        <NavLink 
          to="/my-feedbacks" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <MessageSquarePlus size={20} />
          My Feedbacks
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarLeft;
