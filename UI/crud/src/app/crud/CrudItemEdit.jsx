import ModalDialog from '../ModalDialog';
import { useRef, useState, useEffect } from 'react';
import Loading from '../loading/Loading'
import config from '../config.js'
import React from 'react';

export default function CrudItemEdit({ data }) {

    useEffect(() => {
        console.log(data);
        refModal.current.showModal();
    }, [data])
    const refModal = useRef();

    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [msgError, setMsgError] = useState("")

    const [selectedRole, setSelectedRole] = useState('dir');
    const handleRadioChange = (event) => {
        setSelectedRole(event.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        //(window.event).preventDefault();
        setLoading(true)

        console.log(e.target.elements.title.value);
        const dataForm = {
            title: e.target.elements.title.value,
            descr: e.target.elements.descr.value,
            role: e.target.elements.role.value,
            parent: e.target.elements.parent.value,
        }
        try {
            const resp = await fetch(config.URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            });

            console.log(resp)
            if (resp.status !== 200 || !resp.ok) {
                setMsgError("API error, try again in a minute")
            }

            const dataResp = await resp.json()
            console.log("dataResp.body: ", dataResp.body)
            if (dataResp.body !== "UNAUTHORIZED") {
                setMsg("Ok")
                refModal.current.close();
            }
            else
                setMsgError("Auth error")

        } catch (error) {
            setMsgError(error.message)
        }
        setLoading(false)
    }

    const [loadingTree, setLoadingTree] = useState(false)
    const [dataTree, setDataTree] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingTree(true);
                const response = await fetch(config.URL_API + "?parent=0&filter=role&filterVal=dir");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data_ = await response.json();
                setDataTree(data_);
            } catch (error) {
                setMsgError(error.message);
            } finally {
                setLoadingTree(false);
            }
        };

        fetchData();
    }, [])

    const renderTree = (data_, tab_ = 1) => {
        return data_.map((item) => (
            <React.Fragment key={item.skid}>
                <option value={item.skid}> {'\u00A0'.repeat(tab_ * 5)}{item.title} </option >
                {item.kids && item.kids.length > 0 && (
                    renderTree(item.kids, tab_ + 1)
                )}
            </React.Fragment>))
    }

    return (

        <>
            <ModalDialog ref={refModal} title="Add new" >
                <form onSubmit={handleSubmit} >
                    <div className='containerRowSides'>
                        <span className="horizontal-align">

                            <select name='parent'>
                                <option value="0">/</option>
                                {renderTree(dataTree)}
                            </select>
                            <Loading loading={loadingTree} />
                        </span>

                        <span className="horizontal-align">
                            <label><input type='radio' name="role" value="dir"
                                checked={selectedRole === 'dir'}
                                onChange={handleRadioChange} /><img src='img/folder.svg' alt="folder" /></label>
                            <label> <input type='radio' name="role" value="doc"
                                checked={selectedRole === 'doc'}
                                onChange={handleRadioChange} /><img src='img/file.svg' alt="file" /></label>
                        </span>
                    </div>

                    <input type='text' placeholder='Title:' className='input-field'
                        name="title" />
                    <br />
                    <textarea placeholder='Description:' className='textarea-field'
                        name="descr"></textarea>
                    <br />
                    <div className='containerRowSides'>
                        <Loading loading={loading} />
                        <button type='submit' className='submit'>Submit</button>

                        <button className='cancel'>Cancel</button>

                        <button className='delete'>Delete</button>
                    </div>

                </form>

            </ModalDialog>

        </>
    )
}