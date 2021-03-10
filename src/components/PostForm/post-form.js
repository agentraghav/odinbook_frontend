import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, FormControl, Button } from 'react-bootstrap';
function PostForm() {
  const [message, setMessage] = useState('');
  const [post, setPost] = useState('');
  const location = useHistory();
  const submitHandler = (e) => {
    axios
      .post('/posts')
      .then((res) => {
        location.push('/');
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
      });
  };
  return (
    <>
      <Card
        style={{
          width: '30rem',
          marginBottom: '30px',
          marginTop: '20px',
        }}>
        <Card.Body>
          <Card.Title>What's on your mind ?</Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Control
                onChange={(e) => setPost(e.target.value)}
                as='textarea'
                rows={3}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default PostForm;
