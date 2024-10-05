import { useState, useEffect, useContext } from 'react';
import Loading from '../misc/loading/Loading.jsx'
import DirsRaw from './DirsRaw.jsx';
import { useAuthData } from '../misc/context/AuthDataContext.js';
import config from '../config.js'
import { restGet } from '../misc/utils/restGet.js'
import DocsPage from './DocsPage.jsx';

export default function Docs({ callbackSelectItem, selectedDir }) {

    const { getToken } = useAuthData();

    const [loading, setLoading] = useState(false);
    const [pageSkid, setPageSkid] = useState(0);

    const [data, setData] = useState([]);
    const [dataDirs, setDataDirs] = useState([]);
    const [dataDocs, setDataDocs] = useState([]);

    const fetchData = async (pageSkid_ = 0) => {

        let url = config.URL_API + `?pageNext=${pageSkid_}`;

        if (selectedDir) {
            if (selectedDir.skid !== undefined) {
                url += `&parent=${selectedDir.skid}`;
            }
            if (selectedDir.search !== undefined) {
                url += `&search=${selectedDir.search}`;
            }
        } else
            url += `&parent=0`;

        setLoading(true);
        let resp = await restGet(url);
        setLoading(false);

        //setData(resp.data.Items);
        setData(prev => [...prev, ...resp.data.Items]);

        if (resp.data.LastEvaluatedKey !== undefined
            && data.length > 0
            && data[data.length - 1].skid !== resp.data.LastEvaluatedKey.skid)
            setPageSkid(resp.data.LastEvaluatedKey.skid);
        else
            setPageSkid(0);

    };

    useEffect(() => {
        setData([])
        setPageSkid(0)
        fetchData();
    }, [selectedDir])

    useEffect(() => {
        setDataDirs(data.filter(item => item.role === "dir"));
        setDataDocs(data.filter(item => item.role === "doc"));
    }, [data])


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

        {pageSkid ? (<button onClick={() => fetchData(pageSkid)}>Get next 10</button>) : null}

    </div>)
}