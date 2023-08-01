import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import React from 'react';
import Header from './components/Header/header';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log('Encode JWT token' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    // Check if the element exists before setting the 'hidden' property
    const signInDiv = document.getElementById('signInDiv');
    if (signInDiv) {
      signInDiv.hidden = true;
    }
  }

  function handleSignOut(event) {
    setUser({});

    // Check if the element exists before setting the 'hidden' property
    const signInDiv = document.getElementById('signInDiv');
    if (signInDiv) {
      signInDiv.hidden = false;
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '859878489637-c66bhkt498jqq8ahfu74tci21diklg28.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('SignInDiv'), {
      theme: 'outline',
      size: 'large',
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <div className='App'>
      <div className='gradient__bg'>
        <div id='SignInDiv'></div>
        {Object.keys(user).length !== 0 ? (
          <>
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            <div>
              <img src={user.picture} alt='User Profile' />
              <h2>{user.name}</h2>
            </div>
            <Header />
          </>
        ) : (
          <p>Please sign in with Google.</p>
        )}
      </div>
    </div>
  );
}

export default App;