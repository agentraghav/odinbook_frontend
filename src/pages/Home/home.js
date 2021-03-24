import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Col, Card, Form, Button, Row } from 'react-bootstrap';
import PostForm from '../../components/PostForm/post-form';
import NavBar from '../../components/NavBar/navbar';
import RoundImage from '../../components/RoundImage/round-image';
import { Link, useHistory } from 'react-router-dom';
import Post from '../../components/Post/post';
import './styles.css';
function Home({ setUser, user, reloadUser }) {
  const [posts, setPosts] = useState([]);
  const postInput = document.querySelector('#post_input_form');

  const location = useHistory();

  useEffect(() => {
    axios.get('/posts').then((res) => {
      const postIDs = user.friend.map((friend) => friend._id);
      postIDs.push(user._id);
      setPosts(res.data.filter((post) => postIDs.includes(post.user._id)));
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col md='12' className='post-style'>
            <PostForm />
          </Col>
          <Col md='12' className='post-style'>
            <Post />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
