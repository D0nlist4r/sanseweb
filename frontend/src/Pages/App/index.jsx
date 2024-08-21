import {useRoutes,BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from '../Home'
import Login from '../Login'
import NotFound from '../NotFound'
import Register from '../Register'
import Usuarios from '../Usuarios'
import Index from '../index'
import { NavPage } from '../../components/nav/NavPage'

const AppRoute =() => {

  let route = useRoutes([
    { path: '/', element: <Index/>},
    { path: '/Home', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/gestion-usuarios', element: <Usuarios /> },
    { path: '/*', element: <NotFound /> },
    { path: '/Register', element: <Register /> },
  ]);
  return route
}

function App() {

  return (
    <>
      <BrowserRouter>
      <NavPage/>
      <AppRoute/>
      </BrowserRouter>
    </>
  )
}

export default App
