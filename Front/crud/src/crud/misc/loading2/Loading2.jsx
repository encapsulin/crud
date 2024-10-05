import img from "./loading.svg"
import "./loading.css"
import ModalDialog from '../modal/ModalDialog';
import { useRef, useState, useEffect } from 'react';

export default function Loading2({ loading }) {
    const refModal = useRef();

    useEffect(() => {
        if (loading)
            refModal.current.showModal();
        else
            refModal.current.close();
    }, [loading])

    return (
        <>
            <ModalDialog ref={refModal} title={"Loading..."} >
                <div className="align-row-center">
                    <img src={img} alt="loading" className="loading2" />
                </div>
            </ModalDialog>
        </>
    )

}