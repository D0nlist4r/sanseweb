import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    let fieldEmail = document.getElementById('email');
    let fieldPassword = document.getElementById('password');
    ajaxLogin(fieldEmail.value, fieldPassword.value);
  };

  const ajaxLogin = (email, password) => {
    let baseURL = 'http://localhost:3001/api/v1/auth/login';
    axios.defaults.withCredentials = true;
    axios.post(baseURL, {
      email,
      contrasena: password
    })
      .then((response) => {
        if (response.data.status === true) {
          navigate("/Home");
        }
      })
      .catch(error => {
        console.log(error);
        let objMessageError = error.response.request.responseText;
        let message = JSON.parse(objMessageError);
        alert('Error al iniciar sesión: ' + message.error);
      });
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Entra a tu Perfil!</h1>
          <p className="py-6">
            Tu portafoolio te espera para que veas como va creciendo tu smart money
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" required placeholder='email@gmail.com' />
            </div>
            <div className="form-control">
              <label className="label" htmlFor='password' >
                <span className="label-text">Password</span>
              </label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="********" className="input input-bordered" />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200" >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;