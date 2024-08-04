import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function VerifyToken() {
    let navigate = useNavigate();
    let baseURL = 'http://localhost:3001/api/v1/auth/verify';
    axios.defaults.withCredentials = true;
    axios.post(baseURL)
        .then((response) => {
            if (response.data.status === false) {
                alert('Error al iniciar sesión: ' + response.data.message);
                navigate("/login");
            }
        })
        .catch(error => {
            console.log(error);
            let objMessageError = error.response.request.responseText;
            let message = JSON.parse(objMessageError);
            alert('Error al iniciar sesión: ' + message.message);
            navigate("/login");
        });
}

export default VerifyToken;