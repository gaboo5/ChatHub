
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profiles = () => {
    const [darkMode, setDarkMode] = useState(false);

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

    // Datos de ejemplo de empresas
    const companies = [
        { id: 1, name: 'TechCorp', description: 'Líder en soluciones tecnológicas.' },
        { id: 2, name: 'DesignHub', description: 'Innovación en diseño gráfico y UX.' },
        { id: 3, name: 'CloudServices', description: 'Servicios en la nube confiables.' },
        
    ];

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
            {/* Header */}
            <header className="bg-red-600 px-4 py-3 shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="text-white text-2xl font-bold">⚡ 3NGTech</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="text-white text-sm bg-black/20 px-3 py-1 rounded-full hover:bg-black/30 transition"
                        >
                            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
                        </button>
                        {/* Botón para volver al chat */}
                        <Link
                            to="/chat"
                            className="text-white text-sm bg-blue-700 px-3 py-1 rounded-full hover:bg-blue-800 transition"
                        >
                            Ir a Chats
                        </Link>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
                <div className="text-center max-w-4xl w-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                        Perfiles de Empresas
                    </h1>
                    <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                        Explora las empresas que forman parte de nuestra plataforma.
                    </p>

                    {/* Lista de Empresas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companies.map((company) => (
                            <div
                                key={company.id}
                                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                    {company.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {company.description}
                                </p>
                                {/* Opcional: Botón para ver más detalles del perfil */}
                                <button className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Ver Perfil
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 px-4">
                <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} 3NGTech. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
};

export default Profiles;