import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  Form,
  Container,
  Col,
  FormGroup,
  Button,
  Alert,
} from 'react-bootstrap';
import './styles.css';
import NavBar from '../../components/NavBar/navbar';

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
      <Container fluid>
        <Col className='box'>
          <h2 className='heading-abv'>Odin Book</h2>
          <h2 className='heading'>Log In </h2>
          {message && <Alert variant='danger'>{message}</Alert>}
          <Form className='form-style' onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label className='set-color'>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='name@example.com'
              />
            </Form.Group>

            <Form.Group controlId='formPlaintextPassword'>
              <Form.Label className='set-color'>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
              />
            </Form.Group>
            <FormGroup>
              <Button className='but-color' type='submit'>
                Log In
              </Button>
            </FormGroup>
          </Form>
          <Link to='/register'>
            <Button className='but-color'>Create Account</Button>
          </Link>
          <div className='text-center mt-2'>
            <a
              href={
                process.env.NODE_ENV === 'development'
                  ? 'http://localhost:5000/auth/facebook'
                  : ''
              }>
              <Button className='but-color'>Login with Facebook</Button>
            </a>
          </div>
        </Col>
      </Container>
    </>
  );
}
