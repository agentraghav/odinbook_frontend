import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './comment';
import { Col } from 'react-bootstrap';
function CommentList(props) {
  const { postId, renderCount, loggedUserId } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get('/posts/' + postId + '/comments')
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {});
  }, [postId, renderCount]);

  return (
    <>
      <Col md='12'>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            loggedUserId={loggedUserId}
          />
        ))}
      </Col>
    </>
  );
}

export default CommentList;
