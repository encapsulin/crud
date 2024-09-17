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
                console.log("asdf3", data_json)
                setData(data_json.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (<div className="containerCell">

        <img src='img/plus-square.svg' alt='add' onClick={callbackModalShow} />&nbsp;<b>Items</b>

        <hr />
        <Loading loading={loading} />
        {data.map((item, key) => (
            <div key={key}><img src='img/pencil-square.svg' alt='edit' onClick={callbackModalShow} /> {item.title}</div>
        ))}

    </div>)
}