import { Box } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Box height="100%" minHeight="100vh">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Box>
  );
}

export default App;
