import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { NavItem, RoundImage, NoPostsDiv, FakeLink } from './Home.components';
import { Navbar, PostForm, Post, LoadingOverlay } from '../../Components';
import { Link } from 'react-router-dom';

function Home({ setUser, user, reloadUser }) {
  const [posts, setPosts] = useState([]);
  const postInput = document.querySelector('#post_input_form');

  useEffect(() => {
    axios.get('/posts').then((res) => {
      const postIDs = user.friend.map((friend) => friend._id);
      postIDs.push(user._id);
      setPosts(res.data.filter((post) => postIDs.includes(post.user._id)));
    });
  }, []);

  return (
    <>
      <Container fluid></Container>
    </>
  );
}

export default Home;
