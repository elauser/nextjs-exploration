import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  let email = useRef()
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Signing up',
      message: 'Registering for Newsletter',
      status: 'pending'
    })

    if (validateEmail(email.current.value)) {
      fetch(`/api/newsletter`, {
        method: 'PUT',
        body: JSON.stringify({
          email: email.current.value
        },),
        headers: {
          'Content-Type': "application/json"
        }
      }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          response.json().then(data => {
            throw new Error(data.message || 'Something went wrong')
          })
        }
      })
        .then((data) => {
          notificationCtx.showNotification({
            title: 'Success',
            message: 'Registered for Newsletter',
            status: 'success'
          })
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
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      );
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={email}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
