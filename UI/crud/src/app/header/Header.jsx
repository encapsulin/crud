import './header.css';

export default function Header() {
    return (<div className="Header bgdark containerRowCenter">
        <b>CRUD</b>
        <input type="text" placeholder='search:' />
        <img src='img/person-circle.svg' alt="person" />
    </div>)
}