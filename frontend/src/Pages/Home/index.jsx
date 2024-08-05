import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyToken from "../../controllers/Auth/index";
import MainNav from "../../components/nav/nav";
import ContentDashboard from "./ContentDashboard";
import Footer from "../../components/footer/footer";

function Home() {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate(); // Hook useNavigate dentro del componente

  useEffect(() => {
    async function checkToken() {
      const result = await verifyToken(navigate);
      setResponse(result);
    }

    checkToken();
  }, [navigate]);

  if (!response) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se verifica el token
  }

  if (response.status === true) {
    return (
      <>
        <MainNav />
        <ContentDashboard name={response.user.userName} />
        <Footer />
      </>
    );
  } else {
    return <p>No autorizado</p>; // Muestra un mensaje si el usuario no está autorizado
  }
}

export default Home;
