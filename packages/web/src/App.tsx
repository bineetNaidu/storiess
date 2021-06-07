import { Box } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/Login';
import { Stories } from './pages/Stories';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Box height="100%" minHeight="100vh">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/stories/:userId" component={Stories} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Box>
  );
}

export default App;
