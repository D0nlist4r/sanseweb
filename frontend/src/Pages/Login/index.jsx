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
        console.log(response);
        if (response.data.status === true) {
          navigate("/");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="tuemail@ejemplo.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;