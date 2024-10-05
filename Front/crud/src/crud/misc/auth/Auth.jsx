import AuthLogIn from './AuthLogIn';
import AuthLogOut from './AuthLogOut';
import { useEffect, useRef } from 'react';
import ModalDialog from '../modal/ModalDialog';
import { useAuthData } from '../context/AuthDataContext'

export default function Auth({ authShow, setAuthShow }) {

  useEffect(() => {
    if (authShow)
      modalShow();
  }, [authShow]);

  const refModal = useRef();
  function modalShow() {
    refModal.current.showModal();
  }
  function modalClose() {
    refModal.current.close();
    setAuthShow(false)
  }

  const { setToken, getToken } = useAuthData();
  useEffect(() => {
    setToken(authTokenLocalStorageGet());
  }, [])

  return (
    <>
      <ModalDialog ref={refModal} title="Profile" callbackClose={modalClose}>

        {authTokenLocalStorageGet() ?
          <AuthLogOut callbackClose={modalClose} /> :
          <AuthLogIn callbackClose={modalClose} />}

      </ModalDialog>
    </>
  );
}

export function authTokenLocalStorageSet(token) {
  localStorage.setItem("jwt", token)
}

export function authTokenLocalStorageGet() {
  var token = localStorage.getItem("jwt")
  console.log("authTokenGet()", token)
  return token === 'null' || !token ? '' : token;
}