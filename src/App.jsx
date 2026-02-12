import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import './App.css'
import './styles/animations.css'

// Lazy Load Components
const Dashboard = lazy(() => import('./components/Dashboard'))
const FoodPostList = lazy(() => import('./components/FoodPostList'))
const CreateFoodPost = lazy(() => import('./components/CreateFoodPost'))
const FoodPostDetails = lazy(() => import('./components/FoodPostDetails'))
const Login = lazy(() => import('./components/Login'))
const Signup = lazy(() => import('./components/Signup'))
const HeroAwards = lazy(() => import('./components/HeroAwards'))

// Loading Fallback Component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading Muruga Kitchen Mission...</p>
  </div>
);

// Smart Home Route - redirects authenticated users to food list
const SmartHome = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/donations" replace /> : <Dashboard />;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ErrorBoundary>
            <div className="app-container">
              <Header />
              <main className="content">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<SmartHome />} />
                    <Route path="/donations" element={<FoodPostList />} />
                    <Route path="/my-requirements" element={<FoodPostList isOrphanageView={true} />} />
                    <Route path="/create" element={<CreateFoodPost />} />
                    <Route path="/post/:postId" element={<FoodPostDetailsWrapper />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />
                    <Route path="/awards" element={<HeroAwards />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
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
  return <FoodPostDetails postId={postId} onBack={() => navigate('/donations')} />;
}

export default App
