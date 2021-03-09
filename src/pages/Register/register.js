import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/navbar';
import './styles.css';
function Register({ user, reloadUser, getUser }) {
  const location = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState(undefined);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setMessage('Passwords do not match');
      return;
    }
    axios
      .post('/register', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        localStorage.setItem('token', res.data);
        getUser(res.data);
        location.push('/');
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    if (user) location.push('/home');
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      if (message) setMessage(undefined);
    }, 3000);
  }, [message]);

  return (
    <>
      <NavBar />
      <Container fluid>
        <Col className='box-2'>
          <h2 className='heading'>Register</h2>
          {message && <Alert variant='danger'>{message}</Alert>}
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId='formFirstName'>
              <Form.Label className='set-color'>First Name</Form.Label>
              <Form.Control
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
                placeholder='John'
              />
            </Form.Group>
            <Form.Group controlId='formLastName'>
              <Form.Label className='set-color'>Last Name</Form.Label>
              <Form.Control
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                placeholder='Doe'
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='set-color'>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Enter email'
              />

              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label className='set-color'>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
              />
            </Form.Group>

            <Form.Group controlId='formConfirmPassword'>
              <Form.Label className='set-color'>Confirm Password</Form.Label>
              <Form.Control
                onChange={(e) => setConfirmPass(e.target.value)}
                type='password'
                placeholder='Password'
              />
            </Form.Group>
            <Button className='but-color' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Container>
    </>
  );
}

export default Register;
