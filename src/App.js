import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/auth-context';
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        <Routes>
          {authCtx.isLoggedIn && <Route path='/' element={<HomePage />} />}
          {!authCtx.isLoggedIn && <Route path='/auth' element={<AuthPage />} />}
          {authCtx.isLoggedIn && <Route path='/profile' element={<ProfilePage />} />}
          {!authCtx.isLoggedIn && <Route path='/' element={<Navigate replace to='/auth' />} />}
        </Routes>
      </Layout>

    </div>
  );
}

export default App;
