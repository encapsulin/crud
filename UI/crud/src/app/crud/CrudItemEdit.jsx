import ModalDialog from '../ModalDialog';
import { useRef, useState, useEffect } from 'react';
import Loading from '../loading/Loading'
import config from '../config.js'
import React from 'react';
import { dataFetch } from '../utils/dataFetch.js'

export default function CrudItemEdit({ data }) {

    const [formData, setFormData] = useState({
        skid: 0,
        title: "",
        descr: "",
        parent: "",
        role: ""
    });
    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(data);
        if (data === undefined || data.skid === undefined)
            return;

        refModal.current.showModal();
        setFormData((prevFormData) => ({
            ...prevFormData,
            role: data.role || prevFormData.role,
            skid: data.skid || prevFormData.skid,
        }));
        setModalTitle("Edit")
        if (data.skid === "0") {
            setModalTitle("Add");
            return;
        }
        ///////////////////////////////
        const fetchData = async () => {
            setLoading(true);
            let data_json = await dataFetch(config.URL_API + "?skid=" + data.skid);
            setLoading(false);
            setFormData(data_json.data[0]);
            console.log("asdf5", data_json.data[0]);
        };
        fetchData();
    }, [data])

    const refModal = useRef();

    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [msgError, setMsgError] = useState("")

    // const [selectedRole, setSelectedRole] = useState('dir');
    // const handleRadioChange = (event) => {
    //     setSelectedRole(event.target.value);
    // };

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)

        // setDataItem({
        //     ...dataItem,
        //     title: e.target.elements.title.value,
        //     descr: e.target.elements.descr.value,
        //     role: e.target.elements.role.value,
        //     parent: e.target.elements.parent.value,
        // })
        try {
            const resp = await fetch(config.URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
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
        const fetchData2 = async () => {
            setLoadingTree(true);
            let data_json = await dataFetch(config.URL_API + "?parent=0&filter=role&filterVal=dir");
            setLoadingTree(false);
            setDataTree(data_json);
        };

        fetchData2();
    }, [])

    const renderTree = (data_, tab_ = 1) => {
        if (data_ === undefined)
            return ""

        return data_.map((item) => (
            <React.Fragment key={item.skid}>
                <option value={item.skid}> {'\u00A0'.repeat(tab_ * 5)}{item.title} </option >
                {item.kids && item.kids.length > 0 && (
                    renderTree(item.kids, tab_ + 1)
                )}
            </React.Fragment>))
    }

    const [modalTitle, setModalTitle] = useState("Add")

    async function handleDelete() {
        const confirmDelete = window.confirm('Are you sure?');
        if (!confirmDelete) {
            return;
        }
        try {
            const resp = await fetch(config.URL_API + "?skid=" + data.skid, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }

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

    return (

        <>
            <ModalDialog ref={refModal} title={modalTitle} >
                <form onSubmit={handleSubmit} >
                    {/* {JSON.stringify(formData)} */}
                    <div className='containerRowSides'>
                        <span className="horizontal-align">

                            <select name='parent' value={formData.parent}
                                onChange={handleInputChange}>
                                <option value="0">/</option>
                                {renderTree(dataTree)}
                            </select>
                            <Loading loading={loadingTree} />
                        </span>

                        <span className="horizontal-align">
                            <label><input type='radio' name="role" value="dir"
                                checked={formData.role === 'dir'}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><img src='img/folder.svg' alt="folder" /></label>
                            <label> <input type='radio' name="role" value="doc"
                                checked={formData.role === 'doc'}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><img src='img/file.svg' alt="file" /></label>
                        </span>
                    </div>

                    <input type='text' placeholder='Title:' className='input-field'
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    //defaultValue={formData.title}
                    />
                    <br />
                    <textarea placeholder='Description:' className='textarea-field'
                        name="descr"
                        value={formData.descr}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                    <br />
                    <div className='containerRowSides'>
                        <Loading loading={loading} />
                        <button type='submit' className='submit'>Submit</button>

                        <button className='cancel' disabled>Cancel</button>

                        {data.skid > "0" && <button className='delete' onClick={handleDelete} type="button">Delete</button>}
                    </div>

                </form>

            </ModalDialog>

        </>
    )
}