import React from 'react';
import { RiMenu2Fill, RiHome2Fill, RiNotification3Fill, RiToolsFill, RiUser2Fill, RiLogoutBoxLine, RiGroupFill } from "@remixicon/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MainNav(props) {
    const navigate = useNavigate();

    function handleNavigation(route) {
        navigate(route);
    }
    function logout() {
        let id = props.userId;
        let baseURL = 'http://localhost:3001/api/v1/auth/logout/' + id;
        axios.defaults.withCredentials = true;
        axios.get(baseURL)
            .then((response) => {
                console.log(response);
                if (response.data.status === true) {
                    navigate("/Login");
                }
            })
            .catch(error => {
                console.log(error);
                let objMessageError = error.response.request.responseText;
                let message = JSON.parse(objMessageError);
                alert('Error al cerrar la sesión: ' + message.error);
            });
    }

    return (
        <>
            <div className="navbar bg-base-200 text-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
                            <RiMenu2Fill />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content shadow bg-base-100 rounded-box z-[1] mt-3 w-18">
                            <li >
                                <a  onClick={() => handleNavigation("/")} className="flex gap-6 tooltip tooltip-right px-4 text-lg" data-tip="Home">
                                    <RiHome2Fill />
                                </a>
                                <a onClick={() => handleNavigation("/gestion-usuarios")} className="flex gap-6 tooltip tooltip-right px-4 text-lg BtnLinkNav" data-tip="Gestion de usuarios">
                                    <RiGroupFill />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 navbar-center" >
                    <a className="btn btn-ghost text-xl">Sanse Finance</a>
                </div>
                <div className="flex-none navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <RiNotification3Fill />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="mask mask-hexagon w-24">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg">
                            <li>
                                <a >
                                    <RiUser2Fill />Profile
                                </a>
                            </li>
                            <li>
                                <a >
                                    <RiToolsFill />
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a onClick={logout}>
                                    <RiLogoutBoxLine />Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}