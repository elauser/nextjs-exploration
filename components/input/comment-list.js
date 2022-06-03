import classes from './comment-list.module.css';


function CommentList({comments}) {
  const comment_component = comments.map(comment => {
    return (
      <li key={comment._id}>
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>
  )})

  return (
    <ul className={classes.comments}>
      {comment_component}
    </ul>
  );
}

export default CommentList;
