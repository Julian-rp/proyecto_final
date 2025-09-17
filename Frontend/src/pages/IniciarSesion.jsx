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

    // Validar que ambos campos estén llenos
    if (!data.correo || !data.contrasena) {
      alert("Por favor, complete todos los campos");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
      alert("Por favor, ingrese un correo electrónico válido");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.exito) {
        // Guardar usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(result.data));

        // Redireccionar según el tipo de usuario
        if (result.data.Tip_usuario === "Administrador") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/user-dashboard";
        }
      } else {
        alert(result.mensaje);
      }
    } catch (err) {
      console.error("❌ Error en login:", err);
      alert("Error al conectar con el servidor. Intente nuevamente.");
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

    // Validar que todos los campos estén llenos
    if (
      !data.nombre ||
      !data.apellido ||
      !data.telefono ||
      !data.correo ||
      !data.direccion ||
      !data.contrasena
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
      alert("Por favor, ingrese un correo electrónico válido");
      return;
    }

    // Validar longitud de contraseña
    if (data.contrasena.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/registro_empleado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.exito) {
        alert(`¡${result.mensaje}!`);
        setMostrarRegistro(false);
        // Limpiar formulario
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("contrasena").value = "";
      } else {
        alert(result.mensaje);
      }
    } catch (err) {
      console.error("❌ Error en registro:", err);
      alert("Error al conectar con el servidor. Intente nuevamente.");
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
          <li>
            <a href="/">Inicio</a>
          </li>
        </ul>
      </nav>

      {!mostrarRegistro ? (
        <div className="card" id="loginCard">
          <div className="logo-container">
            <img src="../img/Logo.png" alt="Logo Empresa" />
          </div>
          <input
            type="email"
            id="loginCorreo"
            placeholder="Correo electrónico o número de teléfono"
            required
          />
          <input
            type="password"
            id="loginContrasena"
            placeholder="Contraseña"
            required
          />
          <button className="btn-login" onClick={iniciarSesion}>
            Iniciar sesión
          </button>
          <hr />
          <button
            className="btn-create"
            onClick={() => setMostrarRegistro(true)}
          >
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
          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña"
            required
          />
          <button className="btn-create" onClick={registrarEmpleado}>
            Registrar
          </button>
        </div>
      )}
    </>
  );
}
