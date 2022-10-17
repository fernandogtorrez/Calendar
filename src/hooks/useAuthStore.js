import { useDispatch, useSelector } from "react-redux"
import calendarApi from '../api/calendarApi'
import { onLogoutCalendar } from "../store"
import { onLogin, onChecking, onLogout, clearErrorMessage } from '../store/auth/authSlice'
import { useLocalUser } from "./useLocalUser"

export const useAuthStore = () => {

    const dispatch = useDispatch()

    const { status, errorMessage, user } = useSelector(state => state.auth)

    const { uid, token, name, onSetLocalUser, clear } = useLocalUser()

    const startLogin = async ({email, password}) => {
        dispatch(onChecking())
        try {
            const {data} = await calendarApi.post('/auth', { email, password })
            onSetLocalUser(data)
            dispatch(onLogin({name: data.name, uid: data.uid}))
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg  || 'Error'))
            startClearErrorMessage()
        }
    }

    const startRegister = async ({email, password, username}) => {
        dispatch(onChecking())
        try {
            const {data} = await calendarApi.post('/auth/new', { email, password, name: username })
            onSetLocalUser(data)
            dispatch(onLogin({name: data.name, uid: data.uid}))
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg  || 'Error'))
            startClearErrorMessage()
        }
    }

    const checkAuthToken = async () => {
        if(token === 'checking') return
        if(!token) return dispatch(onLogout())

        try {
            const {data} = await calendarApi.get('/auth/renew')
            onSetLocalUser({name, uid, token: data.token})
            dispatch(onLogin({ name, uid }))
        } catch (error) {
            dispatch( onLogout() )
            clear()
        }
    }

    const startLogout = () => {
        dispatch(onLogout())
        dispatch(onLogoutCalendar())
        clear()
    }

    const startClearErrorMessage = () => {
        setTimeout(()=> {
            dispatch(clearErrorMessage())
        },1000)
    }

    return {
        // Propiedades
        status,
        errorMessage,
        user,
        // Metodos (funciones)
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
