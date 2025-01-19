
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from './pages/Navigation';
import Landing from './pages/Landing';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Admin from './pages/Admin';
import { FamilyMembersProvider } from './context/FamilyMembersContext';
import theme from './lib/theme';
import './App.css';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Navigation />} >
            <Route index element={<Landing />} />
            <Route path={'home/*'} element={<FamilyMembersProvider><Home /></FamilyMembersProvider>} />
            <Route path={'sign-in'} element={<SignIn />} />          
            {/* <Route path={'admin'} element={<FamilyMembersProvider><Admin /></FamilyMembersProvider>} />           */}
          </Route>
        </Routes>
      </BrowserRouter>

    </ChakraProvider>
  );
};

export default App;
