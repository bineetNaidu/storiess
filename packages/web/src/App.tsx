import { Flex } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/Login';
import { Stories } from './pages/Stories';
import { Profile } from './pages/Profile';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <Flex
      flexDirection="column"
      height="100%"
      minHeight="100vh"
      position="relative"
    >
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/stories/:storyId" component={Stories} />
        <PrivateRoute exact path="/u/:userId" component={Profile} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </Flex>
  );
}

export default App;
