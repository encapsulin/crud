import { useState } from 'react';
import { authTokenSet } from './AuthProfile';
import { AppLoading } from './loading/AppLoading.js';

export default function AuthLogIn(props) {

  //console.log(props)

  const [msgError, setMsgError] = useState("")
  const [msg, setMsg] = useState("")

  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState("demo")
  const [pwd, setPwd] = useState("3420fa23-8920-41b0-adac1")


  async function handleSubmit(e) {
    e.preventDefault();
    setMsgError("")
    setLoading(true)

    const dataAuth = {
      uid: uid,
      pwd: pwd
    }

    const url = "https://afgjb5551c.execute-api.eu-central-1.amazonaws.com/default/fnAuth";
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(dataAuth)
      });

      console.log(resp)
      if (resp.status !== 200 || !resp.ok) {
        setMsgError("API error, try again in a minute")
      }

      const dataResp = await resp.json()
      console.log("dataResp.body: ", dataResp.body)

      if (dataResp.body !== "UNAUTHORIZED") {
        authTokenSet(dataResp.body)
        setMsg("Ok")
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      }
      else
        setMsgError("Auth error")

    } catch (error) {
      setMsgError(error.message)
    }
    setLoading(false)
  }

  //throw Error("asdf")




  return (

    <>


      <form onSubmit={handleSubmit} >

        <div >

          <div >
            <label>User name:</label><br />
            <input type="text" name="uid" defaultValue="demo"
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
          {loading && <AppLoading />}
        </div>

        {msgError && (<div className="borderRed"  >{msgError}</div>)}
        {msg && (<div className="borderGreen"  >{msg}</div>)}

      </form>

    </>
  );
}
