import { authTokenSet } from './Auth';


export default function AuthLogOut({ callbackClose }) {

    function logout() {
        authTokenSet("")
        callbackClose()
    }

    return (<>
        <button onClick={logout}>Log out</button>
    </>
    )
}
