import Login from './pages/Login';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { Stories } from './pages/Stories';
import { Profile } from './pages/Profile';
import { Route, Switch, Redirect } from 'react-router-dom';
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
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/stories/:storyId" component={Stories} />
        <PrivateRoute exact path="/u/:userId" component={Profile} />
        <PrivateRoute exact path="/u" component={SearchUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/contact" component={Contact} />
        <Redirect to="/product" />
      </Switch>
      <Footer />
    </Flex>
  );
}

export default App;
