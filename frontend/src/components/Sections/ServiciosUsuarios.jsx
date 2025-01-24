import axios from 'axios';

export default function obtenerServiciosPorUsuario(userId) {
    let baseURL = 'http://localhost:3001/api/v1/servicios-usuarios/obtener-servicios-por-usuario/' + userId;
    axios.defaults.withCredentials = true;
    axios.get(baseURL)
        .then((response) => {
            if (response.status === true) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.log(error);
            let objMessageError = error.response.request.responseText;
            let message = JSON.parse(objMessageError);
            alert('Error al iniciar sesión: ' + message.error);
        });   // Llamada a la API
}