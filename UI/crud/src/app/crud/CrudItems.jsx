import { useState, useEffect } from 'react';
import config from '../config.js'
import Loading from '../loading/Loading'
import { dataFetch } from '../utils/dataFetch.js'

export default function CrudItems({ callbackSelectItem, selectedCat }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let data_json = await dataFetch(config.URL_API + "?filter=role&filterVal=doc");
            setLoading(false);
            setData(data_json.data);
        };
        fetchData();
    }, []);

    return (<div className="containerCell" style={{
        width: "100%",
        maxWidth: "50%"
    }}>

        <img src='img/plus-square.svg' alt='add'
            onClick={() => callbackSelectItem({ skid: "0", role: "doc" }, "w")}
            className='cursorPointer' />
        {selectedCat}
        <hr />
        {/* Title Skid Parent Role */}
        <Loading loading={loading} />
        {data.map((item, key) => (
            <div key={key} style={{
                marginBottom: "0.5rem",
                border: "1px solid silver",
                padding: "1rem",
            }}>
                <div className='horizontal-align-'>
                    <img src='img/file.svg' alt='file' />
                    <b style={{ margin: '0 0.5rem', color: "blue" }}>{item.title}</b>
                    <img src='img/pencil-square.svg' alt='edit'
                        onClick={() => callbackSelectItem({ skid: item.skid, role: "doc" }, "w")}
                        className='cursorPointer' />
                </div>
                <div style={{ fontSize: "0.75rem" }}>/ <a href="#">Categ1</a> / categ11</div>
                <div >{item.descr}</div>
            </div>
        ))}

    </div>)
}