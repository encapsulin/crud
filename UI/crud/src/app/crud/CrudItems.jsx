import { useState, useEffect } from 'react';
import config from '../config.js'
import Loading from '../loading/Loading'

export default function CrudItems({ callbackModalShow }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.URL_API + "?filter=role&filterVal=doc");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data_json = await response.json();
                //console.log("asdf3", data_json)
                setData(data_json.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (<div className="containerCell" style={{
        width: "100%",
        maxWidth: "50%"
    }}>

        <img src='img/plus-square.svg' alt='add' onClick={callbackModalShow} />
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
                    <b style={{ margin: '0 0.5rem' }}>{item.title}</b>
                    <img src='img/pencil-square.svg' alt='edit' onClick={callbackModalShow} />
                </div>
                <div style={{ fontSize: "0.75rem" }}>/ <a href="#">Categ1</a> / categ11</div>
                <div >{item.descr}</div>
            </div>
        ))}

    </div>)
}