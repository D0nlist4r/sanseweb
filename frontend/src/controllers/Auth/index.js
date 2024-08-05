import axios from 'axios';

async function verifyToken(navigate) {
    let baseURL = 'http://localhost:3001/api/v1/auth/verify';
    axios.defaults.withCredentials = true;
    try {
        let response = await axios.post(baseURL);
        if (response.data.status === false) {
            alert('Error al iniciar sesión: ' + response.data.message);
            navigate("/login");
            return null; // Retorna null si el status es false
        } else {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        let objMessageError = error.response?.data || { message: 'Error inesperado' };
        alert('Error al iniciar sesión: ' + objMessageError.message);
        navigate("/login");
        return null; // Retorna null si hay un error
    }
}

export default verifyToken;

