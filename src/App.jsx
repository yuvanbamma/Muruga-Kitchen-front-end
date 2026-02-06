import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import CreateFoodPost from './components/CreateFoodPost'
import FoodPostList from './components/FoodPostList'
import FoodPostDetails from './components/FoodPostDetails'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css'
import './styles/animations.css'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ErrorBoundary>
            <div className="app-container">
              <Header />
              <main className="content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/menu" element={<FoodPostList />} />
                  <Route path="/create" element={<CreateFoodPost />} />
                  <Route path="/post/:postId" element={<FoodPostDetailsWrapper />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </ErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

// Helper to pass params to FoodPostDetails
import { useParams, useNavigate } from 'react-router-dom';
function FoodPostDetailsWrapper() {
  const { postId } = useParams();
  const navigate = useNavigate();
  return <FoodPostDetails postId={postId} onBack={() => navigate('/menu')} />;
}

export default App
