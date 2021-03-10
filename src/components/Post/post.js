import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
function Post() {
  return (
    <>
      <Card
        style={{
          width: '30rem',
          marginBottom: '30px',
          marginTop: '20px',
        }}>
        <Card.Body>
          <Card.Title>Post data</Card.Title>
        </Card.Body>
        <Col style={{ marginTop: '20px', marginBottom: '20px' }} sm='6'>
          <span style={{ marginLeft: '20px' }}>
            <i className='fa fa-heart' aria-hidden='true'></i>
          </span>
          <span style={{ marginLeft: '30px' }}>
            <i className='fa fa-comment' aria-hidden='true'></i>
          </span>
        </Col>{' '}
      </Card>
    </>
  );
}

export default Post;
