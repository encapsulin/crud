import { useState, useEffect, useContext } from 'react';
import Loading from '../misc/loading/Loading.jsx'
import DirsRaw from './DirsRaw.jsx';
import { useAuthData } from '../misc/context/AuthDataContext.js';
import config from '../config.js'
import { restGet } from '../misc/utils/restGet.js'

export default function Docs({ callbackSelectItem, selectedDir }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNextSkid, setPageNextSkid] = useState(0);
    // {
    //     "LastEvaluatedKey": {
    //         "pkid": "0",
    //         "parent": "20240929_160937_354",
    //         "skid": "20241003_120229_865"
    //     }
    // }

    useEffect(() => {
        const fetchDataDocs = async () => {
            if (selectedDir === undefined || selectedDir.skid === undefined || selectedDir.skid === null)
                return;

            setLoading(true);
            let url = config.URL_API + `?parent=${selectedDir.skid}`;
            setLoading(false);

            let respjson = await restGet(url);
            setData(respjson.data.Items);
            if (respjson.LastEvaluatedKey !== undefined)
                setPageNextSkid(respjson.LastEvaluatedKey.skid);

        };
        fetchDataDocs();
    }, [selectedDir])

    const [dataDirs, setDataDirs] = useState([]);
    const [dataDocs, setDataDocs] = useState([]);

    useEffect(() => {
        setDataDocs(data.filter(o => o.role === "doc"));
        setDataDirs(data.filter(o => o.role === "dir"));
    }, [data])

    const { getToken } = useAuthData();


    return (<div className="containerCell" style={{
        width: "100%",
        maxWidth: "50%"
    }}>

        <div className='align-row'>

            {getToken() ? (
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
            <div>
                <div key={key} style={{
                    marginBottom: "0.5rem",
                    border: "1px solid silver",
                    padding: "1rem",
                    borderRadius: "5px"
                }}>
                    <div className='align-row'>
                        <img src='img/file.svg' alt='file' />
                        <b style={{ margin: '0 0.25rem', color: "var(--color-dark)" }}>{item.title}</b>
                        {getToken() ? <img src='img/pencil-square.svg' alt='edit'
                            onClick={() => callbackSelectItem({ skid: item.skid, role: "doc" }, "w")}
                            className='cursorPointer' /> : null}
                    </div>

                    <hr />
                    {/* <div style={{ fontSize: "0.75rem" }}>/ <a href="#">Categ1</a> / categ11</div> */}
                    {/* <div >{item.descr}</div> */}
                    <div dangerouslySetInnerHTML={{ __html: item.descr }} />
                </div>

                <div>{pageNextSkid ? pageNextSkid : null}</div>
            </div>
        ))}

    </div>)
}