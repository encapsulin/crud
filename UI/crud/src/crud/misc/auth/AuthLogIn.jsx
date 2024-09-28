import { useState, useContext } from 'react';
import { authTokenLocalStorageSet } from './Auth';
import Loading from '../loading/Loading';
import config from '../../config.js'
import { restPost } from '../utils/restPost.js'
import { useAuthData } from '../context/AuthDataContext';

export default function AuthLogIn({ callbackClose }) {

  const [msgError, setMsgError] = useState("")
  const [msg, setMsg] = useState("")

  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState("demo1")
  const [pwd, setPwd] = useState("fa23-8d20-41b0-aw4")

  const { setToken } = useAuthData();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsgError("")
    setMsg("")
    setLoading(true)

    const dataAuth = {
      uid: uid,
      pwd: pwd
    }

    try {
      const resp = await restPost(config.URL_API, dataAuth);
      console.log("restPost() : ", resp)
      authTokenLocalStorageSet("")
      if (resp.status === 200) {
        authTokenLocalStorageSet(resp.data)
        setMsg("Ok")
        setToken(resp.data);
        callbackClose();
      }
      else
        setMsgError("Authentication error")

    } catch (error) {
      setMsgError(error.message)
    }
    setLoading(false)
  }

  //throw Error("")

  return (

    <>

      <form onSubmit={handleSubmit} >

        <div >

          <div >
            <label>User name:</label><br />
            <input type="text" name="uid"
              onChange={(e) => setUid(e.target.value)}
              value={uid} />
          </div>
          <br />
          <div >
            <label>Password:</label><br />
            <input type="password" name="pwd"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd} />
          </div>

        </div>

        <br />
        <div className='containerRowSides'>
          <button type="submit" >Submit</button>
          <button type="button" onClick={callbackClose} className='cancel' >Cancel</button>
          <Loading loading={loading} />
        </div>

        {msgError && (<div style={{ border: "1px solid red" }} >{msgError}</div>)}
        {msg && (<div style={{ border: "1px solid green" }}  >{msg}</div>)}

      </form>

    </>
  );
}
