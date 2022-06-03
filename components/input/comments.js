import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

import NotificationContext from '../../store/notification-context';


function Comments(props) {
  const notificationCtx = useContext(NotificationContext)
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)

  useEffect(() => {
    if (showComments) {
      setLoadingComments(true)
      fetch('/api/comments/' + eventId)
      .then(response => response.json())
      .then(data => {
        setComments(data)
        setLoadingComments(false)
      })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = (commentData) => {
    notificationCtx.showNotification({
      title: 'Add Comment',
      message: 'Adding a new Comment',
      status: 'pending'
    })
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong')
        })
      }
    })
    .then(data => {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Registered new Comment',
        status: 'success'
      })
      comments.push(commentData)
      setComments(comments)
      console.log(data)
    })
    .catch(error => {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message || 'Something went wrong',
        status: 'error'
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {(showComments && loadingComments) && <b>Loading Comments ... </b>}
      {showComments && <CommentList comments={comments}/>}
    </section>
  );
}

export default Comments;
