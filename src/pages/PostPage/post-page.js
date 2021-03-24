import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Col } from 'react-bootstrap';
import NavBar from '../../components/NavBar/navbar';
import Post from '../../components/Post/post';

function PostPage(props) {
  const { post_id } = useParams();
  const [post, setPost] = useState(undefined);
  useEffect(() => {
    axios.get('/posts/' + post_id).then((res) => {
      setPost(res.data);
    });
  });
  return (
    <>
      <NavBar />
      <Container fluid>
        <Col md='12'>
          <Post />
        </Col>
      </Container>
    </>
  );
}
import { Form } from 'react-bootstrap';

export default PostPage;
