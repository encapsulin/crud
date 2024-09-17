import img from "./loading.svg"
import img0 from "./16px.svg"
import "./loading.css"

export default function Loading({ loading }) {
    const imgLoading = loading
        ? <img src={img} alt="loading" className="loading" />
        : <img src={img0} alt="loading" style={{ display: "none" }} />
    return (
        imgLoading
    )
}