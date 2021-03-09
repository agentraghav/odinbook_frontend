import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import { FlashMessage } from './index.components';

export default function Index({ getUser, user }) {
  const location = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(undefined);

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post('/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        getUser(res.data.token);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    if (user && localStorage.getItem('token')) location.push('/home');
  }, [user]);

  return (
    <>
      <Container>
        <FlashMessage>{message}</FlashMessage>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='name@example.com'
            />
          </Form.Group>

          <Form.Group controlId='formPlaintextPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </Form.Group>
          <FormGroup>
            <Button variant='primary' type='submit'>
              Log In
            </Button>
          </FormGroup>
        </Form>
        <Link to='/register'>
          <Button variant='primary'>Create Account</Button>
        </Link>
        <div className='text-center mt-2'>
          <a
            href={
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:5000/auth/facebook'
                : ''
            }>
            <Button color='primary'>Login with Facebook</Button>
          </a>
        </div>
      </Container>
    </>
  );
}
