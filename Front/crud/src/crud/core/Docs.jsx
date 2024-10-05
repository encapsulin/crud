import { useState, useEffect, useContext } from 'react';
import Loading from '../misc/loading/Loading.jsx'
import DirsRaw from './DirsRaw.jsx';
import { useAuthData } from '../misc/context/AuthDataContext.js';
import config from '../config.js'
import { restGet } from '../misc/utils/restGet.js'
import DocsPage from './DocsPage.jsx';

export default function Docs({ callbackSelectItem, selectedDir }) {

    const [loading, setLoading] = useState(false);
    const [pageSkid, setPageSkid] = useState(0);

    const fetchDataDirs = async () => {
        console.log("selectedDir:", selectedDir);
        let selectedDirskid = 0;
        if (selectedDir !== undefined && selectedDir.skid !== undefined)
            selectedDirskid = selectedDir.skid;

        let url = config.URL_API + `?parent=${selectedDirskid}&role=dir`;

        setLoading(true);
        let resp = await restGet(url);
        setLoading(false);

        setDataDirs(resp.data.Items);
    };

    const fetchDataDocs = async (pageSkid_ = 0) => {
        let selectedDirskid = 0;
        if (selectedDir !== undefined && selectedDir.skid !== undefined)
            selectedDirskid = selectedDir.skid;

        let url = config.URL_API + `?parent=${selectedDirskid}&pageNext=${pageSkid_}&role=doc`;

        setLoading(true);
        let resp = await restGet(url);
        setLoading(false);

        //setData(resp.data.Items);
        setDataDocs(prev => [...prev, ...resp.data.Items]);

        if (resp.data.LastEvaluatedKey !== undefined
            && dataDocs.length > 0
            && dataDocs[dataDocs.length - 1].skid !== resp.data.LastEvaluatedKey.skid)
            setPageSkid(resp.data.LastEvaluatedKey.skid);
        else
            setPageSkid(0);

    };

    useEffect(() => {
        setDataDirs([])
        setDataDocs([])
        setPageSkid(0)
        fetchDataDirs();
        fetchDataDocs();
    }, [selectedDir])

    const [dataDirs, setDataDirs] = useState([]);
    const [dataDocs, setDataDocs] = useState([]);

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

        <DirsRaw data={dataDirs} callbackSelectItem={callbackSelectItem} />

        <DocsPage data={dataDocs} callbackSelectItem={callbackSelectItem} />

        <Loading loading={loading} />

        {pageSkid ? (<button onClick={() => fetchDataDocs(pageSkid)}>Get next 10</button>) : null}

    </div>)
}