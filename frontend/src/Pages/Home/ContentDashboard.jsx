import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { incrementSolicitudesCount } from '../../store/actions/solicitudesActions';
import {SectionAhorroMainDashboard} from './SectionAhorroMainDashboard';
import {SectionP2pMainDashboard} from './SectionP2pMainDashboard';
import {SectionPrestamosMainDashboard} from './SectionPrestamosMainDashboard';

export default function ContentDashboard(props) {
    console.log(userId)
    let userId = props.userId;
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
        /* añadir un padding al tablist */
        <div className="hero bg-base-200 py-14">
            <div role="tablist" className="tabs tabs-lifted w-full p-4">
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="AHORRO"
                    defaultChecked
                    />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <SectionAhorroMainDashboard 
                    userId={userId} 
                    />
                </div>
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="PRESTAMOS"
                     />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <SectionPrestamosMainDashboard />
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="P2P" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <SectionP2pMainDashboard />
                </div>
            </div>
        </div>
    )
}

ContentDashboard.propTypes = {
    name: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
};