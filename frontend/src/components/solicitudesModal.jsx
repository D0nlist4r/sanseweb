// SolicitudesModal.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    RiInboxFill,
    RiCloseFill,
    RiCheckFill,
    RiTimeLine,
    RiCheckboxCircleLine,
    RiCloseCircleLine
} from "@remixicon/react";

export default function SolicitudesModal({ userId, onClose }) {
    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedSolicitudes, setSelectedSolicitudes] = useState([]);

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    const fetchSolicitudes = async () => {
        try {
            let serverUrl = `http://localhost:3001/api/v1/solicitudes/`;
            axios.defaults.withCredentials = true;
            const response = await axios.get(serverUrl);
            if (response.data.status === true) {
                // No filtrar por usuario si deseas ver todas las solicitudes
                const userSolicitudes = response.data.data.filter(solicitud => solicitud.gestionada === 0);
                setSolicitudes(userSolicitudes);
            } else {
                alert('Error al obtener las solicitudes');
            }
        } catch (error) {
            console.log(error);
            alert('Error al obtener las solicitudes');
        }
    };

    const handleCheckboxChange = (e, id_solicitud) => {
        if (e.target.checked) {
            setSelectedSolicitudes([...selectedSolicitudes, id_solicitud]);
        } else {
            setSelectedSolicitudes(selectedSolicitudes.filter(id => id !== id_solicitud));
        }
    };
    const handleAccept = async () => {
        if(selectedSolicitudes.length === 0) {
            alert('Selecciona al menos una solicitud.');
            return;
        }
        try {
            await axios.patch(`http://localhost:3001/api/v1/solicitudes/update-multiple`, {
                ids: selectedSolicitudes,
                gestionada: 2, // Estado '2' para aceptadas
            });
            fetchSolicitudes();
            setSelectedSolicitudes([]);
            alert('Solicitudes aceptadas correctamente.');
        } catch (error) {
            console.error(error);
            alert('Error al aceptar las solicitudes.');
        }
    };
    const handleReject = async () => {
        if(selectedSolicitudes.length === 0) {
            alert('Selecciona al menos una solicitud.');
            return;
        }
        try {
            await axios.patch(`http://localhost:3001/api/v1/solicitudes/update-multiple`, {
                ids: selectedSolicitudes,
                gestionada: 1, // Estado '1' para rechazadas
            });
            fetchSolicitudes();
            setSelectedSolicitudes([]);
            alert('Solicitudes rechazadas correctamente.');
        } catch (error) {
            console.error(error);
            alert('Error al rechazar las solicitudes.');
        }
    };

    return (
        <dialog className="modal" open>
            <div className="modal-box w-full max-w-5xl">
                <h3 className="font-bold text-lg flex items-center">
                    Solicitudes <RiInboxFill className="ml-2" />
                </h3>
                <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <div className="py-4">
                    {solicitudes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-fixed table-xs table-pin-rows table-pin-cols table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th className="w-12"></th>
                                        <th className="w-16">ID</th>
                                        <th className="w-32">Usuario</th>
                                        <th className="w-32">Servicio</th>
                                        <th className="w-40">Fecha Registro</th>
                                        <th className="w-20">Gestionada</th>
                                        <th className="w-64">Respuesta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitudes.map((solicitud) => (
                                        <tr key={solicitud.id_solicitud} className="hover">
                                            <td className="w-12">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        checked={selectedSolicitudes.includes(solicitud.id_solicitud)}
                                                        onChange={(e) => handleCheckboxChange(e, solicitud.id_solicitud)}
                                                    />
                                                </label>
                                            </td>
                                            <td className="w-16">{solicitud.id_solicitud}</td>
                                            <td className="w-32">{solicitud.nombreUsuario}</td>
                                            <td className="w-32">{solicitud.nombreServicio}</td>
                                            <td className="w-40">{solicitud.fecha_registro}</td>
                                            <td className="w-20">
                                                {solicitud.gestionada === 0 && (
                                                    <>
                                                        <RiTimeLine className="inline-block mr-1 text-yellow-500" />
                                                        Pendiente
                                                    </>
                                                )}
                                                {solicitud.gestionada === 1 && (
                                                    <>
                                                        <RiCheckboxCircleLine className="inline-block mr-1 text-green-500" />
                                                        Aceptada
                                                    </>
                                                )}
                                                {solicitud.gestionada === 2 && (
                                                    <>
                                                        <RiCloseCircleLine className="inline-block mr-1 text-red-500" />
                                                        Rechazada
                                                    </>
                                                )}
                                            </td>
                                            <td className="w-64">{solicitud.respuesta}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No hay solicitudes.</p>
                    )}
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary btn-square btn-sm" title="Aceptar" onClick={handleAccept}>
                        <RiCheckFill />
                    </button>
                    <button className="btn btn-error btn-square btn-sm" title="Rechazar" onClick={handleReject}>
                        <RiCloseFill />
                    </button>
                </div>
            </div>
        </dialog>
    );
}
