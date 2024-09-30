import ModalDialog from '../misc/modal/ModalDialog';
import { useRef, useState, useEffect } from 'react';
import Loading from '../misc/loading/Loading'
import config from '../config.js'
import React from 'react';
import { restPost } from '../misc/utils/restPost.js'
import { restGet } from '../misc/utils/restGet.js'
import { restDelete } from '../misc/utils/restDelete.js'
import { buildTree } from './buildTree.js';
import EditorQuill from '../misc/EditorQuill';

export default function ItemEdit({ data, callbackModified }) {

    const refModal = useRef();

    let formDataInit = {
        skid: "0",
        title: "",
        descr: "",
        parent: "0",
        role: ""
    }

    const [formData, setFormData] = useState(formDataInit);
    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log("[]:", data);
        if (data === undefined || data.skid === undefined)
            return;

        refModal.current.showModal();

        setFormData((prevFormData) => ({
            ...prevFormData,
            role: data.role || prevFormData.role,
            skid: data.skid || prevFormData.skid,
        }));
        setModalTitle("Edit")

        ///////////////////////
        const fetchDataTree = async () => {
            setLoadingTree(true);
            let data_json = await restGet(config.URL_API + "?role=dir");
            setLoadingTree(false);
            setDataTree(buildTree(data_json.data));
        };
        fetchDataTree();

        if (data.skid === "0") {
            setModalTitle("Add");
            setFormData({ ...formDataInit, role: data.role });
            return;
        }
        ///////////////////////////////
        const fetchData = async () => {
            setLoading(true);
            let data_json = await restGet(config.URL_API + "?skid=" + data.skid);
            setLoading(false);
            //console.log(data_json.data[0]);
            setFormData(() => data_json.data[0]);
        };
        fetchData();

    }, [data])

    const [loadingTree, setLoadingTree] = useState(false)
    const [dataTree, setDataTree] = useState([]);


    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [msgError, setMsgError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let result = await restPost(config.URL_API, formData);
        console.log("result:", result);
        if (result.status === 200 && !result.error)
            refModal.current.close();
        else
            setMsgError(result.error);

        setLoading(false);
        callbackModified(formData);
    }

    const [modalTitle, setModalTitle] = useState("Add")

    async function handleDelete() {
        setLoading(true);
        let result = await restDelete(config.URL_API + "?skid=" + data.skid);
        console.log("result:", result)
        if (result.status === 200 && !result.error)
            refModal.current.close();
        else
            setMsgError(result.error)
        setLoading(false)
        callbackModified(formData);
    }

    const renderTree = (data_, tab_ = 1) => {
        if (data_ === undefined || data_.length === 0)
            return ""

        return data_.map((item) => (
            <React.Fragment key={item.skid}>
                <option value={item.skid}> {'\u00A0'.repeat(tab_ * 5)}{item.title} </option >
                {item.children && item.children.length > 0 && (
                    renderTree(item.children, tab_ + 1)
                )}
            </React.Fragment>))
    }

    return (
        <>
            <ModalDialog ref={refModal} title={modalTitle} >
                <form onSubmit={handleSubmit} >
                    {/* {JSON.stringify(formData)} */}
                    <div className='containerRowSides'>
                        <span className="align-row">
                            <select name='parent' value={formData.parent}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            >
                                <option value="0">/</option>
                                {renderTree(dataTree)}
                            </select>
                            <Loading loading={loadingTree} />
                        </span>

                        <span className="align-row">
                            <label><input type='radio' name="role" value="dir"
                                checked={formData.role === 'dir'}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            /><img src='img/folder.svg' alt="folder" /></label>
                            <label> <input type='radio' name="role" value="doc"
                                checked={formData.role === 'doc'}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><img src='img/file.svg' alt="file" /></label>
                        </span>
                    </div>

                    <input type='text' placeholder='Title:' className='input-field'
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                    <br />
                    <textarea placeholder='Description:' className='textarea-field'
                        name="descr"
                        value={formData.descr}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                    <br />
                    <EditorQuill initialContent={formData.descr}>hardcod</EditorQuill>
                    <br />
                    <div className='containerRowSides'>
                        <Loading loading={loading} />
                        <button type='submit' className='submit'>Submit</button>

                        <button className='cancel' onClick={() => refModal.current.close()} type="button">Cancel</button>

                        {data.skid > "0" && <button className='delete' onClick={handleDelete} type="button">Delete</button>}
                    </div>

                    <div className='bgRed'>{msgError}</div>

                </form>

            </ModalDialog>
        </>
    )
}