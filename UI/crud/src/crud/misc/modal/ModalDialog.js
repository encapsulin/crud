import { forwardRef } from "react"
import "./ModalDialog.css"

const ModalDialog = forwardRef(function ModalDialog({ title, children, callbackClose }, ref) {

    return (


        <dialog ref={ref} className="result-modal">

            <div className="header" >
                {title}
                <form method="dialog" >
                    <button className='modalClose' onClick={() => callbackClose(false)}>&times;</button>
                </form>
            </div>

            <div className="modalBody">
                {children}
            </div>


        </dialog>

    )
})


export default ModalDialog;