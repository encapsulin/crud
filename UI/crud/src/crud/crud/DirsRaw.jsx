export default function DirsRaw({ data, callbackSelectItem }) {
    return (
        <div className="align-row-evenly">
            {data.map(item => (
                <span key={item.skid}>
                    <span className="align-col cursorPointer"
                        onClick={() => callbackSelectItem(item, "r")}
                    >
                        <img src="img/folder.svg" alt="filder" style={{ width: "2rem" }} />
                        {item.title}
                    </span>
                </span>
            ))}
        </div>
    )
}
