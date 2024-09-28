import { useState, useEffect } from 'react';
import Loading from '../misc/loading/Loading.jsx'
import { buildTree } from './buildTree.js';
import { useAuthData } from '../misc/context/AuthDataContext.js';

export default function DirsTree({ callbackSelectItem, data, loading }) {

    const [itemSelected, setItemSelected] = useState(0);

    function handleItemSelect(item) {
        setItemSelected(item)
        callbackSelectItem(item, "r")
    }

    const renderTree = (data_, tab_ = 0) => {
        if (!data_)
            return

        return data_.map((item) => (
            <div key={item.skid}>
                <div className={`align-row hover ${item.skid === itemSelected.skid ? 'hovered' : null}`} >
                    {'\u00A0'.repeat(tab_ * 5)}
                    <img src='img/folder.svg' alt='edit' />

                    <a style={{ margin: "0.25rem 0.1rem", }}
                        onClick={() => handleItemSelect(item)}>
                        {item.title}</a>

                    {getToken() ? <img src='img/pencil-square.svg' alt='edit' onClick={() => callbackSelectItem({ skid: item.skid, role: "dir" }, "w")}
                        className='cursorPointer' /> : null}
                </div>

                {item.children && (
                    <div >{renderTree(item.children, tab_ + 1)}</div>
                )}
            </div>
        ))
    }

    const { getToken } = useAuthData();

    return (
        <div className="containerCell" >

            {getToken() ? (
                <div className='align-row'>
                    <img src='img/plus-square.svg' alt='add'
                        onClick={() => callbackSelectItem({ skid: "0", role: "dir" }, "w")}
                        className='cursorPointer' />
                    <span style={{ margin: "0 0.25rem", fontWeight: "bold" }}>&nbsp;</span>
                </div>
            ) : null}

            <hr />

            <Loading loading={loading} />

            {renderTree(buildTree(data))}

        </div >

    )
}
