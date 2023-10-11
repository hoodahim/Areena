import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Import pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FrontPage from './pages/FrontPage';

// import components
import Navbar from './components/Navbar';

function App() {
  const { state } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={state.user ? <Home /> : <FrontPage />} />
            <Route
              path="/signup"
              element={!state.user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!state.user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
