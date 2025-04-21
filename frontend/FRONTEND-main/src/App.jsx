import { Routes, Route, Link } from "react-router-dom";
import { Login } from "./Routes/Login/Login";
import { Registrar } from "./Routes/Registros/Registrar";
import './App.css';

// Página principal (antes Home.jsx)
function Home() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/images/logo.svg" alt="Logo SmartCart" />
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Contacto</a></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a SmartCart</h1>
          <p>La forma más inteligente de comprar y vender.</p>
          <a href="/productos" className="btn">Explorar</a>
        </div>
        <div className="hero-image">
          <img src="/images/hero.png" alt="SmartCart" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Smart Cart. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registrar />} />
    </Routes>
  );
}

export default App;
