import './header.css';
import { useRef, useState, useEffect } from 'react';
import Auth, { authTokenGet } from "../misc/auth/Auth";


export default function Header({ callbackSearch }) {

    const [auth, setAuth] = useState(false)
    const [authToken, setAuthToken] = useState("")
    useEffect(() => {
        setAuthToken(authTokenGet())
    }, [auth])

    const [searchString, setSearchString] = useState("");

    function fnSearch(str) {
        //console.log(str)
        setSearchString(str)
        if (str.length >= 3)
            callbackSearch(str);
    }

    return (<><div className="Header align-row-space">
        CRUD

        <input type="text" placeholder='Search:'
            name="searchString" value={searchString}
            onChange={(e) => fnSearch(e.target.value)}
        />

        <img src={!authToken ? 'img/person.svg' : 'img/person-fill.svg'} alt="person" onClick={() => setAuth(true)}
            className='cursorPointer' />

    </div>

        <Auth auth={auth} setAuth={setAuth} />

    </>)
}