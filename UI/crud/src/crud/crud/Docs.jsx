import { useState, useEffect, useContext } from 'react';
import Loading from '../misc/loading/Loading.jsx'
import DirsRaw from './DirsRaw.jsx';
import { authTokenGet } from "../misc/auth/Auth";
import { useAuthData } from '../misc/context/AuthDataContext.js';

export default function Docs({ callbackSelectItem, data, loading, selectedDir }) {

    const [dataDirs, setDataDirs] = useState([]);
    const [dataDocs, setDataDocs] = useState([]);

    useEffect(() => {
        setDataDocs(data.filter(o => o.role === "doc"));
        setDataDirs(data.filter(o => o.role === "dir"));
    }, [data])

    const { jwt } = useAuthData();

    return (<div className="containerCell" style={{
        width: "100%",
        maxWidth: "50%"
    }}>

        <div className='align-row'>

            {jwt ? (
                <img src='img/plus-square.svg' alt='add'
                    onClick={() => callbackSelectItem({ skid: "0", role: "doc" }, "w")}
                    className='cursorPointer' />
            ) : null}

            <span style={{ margin: "0 0.25rem", fontWeight: "bold" }}>{selectedDir && selectedDir.title}</span>

        </div>
        <hr />
        {/* Title Skid Parent Role */}
        <Loading loading={loading} />

        <DirsRaw data={dataDirs} callbackSelectItem={callbackSelectItem} />

        {dataDocs.map((item, key) => (
            <div key={key} style={{
                marginBottom: "0.5rem",
                border: "1px solid silver",
                padding: "1rem",
                borderRadius: "5px"
            }}>
                <div className='align-row'>
                    <img src='img/file.svg' alt='file' />
                    <b style={{ margin: '0 0.25rem', color: "var(--color-dark)" }}>{item.title}</b>
                    <img src='img/pencil-square.svg' alt='edit'
                        onClick={() => callbackSelectItem({ skid: item.skid, role: "doc" }, "w")}
                        className='cursorPointer' />

                </div>
                <hr />
                {/* <div style={{ fontSize: "0.75rem" }}>/ <a href="#">Categ1</a> / categ11</div> */}
                <div >{item.descr}</div>
            </div>
        ))}

    </div>)
}