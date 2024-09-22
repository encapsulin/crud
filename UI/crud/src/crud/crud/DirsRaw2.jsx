export default function DirsRaw2({ data, callbackSelectItem }) {
    return (
        <div className="align-row-right">

            <img src='img/plus-square.svg' alt='add'
                onClick={() => callbackSelectItem({ skid: "0", role: "dir" }, "w")}
                className='cursorPointer' />

            {data.map(item => (
                <span key={item.skid}>
                    <span className="align-col cursorPointer"
                        onClick={() => callbackSelectItem(item, "r")}
                    >
                        <button>{item.title}</button>

                    </span>
                </span>
            ))}
        </div>
    )
}
