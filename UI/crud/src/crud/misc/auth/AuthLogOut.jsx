import { authTokenSet } from './Auth';


export default function AuthLogOut({ callbackClose }) {

    function logout() {
        authTokenSet("")
        callbackClose()
    }

    return (<>

        <div className='containerRowSides'>
            <button onClick={logout}>Log out</button>
            <button type="button" className='cancel' onClick={callbackClose}>Cancel</button>

        </div>
    </>
    )
}
