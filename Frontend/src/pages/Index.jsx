import React from "react";  
import "../styles/Index.css";

export default function Index() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Transporte Empresarial</h1>
          <p>Movemos tu empresa con seguridad y puntualidad</p>
          <br />
          <h3 className="destacado">¡Servicio 100% Gratis para Empresas!</h3>
          <br />
          <p className="subinfo">
            Nuestros ingresos provienen de alianzas publicitarias, no de nuestros pasajeros.
          </p>
        </div>
        <div className="hero-img">
          <img
            src="img/high-decker-3d-bus-luxury-600nw-2248764237.webp"
            alt="Vehículo empresarial"
          />
        </div>
      </section>

      <section className="info">
        <h2>Rutas Empresariales</h2>
        <p>
          Rutas Camino al Trabajo es un servicio de transporte especial en el que llevamos a ti y a tus compañeros de oficina al lugar de trabajo de forma segura, cómoda y puntual.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h4>EMAIL</h4>
            <p>
              <a href="mailto:director.operaciones@colviajes.com.co">
                director.operaciones@colviajes.com.co
              </a>
            </p>

            <h4>TELÉFONO</h4>
            <p>(318) 487-1922</p>

            <h4>DIRECCIÓN</h4>
            <p>Calle 56a #74a-51, Bogotá, Colombia.</p>
          </div>

          <div className="footer-col">
            <h4>SÍGUENOS EN:</h4>
            <p><a href="#">Facebook</a></p>
            <p><a href="#">Instagram</a></p>
          </div>

          <div className="footer-col">
            <h4>SERVICIOS</h4>
            <ul>
              <li><a href="#">Transporte Empresarial</a></li>
              <li><a href="#">Transporte VIP & Ejecutivo</a></li>
              <li><a href="#">Transporte Turístico</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Todos los derechos reservados © 2025 | MJV TRAVEL SAFELY</p>
        </div>
      </footer>
    </>
  );
}