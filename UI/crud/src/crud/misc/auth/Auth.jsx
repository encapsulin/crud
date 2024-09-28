import AuthLogIn from './AuthLogIn';
import AuthLogOut from './AuthLogOut';
import { useState, useEffect, useRef } from 'react';
import ModalDialog from '../modal/ModalDialog';

export default function Auth({ auth, setAuth }) {

  useEffect(() => {
    if (auth)
      modalShow();
  }, [auth]);

  const refModal = useRef();
  function modalShow() {
    refModal.current.showModal();
  }
  function modalClose() {
    refModal.current.close();
    setAuth(false)
  }

  return (
    <>
      <ModalDialog ref={refModal} title="Profile" callbackClose={modalClose}>

        {authTokenGet() ?
          <AuthLogOut callbackClose={modalClose} /> :
          <AuthLogIn callbackClose={modalClose} />}

      </ModalDialog>
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