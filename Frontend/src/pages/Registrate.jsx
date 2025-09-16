import React from "react";
import "../styles/registrate.css"; // asegúrate de importarlo

export default function Registrate() {
  const validarFormulario = (e) => {
    e.preventDefault();
    alert("✅ Empleado registrado correctamente.");
    return true;
  };

  return (
    <div className="registrate-wrapper">
      <nav className="registrate-nav">
        <div className="registrate-logo">
          <img src="../img/Logo.png" alt="Logo MJ" />
          <span className="registrate-brand-name">travel safely</span>
        </div>
        <ul className="registrate-menu">
          <li><a href="/" className="registrate-link">Inicio</a></li>
        </ul>
      </nav>

      <section className="registrate-form-container">
        <img src="../img/mjv.jpeg" alt="Logo Empresa" className="registrate-img" />
        <h2 className="registrate-title">Formulario de Registro</h2>

        <form onSubmit={validarFormulario} className="registrate-form">
          <label htmlFor="nombres" className="registrate-label">Nombres*</label>
          <input type="text" id="nombres" name="nombres" placeholder="Ej. Juan Carlos" required className="registrate-input" />

          <label htmlFor="apellidos" className="registrate-label">Apellidos*</label>
          <input type="text" id="apellidos" name="apellidos" placeholder="Ej. Pérez García" required className="registrate-input" />

          <label htmlFor="telefono" className="registrate-label">Teléfono*</label>
          <input type="tel" id="telefono" name="telefono" placeholder="Ej. 3124567890" required pattern="[0-9]{7,10}" className="registrate-input" />

          <label htmlFor="correo" className="registrate-label">Correo*</label>
          <input type="email" id="correo" name="correo" placeholder="Ej. juan@example.com" required className="registrate-input" />

          <label htmlFor="direccion" className="registrate-label">Dirección*</label>
          <input type="text" id="direccion" name="direccion" placeholder="Ej. Calle 45 #10-21" required className="registrate-input" />

          <button type="submit" className="registrate-button">REGISTRAR</button>
        </form>
      </section>
    </div>
  );
}