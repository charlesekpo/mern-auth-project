import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
               <AdminDashboard />
            </ProtectedRoute>} />

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App
