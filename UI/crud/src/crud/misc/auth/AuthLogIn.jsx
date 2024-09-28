import { useState } from 'react';
import { authTokenSet } from './Auth';
import Loading from '../loading/Loading';
import config from '../../config.js'
import { restPost } from '../utils/restPost.js'


export default function AuthLogIn({ callbackClose }) {

  const [msgError, setMsgError] = useState("")
  const [msg, setMsg] = useState("")

  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState("demo")
  const [pwd, setPwd] = useState("fa23-8d20-41b0-aw41")


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
      authTokenSet("")
      if (resp.status === 200) {
        authTokenSet(resp.data)
        setMsg("Ok")
        // setTimeout(function () {
        //   window.location.reload();
        // }, 1000);
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
        <div className='centerContent'>
          <button type="submit" >Submit</button>
          <Loading loading={loading} />
        </div>

        {msgError && (<div style={{ border: "1px solid red" }} >{msgError}</div>)}
        {msg && (<div style={{ border: "1px solid green" }}  >{msg}</div>)}

      </form>

    </>
  );
}
