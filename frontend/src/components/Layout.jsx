import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import SubmitFeedbackModal from './SubmitFeedbackModal';
import AddCourseDrawer from './AddCourseDrawer';
import './Layout.css';

const Layout = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAddCourseDrawerOpen, setIsAddCourseDrawerOpen] = useState(false);

  return (
    <div className="layout-container">
      <SidebarLeft />
      
      <main className="main-content">
        <Outlet />
      </main>

      <SidebarRight 
        onAddCourse={() => setIsAddCourseDrawerOpen(true)}
        onSubmitFeedback={() => setIsFeedbackModalOpen(true)}
      />

      {isFeedbackModalOpen && (
        <SubmitFeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
      )}

      {isAddCourseDrawerOpen && (
        <AddCourseDrawer onClose={() => setIsAddCourseDrawerOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
