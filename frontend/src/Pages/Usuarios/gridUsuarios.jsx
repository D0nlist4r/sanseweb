import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import axios from 'axios';
import Unauthorized from "../unauthorized/index.jsx";
import React, { useState, useEffect, useRef } from "react";
import { RiLockPasswordFill, RiUserFill, RiUserAddFill, RiDeleteBin5Fill, RiGroupFill, RiIdCardLine, RiEditBoxFill, RiAtLine, RiMailFill, RiPencilFill, RiCircleLine, RiPhoneFill } from '@remixicon/react';
import { format } from "@formkit/tempo"

export default function GridUsuarios() {
    const CustomButtonComponent = (props) => {
        let idUsuario = props.data.id_usuario;
        return (
            <div className="flex w-full h-full justify-center items-center gap-1">
                <button className="btn btn-xs btn-neutral" onClick={() => editUserhandler(idUsuario)}>
                    <RiPencilFill size={20} />
                </button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(idUsuario)}>
                    <RiDeleteBin5Fill size={20} />
                </button>
                <button className="btn btn-xs btn-warning" onClick={() => openUpdatePasswordModal(idUsuario)}>
                    <RiLockPasswordFill size={20} />
                </button>
            </div>
        );
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
            cellStyle: { textAlign: 'center' },
            headerName: "cod",
            field: "id_usuario",
            width: 100,
            filter: true,
            floatingFilter: true
        },
        {
            cellStyle: { textAlign: 'center' },
            field: "nombres",
            valueFormatter: (params) => params.value.toUpperCase(),
            width: 300,
            filter: true,
            floatingFilter: true
        },
        {
            cellStyle: { textAlign: 'center' },
            field: "usuario",
            width: 100,
            filter: true,
            floatingFilter: true,
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Tesla', 'Ford', 'Toyota'],
            },
        },
        {
            cellStyle: { textAlign: 'center' },
            field: "email",
            width: 300,
            filter: true,
            floatingFilter: true
        },
        {
            cellStyle: { textAlign: 'center' },
            field: "telefono",
            width: 160,
        },
        {
            cellStyle: { textAlign: 'center' },
            headerName: "fech. creacion",
            field: "fecha_creacion",
            width: 140,
            valueFormatter: (params) => (params.value) ? transformDate(params) : "",
            filter: true,
            floatingFilter: true
        },
        {
            cellStyle: { textAlign: 'center' },
            headerName: "fech. actualización",
            field: "fecha_actualizacion",
            width: 140,
            valueFormatter: (params) => (params.value) ? transformDate(params) : "",
            filter: true,
            floatingFilter: true
        },
        {
            cellStyle: { textAlign: 'center' },
            headerName: "fech. ultimo ingreso",
            field: "ultimo_login",
            width: 140,
            valueFormatter: (params) => (params.value) ? transformDate(params) : "",
            filter: true,
            floatingFilter: true
        },
        {
            cellStyle: { textAlign: 'center' },
            headerName: "activo",
            field: "activo",
            width: 100,
            filter: true,
            floatingFilter: true,
            cellRenderer: renderStatus,
        },
        {
            cellStyle: { textAlign: 'center' },
            field: "acciones",
            cellRenderer: CustomButtonComponent,
            width: 200,
        }
    ]);
    const [dataUser, setDataUser] = useState({ nombres: '', usuario: '', email: '', telefono: '' });
    const [showContent, setShowContent] = useState({ status: false, message: 'Cargando...' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Estado del modal de contraseña
    const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el ID del usuario seleccionado para actualizar la contraseña
    const onGridReady = params => {
        gridApiRef.current = params.api; // Save the grid API reference
    };
    // Manejador para abrir el modal
    const openCreateUserModal = () => {
        setIsModalOpen(true); // Abrir el modal
    };
    // Manejador para cerrar el modal
    const closeCreateUserModal = () => {
        setIsModalOpen(false);
        // Limpiar los campos del formulario
        document.getElementById('nombresNuevousuario').value = '';
        document.getElementById('contrasenaNuevousuario').value = '';
        document.getElementById('usuarioNuevousuario').value = '';
        document.getElementById('emailNuevousuario').value = '';
        document.getElementById('telefonoNuevousuario').value = '';
    };
    const handleCreateUser = () => {
        const nombres = document.getElementById('nombresNuevousuario').value;
        const contrasena = document.getElementById('contrasenaNuevousuario').value;
        const usuario = document.getElementById('usuarioNuevousuario').value;
        const email = document.getElementById('emailNuevousuario').value;
        const telefono = document.getElementById('telefonoNuevousuario').value;
        if (!nombres || !contrasena || !usuario || !email || !telefono) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        console.log('Creando nuevo usuario');
        const dataForm = {
            nombres,
            contrasena,
            usuario,
            email,
            telefono,
            fecha_creacion: new Date().toISOString().split('T')[0]
        };
        // Enviar los datos con una solicitud POST a la API
        axios.post('http://localhost:3001/api/v1/auth/register', dataForm)
            .then((response) => {
                if (response.data.status === true) {
                    alert('Usuario registrado correctamente');
                    closeCreateUserModal();
                    refreshGridData(); // Llamar a la función para refrescar los datos
                } else {
                    alert('Error al registrar el usuario: ' + response.data.message);
                }
            })
            .catch((error) => {
                console.log('Error en la solicitud:', error);
                alert('Hubo un error al intentar registrar el usuario.');
            });
    };
    // Manejador para abrir el modal de actualizar contraseña
    const openUpdatePasswordModal = (id) => {
        setSelectedUserId(id); // Guardar el ID del usuario seleccionado
        setIsPasswordModalOpen(true); // Abrir el modal
    };

    // Manejador para cerrar el modal
    const closeUpdatePasswordModal = () => {
        setIsPasswordModalOpen(false); // Cerrar el modal
        setSelectedUserId(null); // Limpiar el ID del usuario seleccionado
    };

    // Manejador para enviar la solicitud de actualización de contraseña
    const handleUpdatePassword = () => {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;

        if (!currentPassword || !newPassword) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        const dataForm = {
            idUser: selectedUserId,
            contrasena: currentPassword,
            contrasenaNueva: newPassword,
        };
        axios.patch('http://localhost:3001/api/v1/auth/update-password', dataForm)
            .then((response) => {
                if (response.data.status === true) {
                    alert('Contraseña actualizada correctamente');
                    closeUpdatePasswordModal(); // Cerrar el modal al actualizar correctamente
                } else {
                    alert('Error al actualizar la contraseña: ' + response.data.error);
                }
            })
            .catch((error) => {
                console.log('Error en la solicitud:', error);
                alert('Hubo un error al intentar actualizar la contraseña.');
            });
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
    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            let serverUrl = `http://localhost:3001/api/v1/users/delete/${id}`;
            axios.defaults.withCredentials = true;
            axios.delete(serverUrl)
                .then((response) => {
                    if (response.data.status === true) {
                        alert('Usuario eliminado correctamente');
                        console.log(response.data);
                        // Refrescar los datos de la grilla
                        let serverUrl = 'http://localhost:3001/api/v1/users/get-info-users';
                        axios.get(serverUrl)
                            .then((response) => {
                                if (response.data.status === true) {
                                    setRowData(response.data.data); // Actualizar la tabla con los nuevos datos
                                    if (gridApiRef.current) {
                                        gridApiRef.current.refreshCells();
                                    }
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    console.log('Error al eliminar el usuario:', error);
                });
        }
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
                    refreshGridData(); // Refrescar los datos de la grilla
                }
            })
            .catch(error => {
                switch (error.response.status) {
                    case 500:
                        alert('Error al actualizar el usuario: ' + error.response.data.message);
                        break;
                    case 401:
                        alert('Error en la autenticación actualizar el usuario: ' + error.response.data.message);
                        break;
                }
            });
    }
    const refreshGridData = () => {
        let serverUrl = 'http://localhost:3001/api/v1/users/get-info-users';
        axios.get(serverUrl)
            .then((response) => {
                if (response.data.status === true) {
                    setRowData(response.data.data); // Actualiza los datos en la grilla
                    if (gridApiRef.current) {
                        gridApiRef.current.refreshCells(); // Refrescar las celdas opcionalmente
                    }
                } else {
                    console.log('Error al obtener los datos: ' + response.data.message);
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 500:
                        alert('Error al obtener los datos: ' + error.response.data.message);
                        break;
                    case 401:
                        alert('Error en la autenticación: ' + error.response.data.message);
                        break;
                }
            });
    };
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
                    {/* Modal para crear un nuevo usuario */}
                    {isModalOpen && (
                        <dialog id="createUserModal" className="modal" open>
                            <div className="modal-box w-1/2 max-w-6xl">
                                <h3 className="font-bold text-lg flex"><RiUserFill /> Registrar Nuevo Usuario</h3>
                                <div className="flex flex-wrap justify-evenly">
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Nombres</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="text" id="nombresNuevousuario" className="w-full" placeholder="Nombres" />
                                            <RiIdCardLine />
                                        </div>
                                    </label>
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Usuario</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="text" id="usuarioNuevousuario" className="w-full" placeholder="Usuario" />
                                            <RiAtLine />
                                        </div>
                                    </label>
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Email</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="email" id="emailNuevousuario" className="w-full" placeholder="Email" />
                                            <RiMailFill />
                                        </div>
                                    </label>
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Teléfono</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="tel" id="telefonoNuevousuario" className="w-full" placeholder="Teléfono" />
                                            <RiPhoneFill />
                                        </div>
                                    </label>
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Contraseña</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="password" id="contrasenaNuevousuario" className="w-full" placeholder="Contraseña" />
                                            <RiLockPasswordFill />
                                        </div>
                                    </label>
                                </div>
                                <div className="modal-action">
                                    <button className="btn btn-primary" onClick={handleCreateUser}>
                                        Registrar
                                    </button>
                                    <button className="btn mx-2" onClick={closeCreateUserModal}>Cerrar</button>
                                </div>
                            </div>
                        </dialog>
                    )}
                    {/* Modal para actualizar contraseña */}
                    {isPasswordModalOpen && (
                        <dialog id="updatePasswordModal" className="modal" open>
                            <div className="modal-box">
                                <h3 className="font-bold text-lg flex"><RiLockPasswordFill /> Actualizar Contraseña</h3>
                                <div className="flex flex-wrap justify-evenly">
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Contraseña Actual</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="password" id="currentPassword" className="w-full" placeholder="Contraseña Actual" />
                                            <RiLockPasswordFill />
                                        </div>
                                    </label>
                                    <label style={{ width: '46%' }} className="form-control">
                                        <div className="label">
                                            <span className="label-text">Nueva Contraseña</span>
                                        </div>
                                        <div className="flex items-center gap-2 input input-bordered">
                                            <input type="password" id="newPassword" className="w-full" placeholder="Nueva Contraseña" />
                                            <RiLockPasswordFill />
                                        </div>
                                    </label>
                                </div>
                                <div className="modal-action">
                                    <button className="btn btn-primary" onClick={handleUpdatePassword}>
                                        Actualizar Contraseña
                                    </button>
                                    <button className="btn mx-2" onClick={closeUpdatePasswordModal}>Cerrar</button>
                                </div>
                            </div>
                        </dialog>
                    )}
                    <div className="card-body">
                        <div className="card-title flex justify-between items-center gap-2">
                            <div className="flex gap-2 items-center">
                                <RiGroupFill />
                                <h2>Usuarios</h2>
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={openCreateUserModal}>
                                <RiUserAddFill /> Crear Usuario
                            </button>
                        </div>
                        <div id="myGrid" style={{ height: "500px", width: "100%" }} className="ag-theme-quartz w-full h-500 overflow-x-auto">
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
