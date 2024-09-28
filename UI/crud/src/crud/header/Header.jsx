import './header.css';
import ModalDialog from '../misc/modal/ModalDialog';
import { useRef, useState } from 'react';
import Auth from "../misc/auth/Auth";


export default function Header({ callbackSearch }) {

    const refModal = useRef();
    function modalShow() {
        refModal.current.showModal();
    }
    function modalClose() {
        refModal.current.close();
    }

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

        <img src='img/person-circle.svg' alt="person" onClick={modalShow}
            className='cursorPointer' />

    </div>
        <ModalDialog ref={refModal} title="Profile">
            <Auth callbackClose={modalClose} />
        </ModalDialog>

    </>)
}