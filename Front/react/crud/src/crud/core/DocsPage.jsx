import { useState, useEffect, useContext } from 'react';
import { useAuthData } from '../misc/context/AuthDataContext.js';

export default function DocsPage({ data, callbackSelectItem }) {

    const { getToken } = useAuthData();

    return (<div>
        {
            data.map((item, key) => (

                <div key={key} style={{
                    marginBottom: "0.5rem",
                    border: "1px solid silver",
                    padding: "1rem",
                    borderRadius: "5px"
                }}>
                    <div className='align-row'>
                        <img src='img/file.svg' alt='file' />
                        <b style={{ margin: '0 0.25rem', color: "var(--color-dark)" }}>{item.title}</b>
                        {getToken() ? <img src='img/pencil-square.svg' alt='edit'
                            onClick={() => callbackSelectItem({ skid: item.skid, role: "doc" }, "w")}
                            className='cursorPointer' /> : null}
                    </div>
                    <hr />

                    <div dangerouslySetInnerHTML={{ __html: item.descr }} />
                </div>
            ))
        }
    </div>)
}