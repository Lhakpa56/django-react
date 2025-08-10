import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            auth().catch(() => setIsAuthorized(false));
        }
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post('/auth/refresh', { token: refreshToken });

        }catch (error) {
            console.log(error);
            setIsAuthorized(false);   
        }

    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        constdecoded = jwtDecode(token);
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now ) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;