import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    let userid = localStorage.getItem("userid")

    return userid ? children : <Navigate to="/" replace />
}

export default PrivateRoute
