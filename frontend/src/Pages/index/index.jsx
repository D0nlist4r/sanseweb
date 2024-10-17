import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { NavPage } from '../../components/nav/NavPage';


function Index() {
    const navigate = useNavigate();

    return ( 
    <>
        <main>
            <div className='container'>
            <div id='Primer-tramo ' className='size-full bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                <h1 className='pt-28 SSfont-mono flex justify-center text-6xl text-white'>Sanse Finance</h1>
                <h1 className='SSfont-mono flex justify-center text-3xl text-stone-300'> Fondo de inversion en cripto - Prestamos y productos P2P</h1>
                <div className='flex justify-center pt-10 gap-6'>
                <button onClick={()=> navigate("/Login")} className="btn btn-outline mb-5">Entrar APP</button>
                <button className="btn btn-outline btn-secondary mb-5">Leer mas</button>
                </div>    
            </div>
            <div id='Segundo tramo' className='flex justify-center gap-5 mt-10 '>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Fondo de inversion 150% APY</h2>
                        <p>Invierte en unos de los mercados de mas alto rendiemiento de la historia. 
                        </p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Saber mas</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Prestamos</h2>
                        <p>Si perteneces al fondo de inversion, tiene el acceso a prestamos de bajo interes en pretamos en dolares</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Saber mas</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Pool P2P</h2>
                        <p>Aporta liquidez en nuestro pool de cambio de Pesos a Dolares y recive incetivos mensualmente</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Saber mas</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </main>
 </>
    )
}

export default Index;