export default function DirsRaw2({ data, callbackSelectItem }) {
    return (
        <div className="align-row-right" style={{ backgroundColor: "white" }}>

            {data.map(item => (
                <span key={item.skid} >

                    <button className="tab"
                        onClick={() => callbackSelectItem(item, "r")}
                    >{item.title}</button>


                </span>
            ))}
        </div>
    )
}
