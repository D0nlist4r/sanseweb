import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import axios from 'axios';
import Unauthorized from "../unauthorized/index.jsx";
import React, { useState, useEffect, useRef } from "react";
import { RiGroupFill, RiIdCardLine, RiEditBoxFill, RiAtLine, RiMailFill, RiPencilFill, RiCircleLine, RiPhoneFill } from '@remixicon/react';
import { format } from "@formkit/tempo"

export default function GridUsuarios() {
    const CustomButtonComponent = (props) => {
        let idUsuario = props.data.id_usuario;
        return <button className="btn btn-xs btn-neutral" onClick={() => editUserhandler(idUsuario)}>< RiPencilFill size={20} /></button>;
    };
    const gridApiRef = useRef(null);
    function transformDate(params) {
        return new Date(params.value).toISOString().split('T')[0];
    }
    const renderStatus = ({ value }) => (
        (value == 1) ? <span className="badge badge-success">Activo</span> : <span className="badge badge-error">Inactivo</span>
    );
    // estados
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
            headerName: "cod",
            field: "id_usuario",
            flex: 1,
            filter: true,
            floatingFilter: true
        },
        {
            field: "nombres",
            valueFormatter: (params) => params.value.toUpperCase(),
            flex: 2,
            filter: true,
            floatingFilter: true
        },
        {
            field: "usuario",
            flex: 1,
            filter: true,
            floatingFilter: true,
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Tesla', 'Ford', 'Toyota'],
            },
        },
        {
            field: "email",
            flex: 2,
            filter: true,
            floatingFilter: true
        },
        {
            field: "telefono",
            flex: 1
        },
        {
            headerName: "fech. creacion",
            field: "fecha_creacion",
            valueFormatter: (params) => (params.value) ? transformDate(params) : "",
            flex: 1,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: "fech. actualización",
            field: "fecha_actualizacion",
            valueFormatter: (params) => (params.value) ? transformDate(params) : "",
            flex: 1,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: "fech. ultimo ingreso",
            field: "ultimo_login",
            valueFormatter: (params) => (params.value) ? transformDate(params) : "",
            flex: 1,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: "activo",
            field: "activo",
            flex: 2,
            filter: true,
            floatingFilter: true,
            cellRenderer: renderStatus,
        },
        {
            field: "acciones",
            cellRenderer: CustomButtonComponent,
            flex: 2,
        }
    ]);
    const [dataUser, setDataUser] = useState({ nombres: '', usuario: '', email: '', telefono: '' });
    const [showContent, setShowContent] = useState({ status: false, message: 'Cargando...' });

    const onGridReady = params => {
        gridApiRef.current = params.api; // Save the grid API reference
    };

    const editUserhandler = (id) => {
        console.log('Editando usuario con id: ' + id);
        document.getElementById('ModalEditUser').showModal();
        // hacer ajax con la ruta de /get-info/:idUser
        let serverUrl = 'http://localhost:3001/api/v1/users/get-info/' + id;
        axios.defaults.withCredentials = true;
        axios.get(serverUrl)
            .then((response) => {
                if (response.data.status === true) {
                    document.getElementById('nombres').value = response.data.data[0].nombres;
                    document.getElementById('usuario').value = response.data.data[0].usuario;
                    document.getElementById('email').value = response.data.data[0].email;
                    document.getElementById('telefono').value = response.data.data[0].telefono;
                    document.getElementById('hddnNameUser').innerText = response.data.data[0].usuario;
                    document.getElementById('HdnIdUsuario').value = response.data.data[0].id_usuario;
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleUpdateUser = () => {
        console.log('Actualizando usuario');
        let serverUrl = 'http://localhost:3001/api/v1/users/update';
        let dataForm = {
            idUser: document.getElementById('HdnIdUsuario').value,
            nombres: document.getElementById('nombres').value,
            usuario: document.getElementById('usuario').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            fecha_actualizacion: format(new Date(), "YYYY-MM-DD", "en")
        };
        console.log(dataForm);
        axios.defaults.withCredentials = true;
        axios.patch(serverUrl, dataForm)
            .then((response) => {
                if (response.data.status === true) {
                    alert('Usuario actualizado correctamente');
                    console.log(response.data);
                    document.getElementById('ModalEditUser').close();
                    // Refresh the grid data
                    let serverUrl = 'http://localhost:3001/api/v1/users/get-info-users';
                    axios.get(serverUrl)
                        .then((response) => {
                            if (response.data.status === true) {
                                setRowData(response.data.data);
                                if (gridApiRef.current) {
                                    gridApiRef.current.refreshCells(); // Optionally refresh cells
                                    // Alternatively, you can use setRowData to reset the data
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    // parametros de la grilla
    const pagination = true;
    const paginationPageSize = 500;
    const paginationPageSizeSelector = [200, 500, 1000];

    // carga de datos
    useEffect(() => {
        let serverUrl = 'http://localhost:3001/api/v1/users/get-info-users';
        axios.defaults.withCredentials = true;
        axios.get(serverUrl)
            .then((response) => {
                if (response.data.status === true) {
                    setShowContent({ status: true, message: 'Cargado' });
                    setRowData(response.data.data);
                    var eGridDiv = document.querySelector('#myGrid');
                    eGridDiv.style.setProperty("width", "100%");
                }
            })
            .catch(error => {
                console.log(error);
                if (error?.response?.status === 401) {
                    setShowContent({ status: false, message: 'USUARIO: No autorizado para ver esta información' });
                } else {
                    // let message = error.response.data.message;
                    // setShowContent({ status: false, message: 'Error al cargar la información: ' + message });
                }
            });
    }, []);

    if (!showContent.status) {
        return <Unauthorized />;
    } else {
        return (
            <>
                <div className="card lg:card-side bg-base-100">
                    {/* MODAL */}
                    <dialog id="ModalEditUser" className="modal">
                        <div className="modal-box w-1/2 max-w-6xl">
                            <h3 className="font-bold text-lg flex gap-2"> <RiEditBoxFill /> Editar Usuario de <span id="hddnNameUser"></span></h3>
                            <div className="flex flex-wrap justify-evenly">
                                <input type="hidden" id="HdnIdUsuario" />
                                <label style={{ width: '46%' }} className="form-control">
                                    <div className="label">
                                        <span className="label-text">Nombres</span>
                                    </div>
                                    <div className="flex items-center gap-2 input input-bordered">
                                        <input type="text" id="nombres" className="w-full" placeholder="Nombres" />
                                        <RiIdCardLine />
                                    </div>
                                </label>
                                <label style={{ width: '46%' }} className="form-control">
                                    <div className="label">
                                        <span className="label-text">Usuario</span>
                                    </div>
                                    <div className="flex items-center gap-2 input input-bordered">
                                        <input type="text" id="usuario" className="w-full" placeholder="Usuario" />
                                        <RiAtLine />
                                    </div>
                                </label>
                                <label style={{ width: '46%' }} className="form-control">
                                    <div className="label">
                                        <span className="label-text">Email</span>
                                    </div>
                                    <div className="flex items-center gap-2 input input-bordered">
                                        <input type="text" id="email" className="w-full" placeholder="Email" />
                                        <RiMailFill />
                                    </div>
                                </label>
                                <label style={{ width: '46%' }} className="form-control">
                                    <div className="label">
                                        <span className="label-text">Telefono</span>
                                    </div>
                                    <div className="flex items-center gap-2 input input-bordered">
                                        <input type="text" id="telefono" className="w-full" placeholder="Telefono" />
                                        <RiPhoneFill />
                                    </div>
                                </label>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    <button className="btn btn-primary" onClick={() => handleUpdateUser()}>Actualizar</button>
                                    <button className="btn mx-2">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <div className="card-body">
                        <h2 className="card-title flex gap-2"><RiGroupFill /> Usuarios</h2>
                        <div id="myGrid" style={{ height: "500px", width: "100%" }} className="ag-theme-quartz">
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={colDefs}
                                pagination={pagination}
                                paginationPageSize={paginationPageSize}
                                paginationPageSizeSelector={paginationPageSizeSelector}
                                onGridReady={onGridReady} // Set the onGridReady event handler
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
