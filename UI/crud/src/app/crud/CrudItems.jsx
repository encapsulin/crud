import { useState } from 'react'

export default function CrudItems() {

    function dataGet() {
        let data = [
            {
                "id": 1684584497415,
                "title": "Spring Boot",
                "parentId": 1722679453447,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1722679453447,
                        "title": "Java",
                        "parentId": 1682455363956,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": "1722679593430.java.svg",
                        "descr": ""
                    }
                ],
                "role": 2,
                "fileName": "1684584495498.spring.png",
                "descr": "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can \"just run\"."
            },
            {
                "id": 1682590983435,
                "title": "AWS CodeCommit",
                "parentId": 1682457876822,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682457876822,
                        "title": "AWS",
                        "parentId": 1682455363956,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": ""
                    }
                ],
                "role": 2,
                "fileName": "1684586261220.Без названия (1).png",
                "descr": "AWS CodeCommit is a secure, highly scalable, fully managed source control service that hosts private Git repositories. Diagram showing how CodeCommit ..."
            },
            {
                "id": 1682496136487,
                "title": "API Gateway",
                "parentId": 1682457876822,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682457876822,
                        "title": "AWS",
                        "parentId": 1682455363956,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": ""
                    }
                ],
                "role": 2,
                "fileName": "1684586378562.Без названия (2).png",
                "descr": "Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale"
            },
            {
                "id": 1682457876822,
                "title": "AWS",
                "parentId": 1682455363956,
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
                        "id": 1682455363956,
                        "title": "Back-end",
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
                "descr": ""
            },
            {
                "id": 1722679453447,
                "title": "Java",
                "parentId": 1682455363956,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    }
                ],
                "role": 1,
                "fileName": "1722679593430.java.svg",
                "descr": ""
            },
            {
                "id": 1722679539068,
                "title": "Java",
                "parentId": 1722679453447,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1722679453447,
                        "title": "Java",
                        "parentId": 1682455363956,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": "1722679593430.java.svg",
                        "descr": ""
                    }
                ],
                "role": 2,
                "fileName": "1722776807156.java.svg",
                "descr": ""
            },
            {
                "id": 1682496117649,
                "title": "Lambda",
                "parentId": 1682457876822,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682457876822,
                        "title": "AWS",
                        "parentId": 1682455363956,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": ""
                    }
                ],
                "role": 2,
                "fileName": "1684586480606.Без названия (3).png",
                "descr": "AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without ..."
            },
            {
                "id": 1682496165569,
                "title": "S3",
                "parentId": 1682457876822,
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
                        "id": 1682455363956,
                        "title": "Back-end",
                        "parentId": 1682782235057,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": null
                    },
                    {
                        "id": 1682457876822,
                        "title": "AWS",
                        "parentId": 1682455363956,
                        "nodes": [],
                        "parents": [],
                        "role": 1,
                        "fileName": null,
                        "descr": ""
                    }
                ],
                "role": 2,
                "fileName": "1684586544301.Без названия (4).png",
                "descr": "Amazon S3 is cloud object storage with industry-leading scalability, data availability, security, and performance. S3 is ideal for data lakes, ... · "
            }
        ]
        return data;
    }
    const [data, setData] = useState(dataGet())

    return (<div className="containerCell">
        <h3>Items</h3><hr />

        {data.map((item, key) => (
            <div key={key}>{item.title}</div>
        ))}

    </div>)
}