import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./componentes/nadvar";
import Index from "./pages/Index";
import IniciarSesion from "./pages/IniciarSesion";
import Nosotros from "./pages/Nosotros";
import Registrate from "./pages/Registrate";
import RutasConductor from "./pages/RutasConductor";
import SolicitarRuta from "./pages/SolicitarRuta";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function Layout() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/registrate" element={<Registrate />} />
        <Route path="/rutasconductor" element={<RutasConductor />} />
        <Route path="/solicitarruta" element={<SolicitarRuta />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
