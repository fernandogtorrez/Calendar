import { useEffect, useState } from "react";

export const useLocalUser = () => {

    const [localUser, setLocalUser] = useState({token:'checking'});

    useEffect(() => {
        setLocalUser(JSON.parse(localStorage.getItem('user')))
    }, []);

    const onSetLocalUser = ({name, uid, token}) => {
        const user = {
            name,
            uid,
            token,
            initDate: new Date().getTime()
        }
        localStorage.setItem('user', JSON.stringify(user))
        setLocalUser(user)
    }

    const clear = () => {
        localStorage.clear()
    }

    return {
        ...localUser,
        localUser,
        onSetLocalUser,
        clear,
    }
}
