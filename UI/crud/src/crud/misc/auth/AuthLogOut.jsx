import { authTokenLocalStorageSet } from './Auth';
import { useAuthData } from '../context/AuthDataContext';

export default function AuthLogOut({ callbackClose }) {

    const { setToken } = useAuthData();

    function logout() {
        authTokenLocalStorageSet("")
        setToken("")
        callbackClose()
    }

    return (
        <div className='containerRowSides'>
            <button onClick={logout}>Log out</button>
            <button type="button" className='cancel' onClick={callbackClose}>Cancel</button>
        </div>
    )
}
