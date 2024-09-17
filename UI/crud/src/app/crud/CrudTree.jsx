import { useState, useEffect } from 'react';
import config from '../config.js'
import Loading from '../loading/Loading'

export default function CrudTree({ callbackModalShow }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.URL_API + "?parent=0&filter=role&filterVal=dir");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data_ = await response.json();
                setData(data_);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (<><div className="containerCell">
        <img src='img/plus-square.svg' alt='add' onClick={callbackModalShow} className='cursorPointer' />&nbsp;<b>Navi</b>
        <hr />

        <Loading loading={loading} />

        {data.map((item, key) => (
            <div key={key}>
                <img src='img/pencil-square.svg' alt='edit' onClick={callbackModalShow}
                    className='cursorPointer' />
                <a href="#">{item.title}</a></div>
        ))}

    </div >

    </>
    )
}