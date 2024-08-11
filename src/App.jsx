
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './pages/Navigation';
import Landing from './pages/Landing';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { FamilyMembersProvider } from './context/FamilyMembersContext';
import './App.css';

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Landing />} />
          <Route path={'home'} element={<FamilyMembersProvider><Home /></FamilyMembersProvider>} />
          <Route path={'sign-in'} element={<SignIn />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
