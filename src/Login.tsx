import React from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuth } from "./auth/use-auth";

const Login: React.FC = () => {
  const {
    formData,
    showPassword,
    isLoading,
    errors,
    handleInputChange,
    handleSubmit,
    setShowPassword,
    handleKeyPress,
  } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Columna Izquierda - Información e Imagen */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-center items-center text-white">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-6">Bienvenido de nuevo</h1>
          <p className="text-xl text-blue-100 mb-8">
            Accede a tu cuenta y gestiona todo desde un solo lugar. Estamos
            felices de verte nuevamente.
          </p>

          {/* Espacio para imagen */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center h-64 bg-white/5 rounded-xl">
              <div className="text-center">
                <User className="w-32 h-32 mx-auto mb-4 opacity-100" />
                <p className="text-sm text-blue-200">
                  Aquí puedes colocar tu imagen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Contenedor del formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-gray-600">Ingresa a tu cuenta</p>
            </div>

            {/* Formulario */}
            <div className="space-y-6">
              {/* Campo Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Campo Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Recordar contraseña */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Recordarme
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Al iniciar sesión, aceptas nuestros{" "}
              <a href="#" className="underline hover:text-gray-700">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="#" className="underline hover:text-gray-700">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
