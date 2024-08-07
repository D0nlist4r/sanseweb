import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import axios from 'axios';
import Unauthorized from "../unauthorized/index.jsx";
import React, { useState, useEffect } from "react";
import { RiGroupFill } from '@remixicon/react';



export default function GridUsuarios() {
    const editUserhandler = (id) => {
        alert('Editando usuario con id: ' + id);
    };
    const CustomButtonComponent = (props) => {
        let idUsuario = props.data.id_usuario;
        return <button className="btn btn-xs btn-neutral" onClick={() => editUserhandler(idUsuario)}>Editar</button>;
    };
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
            ilter: true,
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
            flex: 1,
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
    const [showContent, setShowContent] = useState({ status: false, message: 'Cargando...' });
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
                    eGridDiv.style.setProperty("width", "1000px");
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
                    <div className="card-body">
                        <h2 className="card-title mb-6"> <RiGroupFill /> GESTIÓN DE USUARIOS</h2>
                        <div
                            id="myGrid"
                            className="ag-theme-quartz" // applying the Data Grid theme
                            style={{ height: 400 }} // the Data Grid will fill the size of the parent container
                        >
                            <AgGridReact
                                pagination={pagination}
                                paginationPageSize={paginationPageSize}
                                paginationPageSizeSelector={paginationPageSizeSelector}
                                width="2000px"
                                rowData={rowData}
                                columnDefs={colDefs}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}