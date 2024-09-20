import { useState, useEffect } from 'react';
import config from '../config.js'
import Loading from '../misc/loading/Loading.jsx'
import { dataFetch } from '../misc/utils/dataFetch.js'
import DirsRaw from './DirsRaw.jsx';

export default function Docs({ callbackSelectItem, selectedCat }) {

    const [data, setData] = useState([]);
    const [dataDirs, setDataDirs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let parent = selectedCat !== undefined && selectedCat.skid !== undefined ? selectedCat.skid : 0;
            // let url = config.URL_API + "?filter=role&filterVal=doc";
            let url = config.URL_API + `?parent=${parent}`;
            // console.log("url", url)
            let data_json = await dataFetch(url);
            setData(getDocs(data_json));
            setDataDirs(data_json.filter(o => o.role === "dir"));
            setLoading(false);
        };
        fetchData();
    }, [selectedCat]);

    function getDocs(data) {
        let result = [];
        for (let item of data) {
            if (item.role === "doc")
                result.push(item);
            if (item.kids) {
                let resultKids = getDocs(item.kids);
                result = [...result, ...resultKids];
            }
        }
        return result;
    }

    return (<div className="containerCell" style={{
        width: "100%",
        maxWidth: "50%"
    }}>

        <div className='align-row'>
            <img src='img/folder.svg' alt='edit' />
            <span style={{ margin: "0 0.25rem", fontWeight: "bold" }}>{selectedCat.title}</span>

            <img src='img/plus-square.svg' alt='add'
                onClick={() => callbackSelectItem({ skid: "0", role: "doc" }, "w")}
                className='cursorPointer' />

        </div>

        <hr />
        {/* Title Skid Parent Role */}
        <Loading loading={loading} />

        <DirsRaw data={dataDirs} callbackSelectItem={callbackSelectItem} />

        {data.map((item, key) => (
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
                <div >{item.descr.substring(0, 128)}...</div>
            </div>
        ))}

    </div>)
}