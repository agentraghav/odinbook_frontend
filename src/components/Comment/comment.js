import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col } from 'react-bootstrap';

function Comment(props) {
  const { comment, loggedUserId } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.comment.likes.length);
  const [finishedAsync, setFinishedAsync] = useState(true);
  useEffect(() => {
    const foundUser = comment.likes.find(
      (user) => user.toString() === loggedUserId
    );

    foundUser == null ? setIsLiked(false) : setIsLiked(true);
  }, [comment.likes, loggedUserId]);

  const handleLike = async () => {
    setFinishedAsync(false);

    const previousLikes = likes;

    try {
      if (!isLiked) {
        setLikes(likes + 1);
        await axios.put(`/posts/${comment.post}/comments/${comment._id}/like`, {
          _id: loggedUserId,
        });
      } else {
        setLikes(likes - 1);
        await axios.put(
          `/posts/${comment.post}/comments/${comment._id}/dislike`,
          { _id: loggedUserId }
        );
      }

      setIsLiked(!isLiked);
    } catch (err) {
      setLikes(previousLikes);
    } finally {
      setFinishedAsync(true);
    }
  };

  return (
    <>
      <Card
        style={{
          width: '25rem',
          marginBottom: '30px',
          marginTop: '20px',
        }}>
        <Card.Body>
          <Card.Title>
            {comment.user.firstname} {comment.user.lastname}
          </Card.Title>
        </Card.Body>
        <Col>
          <p>{comment.content}</p>
        </Col>
        <Col>
          <span style={{ marginLeft: '20px' }}>
            <i
              onClick={handleLike}
              className='fa fa-heart'
              aria-hidden='true'></i>{' '}
            ({likes})
          </span>
        </Col>
      </Card>
    </>
  );
}

export default Comment;
