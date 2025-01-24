import React,{useEffect} from 'react';
import ServiciosUsuarios from '../../components/Sections/ServiciosUsuarios';

export async function SectionAhorroMainDashboard(props) {
    let userId = props.userId;
    useEffect(() => {
        let responseAjaxServiciosUsuarios = ServiciosUsuarios.obtenerServiciosPorUsuario(userId);
        console.log('respose AjaxServiciosUsuarios', responseAjaxServiciosUsuarios);
    }, []);
    return (
        <p>AHORRO</p>
    )
}