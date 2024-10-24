import {React, useState} from 'react';
import { RiLoginBoxLine, RiBallPenLine, RiMoneyDollarCircleLine } from '@remixicon/react';
import { useNavigate, useLocation  } from 'react-router-dom';


export function NavPage() {
    const navigate = useNavigate();
    const [Habilitado, setHabilitado]  = useState(false);
    const Location = useLocation();
      function homeOn(){
        if (Location.pathname == '/Home'){
            return 
        }
        if (Location.pathname == '/gestion-usuarios'){
            return <div></div>
        }
        else{ 
         return  <div className="navbar bg-base-100">
         <div className="navbar-start">
             <a onClick={()=> navigate("/")} className="btn btn-ghost text-xl">
                 <RiMoneyDollarCircleLine/>
                 SanseFinance
             </a>
         </div>
         <div className="navbar-end">
         {loginOn()}
         {registerOn()}
         </div>
     </div>
        }
    }
    function loginOn(){
        if (Location.pathname == '/Login'){
            return <div></div>
        }
        else{ 
         return  <a onClick={()=> navigate("/Login")} className="btn btn-outline btn-secondary mx-2">
        <RiLoginBoxLine/>
        Ingresar
        </a>
        }
    }
    function registerOn(){
        if (Location.pathname == '/Register'){
            return <div></div>
        }
        else{ 
         return  <a onClick={()=> navigate("/Register")} className="btn btn-outline btn-default">
         <RiBallPenLine/>
         Retistrarse
     </a>
        }
    }

  
    return (<>
        {homeOn()}
        </>
    );
}
