import React, { useState } from "react";
import "../styles/registrate.css"; // asegúrate de importarlo

export default function Registrate() {
  const [mensaje, setMensaje] = useState("");

  const registrarUsuario = async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById("nombres").value,
      apellido: document.getElementById("apellidos").value,
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
      setMensaje("❌ Por favor, complete todos los campos");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
      setMensaje("❌ Por favor, ingrese un correo electrónico válido");
      return;
    }

    // Validar longitud de contraseña
    if (data.contrasena.length < 6) {
      setMensaje("❌ La contraseña debe tener al menos 6 caracteres");
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
        setMensaje(`✅ ${result.mensaje}`);
        // Limpiar formulario
        document.getElementById("nombres").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("contrasena").value = "";
      } else {
        setMensaje(`❌ ${result.mensaje}`);
      }
    } catch (err) {
      console.error("❌ Error en registro:", err);
      setMensaje("❌ Error al conectar con el servidor. Intente nuevamente.");
    }
  };

  return (
    <div className="registrate-wrapper">
      <nav className="registrate-nav">
        <div className="registrate-logo">
          <img src="../img/Logo.png" alt="Logo MJ" />
          <span className="registrate-brand-name">travel safely</span>
        </div>
        <ul className="registrate-menu">
          <li>
            <a href="/" className="registrate-link">
              Inicio
            </a>
          </li>
        </ul>
      </nav>

      <section className="registrate-form-container">
        <img
          src="../img/mjv.jpeg"
          alt="Logo Empresa"
          className="registrate-img"
        />
        <h2 className="registrate-title">Formulario de Registro</h2>

        <form onSubmit={registrarUsuario} className="registrate-form">
          <label htmlFor="nombres" className="registrate-label">
            Nombres*
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            placeholder="Ej. Juan Carlos"
            required
            className="registrate-input"
          />

          <label htmlFor="apellidos" className="registrate-label">
            Apellidos*
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            placeholder="Ej. Pérez García"
            required
            className="registrate-input"
          />

          <label htmlFor="telefono" className="registrate-label">
            Teléfono*
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ej. 3124567890"
            required
            pattern="[0-9]{7,10}"
            className="registrate-input"
          />

          <label htmlFor="correo" className="registrate-label">
            Correo*
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ej. juan@example.com"
            required
            className="registrate-input"
          />

          <label htmlFor="direccion" className="registrate-label">
            Dirección*
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            placeholder="Ej. Calle 45 #10-21"
            required
            className="registrate-input"
          />

          <label htmlFor="contrasena" className="registrate-label">
            Contraseña*
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            placeholder="Mínimo 6 caracteres"
            required
            minLength="6"
            className="registrate-input"
          />

          {mensaje && (
            <div
              className={`mensaje ${
                mensaje.includes("✅") ? "exito" : "error"
              }`}
            >
              {mensaje}
            </div>
          )}

          <button type="submit" className="registrate-button">
            REGISTRAR
          </button>
        </form>
      </section>
    </div>
  );
}
