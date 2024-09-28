import AuthLogIn from './AuthLogIn';
import AuthLogOut from './AuthLogOut';

export default function Auth(props) {

  //console.log(props)

  return (
    <>
      {authTokenGet() ? <AuthLogOut /> : <AuthLogIn />}
    </>
  );
}

export function authTokenSet(token) {
  localStorage.setItem("jwt", token)
}

export function authTokenGet() {
  var token = localStorage.getItem("jwt")
  //console.log("authTokenGet()", token)
  if (token === "null")
    token = ""
  return token
}