import Login from './pages/Login';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { Stories } from './pages/Stories';
import { Profile } from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Product } from './pages/Product';
import { Contact } from './pages/Contact';
import { SearchUser } from './pages/SearchUser';

function App() {
  useEffect(() => {
    const isNewToStory = localStorage.getItem('stories:nts');
    if (!isNewToStory) {
      localStorage.setItem('stories:nts', 'true');
    }
  }, []);
  return (
    <Flex
      flexDirection="column"
      height="100%"
      minHeight="100vh"
      position="relative"
      bg="#1a202c"
    >
      <Navbar />
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/stories/:storyId" element={<Stories />} />
        <PrivateRoute path="/u/:userId" element={<Profile />} />
        <PrivateRoute path="/u" element={<SearchUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Flex>
  );
}

export default App;
