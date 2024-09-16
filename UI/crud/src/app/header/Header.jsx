import './header.css';
import ModalDialog from '../ModalDialog';
import { useRef, useEffect } from 'react';

export default function Header() {

    const refModal = useRef();
    function modalShow() {
        refModal.current.showModal();
    }

    return (<><div className="Header bgdark containerRowCenter">
        <b>CRUD</b>
        <input type="text" placeholder='search:' />
        <img src='img/person-circle.svg' alt="person" onClick={modalShow} className='classCursorPointer' />
    </div>
        <ModalDialog ref={refModal} title="asdf">Bootstrap Icons

            Free, high quality, open source icon library with over 2,000 icons. Include them anyway you like—SVGs, SVG sprite, or web fonts. Use them with or without Bootstrap in any project.</ModalDialog></>)
}