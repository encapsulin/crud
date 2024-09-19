import { useState, useEffect } from 'react';
import config from '../config.js'
import Loading from '../loading/Loading'
import { dataFetch } from '../utils/dataFetch.js'

export default function CrudTree({ callbackSelectItem }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            let data_ = await dataFetch(config.URL_API + "?parent=0&filter=role&filterVal=dir");
            setLoading(false);
            setData(data_);
        };
        fetchData();
    }, []);

    const renderTree = (data_, tab_ = 1) => {
        return data_.map((item) => (
            <div key={item.skid}>

                <div className='horizontal-align'>
                    <img src='img/folder.svg' alt='edit' />

                    <a style={{ textTransform: "uppercase", margin: "0.2rem 0.1rem" }}
                        onClick={() => callbackSelectItem(item, "r")}>
                        {item.title}</a>

                    <img src='img/pencil-square.svg' alt='edit' onClick={() => callbackSelectItem({ skid: item.skid, role: "dir" }, "w")}
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


            <img src='img/plus-square.svg' alt='add' onClick={() => callbackSelectItem({ skid: "0", role: "dir" }, "w")}
                className='cursorPointer' />

            <hr />

            <Loading loading={loading} />

            {renderTree(data)}

        </div >

    )
}