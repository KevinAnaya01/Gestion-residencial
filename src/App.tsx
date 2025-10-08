import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import "./App.css";
import { Inicio } from "./Inicio";
import { ProtectedRoute } from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";


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
          <Route path="/inicio" element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } />
          
          {/* Ruta para páginas no encontradas - redirige a login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;