import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import FormularioModal from "../components/FormularioModal";

export default function AdminDashboard() {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [vistaActiva, setVistaActiva] = useState("dashboard");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formularioEdicion, setFormularioEdicion] = useState(null);
  const [nuevoItem, setNuevoItem] = useState({
    tipo: "",
    datos: {},
  });

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const usuarioData = localStorage.getItem("usuario");
    if (usuarioData) {
      setUsuario(JSON.parse(usuarioData));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/iniciarsesion";
  };

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const obtenerRutas = async () => {
    try {
      const res = await fetch("http://localhost:3000/ruta");
      const data = await res.json();
      setRutas(data);
    } catch (err) {
      console.error("Error al obtener rutas:", err);
    }
  };

  const obtenerEmpresas = async () => {
    try {
      const res = await fetch("http://localhost:3000/empresa");
      const data = await res.json();
      setEmpresas(data);
    } catch (err) {
      console.error("Error al obtener empresas:", err);
    }
  };

  const eliminarItem = async (tipo, id) => {
    try {
      const res = await fetch(`http://localhost:3000/${tipo}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.exito !== false) {
        // Recargar datos
        if (tipo === "usuarios") obtenerUsuarios();
        if (tipo === "ruta") obtenerRutas();
        if (tipo === "empresa") obtenerEmpresas();
        alert("Elemento eliminado correctamente");
      } else {
        alert("Error al eliminar: " + data.mensaje);
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el elemento");
    }
  };

  const editarItem = (tipo, item) => {
    setFormularioEdicion({ tipo, item });
    setMostrarFormulario(true);
  };

  const crearItem = (tipo) => {
    setNuevoItem({ tipo, datos: {} });
    setFormularioEdicion(null);
    setMostrarFormulario(true);
  };

  const handleSave = () => {
    // Recargar datos después de guardar
    obtenerUsuarios();
    obtenerRutas();
    obtenerEmpresas();
  };

  useEffect(() => {
    obtenerUsuarios();
    obtenerRutas();
    obtenerEmpresas();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-logo">
          <img src="../img/Logo.png" alt="Logo" />
          <span>Travel Safely - Admin</span>
        </div>
        <div className="admin-user">
          <span>Bienvenido, {usuario?.Nom_completo}</span>
          <button onClick={cerrarSesion} className="btn-cerrar-sesion">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="admin-content">
        <h1>Panel de Administración</h1>

        <div className="admin-cards">
          <div className="admin-card">
            <h3>👥 Gestión de Usuarios</h3>
            <p>Administrar empleados y conductores</p>
            <button onClick={() => setVistaActiva("usuarios")}>
              Gestionar Usuarios
            </button>
          </div>

          <div className="admin-card">
            <h3>🚌 Gestión de Rutas</h3>
            <p>Crear y administrar rutas de transporte</p>
            <button onClick={() => setVistaActiva("rutas")}>
              Gestionar Rutas
            </button>
          </div>

          <div className="admin-card">
            <h3>🏢 Gestión de Empresas</h3>
            <p>Administrar empresas asociadas</p>
            <button onClick={() => setVistaActiva("empresas")}>
              Gestionar Empresas
            </button>
          </div>

          <div className="admin-card">
            <h3>📊 Reportes</h3>
            <p>Ver estadísticas y reportes</p>
            <button onClick={() => setVistaActiva("reportes")}>
              Ver Reportes
            </button>
          </div>
        </div>

        {/* Vista de Usuarios */}
        {vistaActiva === "usuarios" && (
          <div className="gestion-section">
            <div className="section-header">
              <h2>Gestión de Usuarios</h2>
              <button
                onClick={() => crearItem("usuarios")}
                className="btn-crear"
              >
                + Crear Usuario
              </button>
            </div>
            <div className="items-grid">
              {usuarios.map((user) => (
                <div key={user.id_usuario} className="item-card">
                  <h4>{user.Nom_completo}</h4>
                  <p>
                    <strong>Tipo:</strong> {user.Tip_usuario}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.Correo}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {user.Telefono}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {user.direccion}
                  </p>
                  <div className="item-actions">
                    <button
                      onClick={() => editarItem("usuarios", user)}
                      className="btn-editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarItem("usuarios", user.id_usuario)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista de Rutas */}
        {vistaActiva === "rutas" && (
          <div className="gestion-section">
            <div className="section-header">
              <h2>Gestión de Rutas</h2>
              <button onClick={() => crearItem("ruta")} className="btn-crear">
                + Crear Ruta
              </button>
            </div>
            <div className="items-grid">
              {rutas.map((ruta) => (
                <div key={ruta.Id_ruta} className="item-card">
                  <h4>Ruta #{ruta.Id_ruta}</h4>
                  <p>
                    <strong>Placas:</strong> {ruta.Placas}
                  </p>
                  <p>
                    <strong>Hora Salida:</strong>{" "}
                    {new Date(ruta.Hora_Salida).toLocaleString()}
                  </p>
                  <p>
                    <strong>Hora Entrada:</strong>{" "}
                    {new Date(ruta.Hora_Entrada).toLocaleString()}
                  </p>
                  <p>
                    <strong>Usuario ID:</strong> {ruta.Id_usuario}
                  </p>
                  <div className="item-actions">
                    <button
                      onClick={() => editarItem("ruta", ruta)}
                      className="btn-editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarItem("ruta", ruta.Id_ruta)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista de Empresas */}
        {vistaActiva === "empresas" && (
          <div className="gestion-section">
            <div className="section-header">
              <h2>Gestión de Empresas</h2>
              <button
                onClick={() => crearItem("empresa")}
                className="btn-crear"
              >
                + Crear Empresa
              </button>
            </div>
            <div className="items-grid">
              {empresas.map((empresa) => (
                <div key={empresa.id_empresa} className="item-card">
                  <h4>{empresa.Nom_empresa}</h4>
                  <p>
                    <strong>Tipo:</strong> {empresa.Tip_empresa}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {empresa.Direccion}
                  </p>
                  <p>
                    <strong>Email:</strong> {empresa.Correo}
                  </p>
                  <div className="item-actions">
                    <button
                      onClick={() => editarItem("empresa", empresa)}
                      className="btn-editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        eliminarItem("empresa", empresa.id_empresa)
                      }
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista de Reportes */}
        {vistaActiva === "reportes" && (
          <div className="gestion-section">
            <h2>Reportes y Estadísticas</h2>
            <div className="reportes-grid">
              <div className="reporte-card">
                <h3>Total de Usuarios</h3>
                <p className="numero-grande">{usuarios.length}</p>
              </div>
              <div className="reporte-card">
                <h3>Total de Rutas</h3>
                <p className="numero-grande">{rutas.length}</p>
              </div>
              <div className="reporte-card">
                <h3>Total de Empresas</h3>
                <p className="numero-grande">{empresas.length}</p>
              </div>
              <div className="reporte-card">
                <h3>Usuarios por Tipo</h3>
                <p>
                  Administradores:{" "}
                  {
                    usuarios.filter((u) => u.Tip_usuario === "Administrador")
                      .length
                  }
                </p>
                <p>
                  Empleados:{" "}
                  {usuarios.filter((u) => u.Tip_usuario === "Empleado").length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botón para volver al dashboard */}
        {vistaActiva !== "dashboard" && (
          <div className="volver-dashboard">
            <button
              onClick={() => setVistaActiva("dashboard")}
              className="btn-volver"
            >
              ← Volver al Dashboard
            </button>
          </div>
        )}

        {/* Modal para crear/editar elementos */}
        <FormularioModal
          isOpen={mostrarFormulario}
          onClose={() => setMostrarFormulario(false)}
          tipo={formularioEdicion?.tipo || nuevoItem.tipo}
          item={formularioEdicion?.item}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
