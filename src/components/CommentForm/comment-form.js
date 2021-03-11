import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
function CommentForm(props) {
  const { postId, triggerRender, loggedUserId } = props;
  const [finishedAsync, setFinishedAsync] = useState(true);
  const [message, setMessage] = useState('');
  const [content, setContent] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setFinishedAsync(false);
    setMessage('');

    const newComment = {
      user: loggedUserId,
      content: content,
    };

    const token = localStorage.getItem('token');
    axios
      .post(`/posts/${postId}/comments`, newComment, {
        withCredentials: true,
        headers: { csrf: token },
      })
      .then((response) => {
        triggerRender();
        e.target.reset();
        setFinishedAsync(true);
      })
      .catch((err) => {
        if (!err.response) {
          setMessage(err.response.data.message);
        }
        setFinishedAsync(true);
      });
  };

  return (
    <>
      <Card
        style={{
          width: '25rem',
          marginBottom: '30px',
          marginTop: '20px',
        }}>
        {message && <Alert variant='danger'>{message}</Alert>}
        <Card.Body>
          <Card.Title>Comment</Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Control
                type='text'
                placeholder='comments'
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>{' '}
    </>
  );
}

export default CommentForm;
