import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader';
import classes from './AuthForm.module.css';



const AuthForm = () => {
  const navigate = useNavigate();
  //1
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  //2
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //function for switching between the login and
  //sign up form
  //3
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  //new function for submittion
  //for creating new account

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    //for the signing in
    let url;
    if (isLogin) {

      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0mxYbY8BAUkxn8xkl-hO14STybsSLdwo'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0mxYbY8BAUkxn8xkl-hO14STybsSLdwo'
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }

    ).then(response => {
      setIsLoading(false)
      if (response.ok) {
        return response.json();
      }
      else {
        return response.json().then((data) => {
          //show error message here
          let errorMessage = 'Authentication failed';
          //we check if we do have data
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      //for the expiration time
      const expirationTime = new Date(
        new Date().getTime() + (+data.expiresIn * 1000)
      );
      authCtx.login(data.idToken, expirationTime.toISOString());
      navigate('/');
    })
      .catch(error => {
        alert(error.message);
      });
  };


  //MAIN FORM
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>

        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>

        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <Loader/>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
