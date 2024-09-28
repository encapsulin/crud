import AuthLogIn from './AuthLogIn';
import AuthLogOut from './AuthLogOut';
import { useState, useEffect } from 'react';

export default function Auth({ callbackClose }) {

  const [authToken, setAuthToken] = useState(authTokenGet());

  useEffect(() => {
    const token = authTokenGet();
    setAuthToken(token);
  }, []);

  return (
    <>
      {authToken ? <AuthLogOut callbackClose={callbackClose} /> : <AuthLogIn callbackClose={callbackClose} />}
    </>
  );
}

export function authTokenSet(token) {
  localStorage.setItem("jwt", token)
}

export function authTokenGet() {
  var token = localStorage.getItem("jwt")
  console.log("authTokenGet()", token)
  return token === 'null' || !token ? '' : token;
}