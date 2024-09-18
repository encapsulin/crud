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

    const renderTree = (data_, tab_ = 1) => {
        return data_.map((item) => (
            <div key={item.skid}>

                <div className='horizontal-align'>
                    <img src='img/folder.svg' alt='edit' />

                    <a style={{ textTransform: "uppercase", margin: "0.2rem 0.1rem" }}>
                        {item.title}</a>

                    <img src='img/pencil-square.svg' alt='edit' onClick={() => callbackModalShow({ skid: item.skid, role: "dir" })}
                        className='cursorPointer' />
                </div>

                {item.kids && item.kids.length > 0 && (
                    <div style={{ marginLeft: `${tab_}rem` }}>{renderTree(item.kids, tab_ + 1)}</div>
                )}
            </div>

        ))
    }

    return (
        <div className="containerCell" >


            <img src='img/plus-square.svg' alt='add' onClick={() => callbackModalShow({ skid: 0, role: "dir" })}
                className='cursorPointer' />

            <hr />

            <Loading loading={loading} />

            {renderTree(data)}

        </div >

    )
}