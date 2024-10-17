import {React, useState} from 'react';
import { RiLoginBoxLine, RiBallPenLine, RiMoneyDollarCircleLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';


export function NavPage(props) {
    const navigate = useNavigate();
    const [Habilitado, setHabilitado]  = useState(false);

    function handleNavigation (route) {
        navigate(route);
    }
    function login_On () {
        if (Habilitado){
            return <a onClick={()=> navigate("/Login")} className="btn btn-outline btn-secondary mx-2">
                    <RiLoginBoxLine/>
                    Ingresar
                </a>
        }
        else 
        return <div></div>
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
                {login_On(props.estado)} 
                <a onClick={()=> navigate("/Register")} className="btn btn-outline btn-default">
                    <RiBallPenLine/>
                    Retistrarse
                </a>
            </div>
        </div>
    );
}
