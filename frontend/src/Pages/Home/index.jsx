import verifyToken from "../../controllers/Auth"
import mainNav from "../../components/nav/nav"

function Home() {
  verifyToken();
  return (
    <>
      {mainNav()}
      <div>
      </div>
    </>
  )
}

export default Home
