import { createContext, useState } from "react";

const UserDataContext = createContext()

export function UserDataContextProvider({ children }) {
    const [userData, setUserData] = useState({});

    function dataGet() {
        return userData;
    }

    function dataSet(data_) {
        setUserData(data_);
    }

    const userDataContext = {
        data: userData,
        dataGet,
        dataSet
    };

    return (<UserDataContext.Provider value={userDataContext}>{children}</UserDataContext.Provider>)

}

export default UserDataContext;