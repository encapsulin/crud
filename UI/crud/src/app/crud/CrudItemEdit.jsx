import ModalDialog from '../ModalDialog';
import { useRef, useState, useEffect } from 'react';
//import AppLoading from './loading/AppLoading'
const URL_API = "https://klzkhtbeq3.execute-api.us-east-1.amazonaws.com/default/fnCrud"

export default function CrudItemEdit({ data }) {

    useEffect(() => {
        console.log(data);
        refModal.current.showModal();
    }, [data])
    const refModal = useRef();

    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [msgError, setMsgError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        //(window.event).preventDefault();
        //setLoading(true)

        console.log(e.target.elements.title.value);
        // console.log(e.title.value);
        const dataAuth = {
            title: e.target.elements.title.value,
            descr: e.target.elements.descr.value
        }
        try {
            const resp = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // "Access-Control-Allow-Origin": "*"
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
                //authTokenSet(dataResp.body)
                setMsg("Ok")
                // setTimeout(function () {
                //     window.location.reload();
                // }, 1000);
            }
            else
                setMsgError("Auth error")

        } catch (error) {
            setMsgError(error.message)
        }
        setLoading(false)
    }




    return (

        <>
            <ModalDialog ref={refModal} title="Add new" >
                <form onSubmit={handleSubmit}>
                    Parent:
                    <select name='parent'>
                        <option value="0">/</option>
                    </select>
                    <br />
                    <input type='text' placeholder='Title:' className='input-field' name="title" value="asdf" />
                    <br />
                    <textarea placeholder='Description:' className='textarea-field' name="descr">qwer</textarea>
                    <br />
                    <div className='containerRowSides'>
                        <button type='submit' className='submit'>Submit</button>
                        <form method="dialog" >
                            <button className='cancel'>Cancel</button>
                        </form>
                        <button className='delete'>Delete</button>
                    </div>
                </form>
                {/* <AppLoading /> */}
            </ModalDialog>

        </>
    )
}