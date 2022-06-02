import { useRef } from 'react';
import classes from './newsletter-registration.module.css';


function NewsletterRegistration() {
  let email = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    if (validateEmail(email.current.value)) {
      fetch(`/api/newsletter`, {
        method: 'PUT',
        body: JSON.stringify({
          email: email.current.value
        },),
        headers: {
          'Content-Type': "application/json"
        }
      }).then(response => response.json())
        .then((data) => {
          console.log(data)
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
