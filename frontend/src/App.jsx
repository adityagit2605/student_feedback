import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import MyFeedbacks from './pages/MyFeedbacks';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="courses" element={<Courses />} />
          <Route path="my-feedbacks" element={<MyFeedbacks />} />
          <Route path="settings" element={<Settings />} />
          {/* Fallback for undefined routes within layout */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
      
      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
