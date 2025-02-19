import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/config'
import {logout} from '../../store/authSlice'

function LogoutBTN() {
    const dispatch = useDispatch()

    const logouthandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button className='hover:bg-blue-500'>Logout</button>
    )
}

export default LogoutBTN