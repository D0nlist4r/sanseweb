import React from 'react';
import { RiLoginBoxLine, RiBallPenLine, RiMoneyDollarCircleLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

export function NavPage() {
    const navigate = useNavigate();
    function handleNavigation(route) {
        navigate(route);
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a onClick={()=> navigate("/")} className="btn btn-ghost text-xl">
                    <RiMoneyDollarCircleLine/>
                    SanseFinance
                </a>
            </div>
            <div className="navbar-end">
                <a onClick={()=> navigate("/Login")} className="btn btn-outline btn-secondary mx-2">
                    <RiLoginBoxLine/>
                    Ingresar
                </a>
                <a onClick={()=> navigate("/Register")} className="btn btn-outline btn-default">
                    <RiBallPenLine/>
                    Retistrarse
                </a>
            </div>
        </div>
    );
}