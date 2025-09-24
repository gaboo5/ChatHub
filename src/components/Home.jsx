
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Efecto para aplicar el modo oscuro
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    // Cargar el modo oscuro del localStorage al montar el componente
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true');
        }
    }, []);

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
            {/* Header */}
            <header className="bg-red-600 px-4 py-3 shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-2xl font-bold">⚡ 3NGTech</span>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-white text-sm bg-black/20 px-3 py-1 rounded-full hover:bg-black/30 transition"
                    >
                        {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
                <div className="text-center max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
                        Bienvenido a 3NGTech
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
                        Tu plataforma centralizada para comunicación, gestión y redes sociales.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* Botón para ir a la sección de mensajes */}
                        
                        <Link
                            to="/chat" // Ruta que conecta con tu Layout de mensajes
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-center"
                        >
                            Ir a Mensajes
                        </Link>

                        {/* Botón para ir a la sección de perfiles de empresas */}
                        <Link
                            to="/profiles" // Ruta para la sección de perfiles (puedes crearla después)
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 text-center"
                        >
                            Ver Perfiles de Empresas
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer con Redes Sociales */}
            <footer className="bg-gray-800 text-white py-6 px-4">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-lg font-semibold mb-4 text-center">Síguenos en nuestras redes sociales</h3>
                    <div className="flex justify-center space-x-6">
                        
                        <a
                            href="https://www.facebook.com/p/3NG-TECH-61556462953352/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-white transition-colors duration-300"
                            aria-label="Facebook"
                        >
                            <span className="sr-only">Facebook</span>
                            <span className="text-2xl">📘</span> 
                        </a>
                        <a
                            href="https://www.instagram.com/3ng.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 hover:text-white transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <span className="sr-only">Instagram</span>
                            <span className="text-2xl">📸</span> 
                        </a>
                        <a
                            href="https://www.linkedin.com/company/3ng-tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-white transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <span className="text-2xl">💼</span> 
                        </a>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-400">
                        © {new Date().getFullYear()} 3NGTech. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;