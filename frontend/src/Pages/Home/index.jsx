import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyToken from "../../controllers/Auth/index";
import MainNav from "../../components/nav/nav";
import ContentDashboard from "./ContentDashboard";
import SolicitudesModal from "../../components/solicitudesModal"; // Importa el nuevo componente

function Home() {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate(); // Hook useNavigate dentro del componente
  const [isSolicitudesModalOpen, setIsSolicitudesModalOpen] = useState(false);


  useEffect(() => {
    async function checkToken() {
      const result = await verifyToken(navigate);
      setResponse(result);
    }

    checkToken();
  }, [navigate]);

  const openSolicitudesModal = () => {
    setIsSolicitudesModalOpen(true);
  };

  const closeSolicitudesModal = () => {
    setIsSolicitudesModalOpen(false);
  };

  if (!response) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se verifica el token
  }

  if (response.status === true) {
    return (
      <>
        <MainNav userId={response.user.userId} onSolicitudesClick={openSolicitudesModal}  esAdmin={response.user.esAdmin} />
        <ContentDashboard name={response.user.userName} userId={response.user.userId} />
        {isSolicitudesModalOpen && (
          <SolicitudesModal userId={response.user.userId} onClose={closeSolicitudesModal} />
        )}
      </>
    );
  } else {
    return <p>No autorizado</p>; // Muestra un mensaje si el usuario no está autorizado
  }
}

export default Home;

