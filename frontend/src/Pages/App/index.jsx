import {useRoutes,BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from '../Home'
import Login from '../Login'
import NotFound from '../NotFound'
import Register from '../Register'
import Usuarios from '../Usuarios'
import Index from '../index'
import MainNav from '../../components/nav/nav'

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
      <MainNav/>
      <AppRoute/>
      </BrowserRouter>
    </>
  )
}

export default App
