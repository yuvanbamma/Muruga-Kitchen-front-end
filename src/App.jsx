import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import CreateFoodPost from './components/CreateFoodPost'
import FoodPostList from './components/FoodPostList'
import FoodPostDetails from './components/FoodPostDetails'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import './App.css'
import './styles/animations.css'

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'list', 'create', 'details'
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (id) => {
    setSelectedPostId(id);
    setView('details');
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setView('list');
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <Header currentView={view} setView={setView} />

        <main className="content">
          {view === 'dashboard' && <Dashboard setView={setView} />}
          {view === 'list' && <FoodPostList onPostClick={handlePostClick} />}
          {view === 'create' && <CreateFoodPost />}
          {view === 'details' && (
            <FoodPostDetails
              postId={selectedPostId}
              onBack={handleBackToList}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
