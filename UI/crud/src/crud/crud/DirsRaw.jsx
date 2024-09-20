export default function DirsRaw({ data }) {
    return (
        <div className="align-row-evenly">
            {data.map(item => (
                <span>
                    <span className="align-col">
                        <img src="img/folder-fill.svg" alt="filder" style={{ width: "3rem" }} />
                        {item.title}
                    </span>
                </span>
            ))}
        </div>
    )
}
