import { useState } from 'react'
import ModalDialog from '../ModalDialog';
import { useRef } from 'react';
import { Link } from 'react-router-dom'

export default function CrudTree() {

    const refModal = useRef();
    function modalShow() {
        refModal.current.showModal();
    }

    function dataGet() {
        let data = [
            {
                "id": 1682629768809,
                "title": "DynamoDB",
                "parentId": 1682664761621,
                "nodes": [],
                "parents": [
                    {
                        "id": 1682782235057,
                        "title": "Software development",
                        "parentId": 0,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682629742749,
                        "title": "Databases",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682664761621,
                        "title": "Nosql",
                        "parentId": 1682629742749,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    }
                ],
                "role": 2,
                "fileName": "1684577226364.dynamodb.jpeg",
                "descr": "Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale.\r\n"
            },
            {
                "id": 1682664761621,
                "title": "Nosql",
                "parentId": 1682629742749,
                "nodes": [],
                "parents": [
                    {
                        "id": 1682782235057,
                        "title": "Software development",
                        "parentId": 0,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682629742749,
                        "title": "Databases",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    }
                ],
                "role": 1,
                "fileName": null,
                "descr": null
            },
            {
                "id": 1682664804199,
                "title": "PostgreSql",
                "parentId": 1682629755750,
                "nodes": [],
                "parents": [
                    {
                        "id": 1682782235057,
                        "title": "Software development",
                        "parentId": 0,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682629742749,
                        "title": "Databases",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682629755750,
                        "title": "SQL",
                        "parentId": 1682629742749,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    }
                ],
                "role": 2,
                "fileName": "1684577270142.postgres.png",
                "descr": "PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for ..."
            },
            {
                "id": 1682629755750,
                "title": "SQL",
                "parentId": 1682629742749,
                "nodes": [],
                "parents": [
                    {
                        "id": 1682782235057,
                        "title": "Software development",
                        "parentId": 0,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682629742749,
                        "title": "Databases",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    }
                ],
                "role": 1,
                "fileName": null,
                "descr": null
            }
        ]
        return data;
    }

    const [items, setItems] = useState(dataGet());

    return (<><div className="containerCell">
        <img src='img/plus-square.svg' alt='add' onClick={modalShow} className='cursorPointer' />&nbsp;<b>Navi</b>
        <hr />

        {items.map((item, key) => (
            <div key={key}>
                <img src='img/pencil-square.svg' alt='edit' onClick={modalShow}
                    className='cursorPointer' />
                <a href="#">{item.title}</a></div>
        ))}

    </div >

        <ModalDialog ref={refModal} title="Add new">
            <form>
                Parent:
                <select>
                    <option>/</option>
                </select>
                <br />
                <input type='text' placeholder='Title:' className='input-field' />
                <br />
                <textarea placeholder='Description:' className='textarea-field'></textarea>
                <br />
                <div className='containerRowSides'>
                    <button type='submit' className='submit'>Submit</button>
                    <form method="dialog" >
                        <button className='cancel'>Cancel</button>
                    </form>
                    <button className='delete'>Delete</button>
                </div>
            </form>
        </ModalDialog>
    </>
    )
}