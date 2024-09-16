import { useState } from 'react'

export default function CrudTree() {

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

    return (<div className="containerCell">
        <img src='img/plus-square.svg' alt='add' />&nbsp;<b>Navi</b>
        <hr />

        {items.map((item, key) => (
            <div key={key}><img src='img/pencil-square.svg' alt='edit' /> {item.title}</div>
        ))}

    </div >)
}