import './header.css';

export default function Header() {
    return (<div className="Header bgdark">
        <b>CRUD</b>
        <input type="text" placeholder='search:' />
        <img src='img/person.svg' alt="person" />
    </div>)
}