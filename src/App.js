import { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { Index, Home, Register, ProtectedRoute } from './pages';
function App() {
  const [user, setUser] = useState(undefined);

  const reloadUser = () => {
    if (user) {
      axios
        .get(`/users/${user._id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const getUser = (token) => {
    const config = { headers: { Authorization: `bearer ${token}` } };
    axios.get('/isLoggedIn', config).then((res) => {
      axios.get(`/users/${res.data.user_id}`).then((res) => {
        setUser(res.data);
      });
    });
  };

  useEffect(() => {
    const token =
      localStorage.getItem('token') || document.cookie.split('=')[1];
    if (token) {
      localStorage.setItem('token', token);
      getUser(token);
    }
  }, []);

  const props = { user, reloadUser, setUser };

  return (
    <>
      <Router>
        <Container style={{ minHeight: '100vh' }} fluid className='p-0'>
          <ProtectedRoute
            exact
            path='/home'
            setUser={setUser}
            {...props}
            component={Home}
          />
          <Route
            path='/register'
            render={() => <Register getUser={getUser} {...props} />}></Route>
          <Route
            path='/'
            exact
            render={() => <Index getUser={getUser} {...props} />}></Route>
        </Container>
      </Router>
    </>
  );
}

export default App;
