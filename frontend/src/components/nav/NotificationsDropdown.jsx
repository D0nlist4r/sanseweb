import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiCheckLine, RiNotificationLine, RiCheckDoubleFill } from "@remixicon/react";
import { format } from '@formkit/tempo';

export default function NotificationsDropdown({ userId, setUnreadNovedadesCount }) {
    const [novedades, setNovedades] = useState([]);
    const [totalNovedades, setTotalNovedades] = useState(0);
    const [limit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchNovedades = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/api/v1/novedades/user/${userId}`,
                {
                    params: { limit, offset },
                    withCredentials: true,
                }
            );
            if (response.data.status) {
                setNovedades(response.data.data);
                setTotalNovedades(response.data.total);
                setTotalPages(Math.ceil(response.data.total / limit));
                const unread = response.data.data.filter(n => n.leida === 0).length;
                setUnreadNovedadesCount(unread);
            }
        } catch (error) {
            console.error('Error fetching novedades:', error);
        }
    };

    useEffect(() => {
        fetchNovedades();
    }, [offset]);

    const markAsRead = async (idNovedad) => {
        try {
            await axios.patch(
                `http://localhost:3001/api/v1/novedades/${idNovedad}/read`,
                {},
                { withCredentials: true }
            );
            fetchNovedades();
        } catch (error) {
            console.error('Error marking novedad as read:', error);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setOffset(offset - limit);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setOffset(offset + limit);
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Notificaciones</h3>
                <button className="btn btn-xs btn-outline" onClick={markAsRead}><RiCheckDoubleFill /> Marcar todas</button>
            </div>
            <ul className="menu bg-base-100 w-full">
                {novedades.length > 0 ? (
                    novedades.map((novedad) => (
                        <li
                            key={novedad.id_novedad}
                             className={`flex justify-between items-start border-b p-2 ${novedad.leida === 1 ? 'opacity-50' : 'bg-white'} rounded-lg shadow-sm mb-2`}
                        >
                            <div className="w-full flex items-start">
                                <RiNotificationLine className={`mr-2 ${novedad.leida === 0 ? 'text-green-500' : 'text-gray-500'}`} />
                                <div className='w-full'>
                                    <p className="font-semibold">{novedad.novedad}</p>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-xs text-gray-400">
                                            {format(new Date(novedad.fecha_novedad), "medium")}
                                        </p>
                                        {novedad.leida === 0 && (
                                            <button
                                                className="btn btn-circle btn-xs btn-outline"
                                                onClick={() => markAsRead(novedad.id_novedad)}
                                            >
                                                <RiCheckDoubleFill size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center p-2">No hay notificaciones</li>
                )}
            </ul>
            <div className="flex justify-center mt-2">
                <div className="join">
                    <button
                        className="join-item btn btn-sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    <button className="join-item btn btn-sm">
                        Página {currentPage} de {totalPages}
                    </button>
                    <button
                        className="join-item btn btn-sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
}
