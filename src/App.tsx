import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { Apartamento } from "./pages/apartamentos/views/apartamento";
import { Inicio } from "./pages/home/Inicio";
import Login from "./pages/auth/views/Login";

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* Ruta predeterminada - redirige a login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Ruta de Login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta de Inicio */}
          <Route
            path="/inicio"
            element={
              <ProtectedRoute>
                <Inicio />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para Apartamentos */}
          <Route
            path="/apartamento"
            element={
              <ProtectedRoute>
                <Apartamento />
              </ProtectedRoute>
            }
          />

          {/* 🏢 Nueva ruta protegida para Apartamentos */}

          {/* Ruta para páginas no encontradas - redirige a login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
