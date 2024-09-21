export default function DirsRaw({ data, callbackSelectItem }) {
    return (
        <div className="align-row-evenly">
            {data.map(item => (
                <span key={item.skid}>
                    <span className="align-col cursorPointer"
                        onClick={() => callbackSelectItem(item, "r")}
                    >
                        <img src="img/folder-fill.svg" alt="filder" style={{ width: "3rem" }} />
                        {item.title}
                    </span>
                </span>
            ))}
        </div>
    )
}
