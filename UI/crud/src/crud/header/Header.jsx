import './header.css';
import { useRef, useState, useEffect } from 'react';
import Auth from "../misc/auth/Auth";
import { useAuthData } from '../misc/context/AuthDataContext'

export default function Header({ callbackSearch }) {

    const [authShow, setAuthShow] = useState(false)

    const [searchString, setSearchString] = useState("");

    function fnSearch(str) {
        //console.log(str)
        setSearchString(str)
        if (str.length >= 3)
            callbackSearch(str);
    }

    const { getToken } = useAuthData();

    return (<><div className="Header align-row-space">
        CRUD

        <input type="text" placeholder='Search:'
            name="searchString" value={searchString}
            onChange={(e) => fnSearch(e.target.value)}
        />

        <img src={!getToken() ? 'img/person.svg' : 'img/person-fill.svg'} alt="person"
            onClick={() => setAuthShow(true)}
            className='cursorPointer' />

    </div>

        <Auth authShow={authShow} setAuthShow={setAuthShow} />

    </>)
}