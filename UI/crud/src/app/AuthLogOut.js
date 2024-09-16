import { authTokenSet } from './AuthProfile';


export default function AuthLogOut(props) {

    function logout() {
        authTokenSet(null)
        window.location.reload();

    }

    return (<>
        <button onClick={logout}>Log out</button>
    </>
    )
}
