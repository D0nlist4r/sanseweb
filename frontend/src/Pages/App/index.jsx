import {useRoutes,BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from '../Home'
import Login from '../Login'
import NotFound from '../NotFound'

const AppRoute =() => {

  let route = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/*', element: <NotFound /> },
  ]);
  return route
}

function App() {

  return (
    <>
      <BrowserRouter>
      <AppRoute/>
      </BrowserRouter>
    </>
  )
}

export default App
