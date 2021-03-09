import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'reactstrap';
import { FlashMessage } from './register.components';
import { Link, useHistory } from 'react-router-dom';

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
      <Container>
        <Link to='/'>Back</Link>
        <h3 className='text-center'>Register</h3>
        <FlashMessage>{message}</FlashMessage>

        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              placeholder='John'
            />
          </Form.Group>
          <Form.Group controlId='formLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              placeholder='Doe'
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </Form.Group>

          <Form.Group controlId='formConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) => setConfirmPass(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
