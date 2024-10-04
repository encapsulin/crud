import { useState, useEffect, useContext } from 'react';
import Loading from '../misc/loading/Loading.jsx'
import DirsRaw from './DirsRaw.jsx';
import { useAuthData } from '../misc/context/AuthDataContext.js';
import config from '../config.js'
import { restGet } from '../misc/utils/restGet.js'
import DocsPage from './DocsPage.jsx';

export default function Docs({ callbackSelectItem, selectedDir }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageSkid, setPageSkid] = useState(0);
    // {
    //     "LastEvaluatedKey": {
    //         "pkid": "0",
    //         "parent": "20240929_160937_354",
    //         "skid": "20241003_120229_865"
    //     }
    // }

    const fetchDataDocs = async () => {
        if (selectedDir === undefined || selectedDir.skid === undefined || selectedDir.skid === null)
            return;

        setLoading(true);
        let url = config.URL_API + `?parent=${selectedDir.skid}&pageNext=${pageSkid}`;
        setLoading(false);

        let resp = await restGet(url);
        //setData(resp.data.Items);
        setData(prev => [...prev, ...resp.data.Items]);

        if (resp.data.LastEvaluatedKey !== undefined)
            setPageSkid(resp.data.LastEvaluatedKey.skid);

    };

    useEffect(() => {
        setData([])
        setPageSkid(0)
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

        <DocsPage data={dataDocs} callbackSelectItem={callbackSelectItem} />

        {pageSkid ? (<button onClick={fetchDataDocs}>Get next 10</button>) : null}

    </div>)
}