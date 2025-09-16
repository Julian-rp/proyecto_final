import React, { useState } from "react";
import Registrate from "./Registrate";
import "../styles/iniciarSesion.css";

export default function IniciarSesion() {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const iniciarSesion = async () => {
    const data = {
      correo: document.getElementById("loginCorreo").value,
      contrasena: document.getElementById("loginContrasena").value,
    };

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.usuario) {
        alert(`Bienvenido ${result.usuario}`);
      } else {
        alert(result.mensaje);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const registrarEmpleado = async () => {
    const data = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      telefono: document.getElementById("telefono").value,
      correo: document.getElementById("correo").value,
      direccion: document.getElementById("direccion").value,
      contrasena: document.getElementById("contrasena").value,
    };

    try {
      const res = await fetch("http://localhost:3000/registro_empleado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.mensaje);
      if (result.mensaje.includes("correctamente")) {
        setMostrarRegistro(false);
      }
    } catch (err) {
      console.error("❌ Error en fetch:", err);
      alert("No se pudo registrar. Revisa la consola.");
    }
  };

  return (
    <>
      <nav>
        <div className="logo">
          <img src="../img/Logo.png" alt="Logo MJ" />
          <span className="brand-name">travel safely</span>
        </div>
        <ul>
          <li><a href="/">Inicio</a></li>
        </ul>
      </nav>

      {!mostrarRegistro ? (
        <div className="card" id="loginCard">
          <div className="logo-container">
            <img src="../img/Logo.png" alt="Logo Empresa" />
          </div>
          <input type="email" id="loginCorreo" placeholder="Correo electrónico o número de teléfono" required />
          <input type="password" id="loginContrasena" placeholder="Contraseña" required />
          <button className="btn-login" onClick={iniciarSesion}>Iniciar sesión</button>
          <hr />
          <button className="btn-create" onClick={() => setMostrarRegistro(true)}>
  Registrar Empleado
</button>

        </div>
      ) : (
        <div className="card" id="registroCard">
          <div className="logo-container">
            <img src="../img/Logo.png" alt="Logo Empresa" />
          </div>
          <h3>Crear cuenta nueva</h3>
          <input type="text" id="nombre" placeholder="Nombre" required />
          <input type="text" id="apellido" placeholder="Apellido" required />
          <input type="text" id="telefono" placeholder="Teléfono" required />
          <input type="email" id="correo" placeholder="Correo" required />
          <input type="text" id="direccion" placeholder="Dirección" required />
          <input type="password" id="contrasena" placeholder="Contraseña" required />
          <button  className="btn-create" onClick={() => setMostrarRegistro(true)}>Registrar</button>
        </div>
      )}
    </>
  );
}