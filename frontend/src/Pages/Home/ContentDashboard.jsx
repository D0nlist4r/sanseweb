import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { incrementSolicitudesCount } from '../../store/actions/solicitudesActions';

export default function ContentDashboard(props) {
    const dispatch = useDispatch();
    const handleCreateSolicitud = async (idServicio) => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/solicitudes/', {
                id_usuario: props.userId,
                id_servicio: idServicio,
            });
            if (response.data.status) {
                alert('Solicitud creada correctamente.');

                // Incrementar el contador de solicitudes en el estado global
                dispatch(incrementSolicitudesCount(1));
            } else {
                alert('No se pudo crear la solicitud: ' + response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error al crear la solicitud: ' + (error.response?.data?.message || error.message));
        }
    };
    return (
        <div className="hero bg-base-200 py-14">
            <div className="hero-content text-center">
                <div className="max-w-md">

                    <h1 className="text-5xl font-bold">Bienvenido, {props.name} </h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button
                        className="btn btn-primary mx-2 my-2"
                        onClick={() => handleCreateSolicitud(2)}
                    >
                        EMPEZAR AHORRO
                    </button>
                    <button
                        className="btn btn-secondary mx-2 my-2"
                        onClick={() => handleCreateSolicitud(3)}
                    >
                        SOLICITAR PRÉSTAMO
                    </button>
                    <button
                        className="btn btn-success mx-2 my-2"
                        onClick={() => handleCreateSolicitud(1)}
                    >
                        SERVICIO P2P
                    </button>
                </div>
            </div>
        </div>
    )
}

ContentDashboard.propTypes = {
    name: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
};