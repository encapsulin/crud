import './header.css';
import ModalDialog from '../misc/modal/ModalDialog';
import { useRef } from 'react';

export default function Header() {

    const refModal = useRef();
    function modalShow() {
        refModal.current.showModal();
    }

    return (<><div className="Header align-row-space">
        CRUD
        <input type="text" placeholder='Search:' />
        <img src='img/person-circle.svg' alt="person" onClick={modalShow} className='cursorPointer' />
    </div>
        <ModalDialog ref={refModal} title="Profile">Bootstrap Icons
            Free, high quality, open source icon library with over 2,000 icons. Include them anyway you like—SVGs, SVG sprite, or web fonts. Use them with or without Bootstrap in any project.
        </ModalDialog>

    </>)
}