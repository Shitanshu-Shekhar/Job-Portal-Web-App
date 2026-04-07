import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchJobs from './pages/SearchJobs';
import Home from './pages/Home';
import Companies from './pages/Companies';
import Services from './pages/Services';
import ApplyJob from './pages/ApplyJob';
import JobList from './pages/JobList';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<ProtectedRoute><SearchJobs /></ProtectedRoute>} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/services" element={<Services />} />
          <Route path="/apply" element={<ApplyJob />} />
          <Route path="/jobs" element={<JobList />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
