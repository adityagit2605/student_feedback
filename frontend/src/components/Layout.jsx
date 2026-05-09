import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import SubmitFeedbackModal from './SubmitFeedbackModal';
import AddCourseDrawer from './AddCourseDrawer';
import './Layout.css';

const Layout = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAddCourseDrawerOpen, setIsAddCourseDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="layout-container">
      <SidebarLeft />
      
      <main className="main-content">
        <Outlet context={{ refreshKey }} />
      </main>

      <SidebarRight 
        onAddCourse={() => setIsAddCourseDrawerOpen(true)}
        onSubmitFeedback={() => setIsFeedbackModalOpen(true)}
      />

      {isFeedbackModalOpen && (
        <SubmitFeedbackModal
          onClose={() => setIsFeedbackModalOpen(false)}
          onSuccess={triggerRefresh}
        />
      )}

      {isAddCourseDrawerOpen && (
        <AddCourseDrawer
          onClose={() => setIsAddCourseDrawerOpen(false)}
          onSuccess={triggerRefresh}
        />
      )}
    </div>
  );
};

export default Layout;
