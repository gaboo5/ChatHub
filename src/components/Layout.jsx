import { useState, useEffect } from 'react';
import UnifiedChat from './UnifiedChat'; 
import messages from '../data/messages.json';



export default function Layout() {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [liveMessages, setLiveMessages] = useState(messages);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Aplicar el modo oscuro
    useEffect(() => {
    if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Guardar en localStorage
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

        // Cargar el modo oscuro
        useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            const isDark = savedMode === 'true';
            setDarkMode(isDark);
            // Aplicar al DOM inmediatamente
            if (isDark) {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

      // Mensajes automáticos
    useEffect(() => {
  const interval = setInterval(() => {
    const platforms = ['Instagram', 'Whatsapp', 'Messenger', 'Telegram'];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    const newMsg = {
      user: `auto_${randomPlatform.toLowerCase()}`,
      text: `Mensaje automático ${Math.floor(Math.random() * 1000)}`,
      platform: randomPlatform
    };
    setLiveMessages(prev => [...prev, newMsg]);
  }, 5000); // cada 5 segundos

  return () => clearInterval(interval); // limpieza al desmontar
}, []);


    const filteredMessages = selectedPlatform
    ? liveMessages.filter(msg => msg.platform === selectedPlatform)
    : liveMessages;

  return (
  <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      
      {/* 🧠 Header */}
      <header className="flex items-center justify-between bg-red-600 px-4 py-3 shadow">
  <div className="flex items-center gap-2">
    <span className="text-white text-2xl font-bold">⚡ 3NGTech</span>
    </div>
    <div className="flex items-center gap-3">
      <button
    onClick={() => setDarkMode(!darkMode)}
                        className="text-white text-sm bg-black/20 px-3 py-1 rounded-full hover:bg-black/30 transition"
                    >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
  </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-xl focus:outline-none"
        >
          ☰
        </button>
        </div>
      </header>

      <div className="flex flex-1">
        
        {/* 🧭 Sidebar */}
        <aside
  className={`bg-white dark:bg-gray-900 w-64 p-4 space-y-2 shadow-md transition-transform duration-300
    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:block fixed md:relative z-10 h-full`}
>
          {['Instagram', 'Whatsapp', 'Messenger', 'Telegram', 'Unificado'].map(platform => (
            <button
              key={platform}
              onClick={() => {
                setSelectedPlatform(platform);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#333] transition"
            >
  {platform}
</button>

          ))}
          <button
            onClick={() => {
              setSelectedPlatform(null);
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded font-medium text-red-600 hover:bg-red-100"
          >
            Mostrar todos
          </button>
        </aside>


      {/* 🟨 Main content */}
      <main className="flex-1 p-6 overflow-y-auto md:ml-64 bg-gray-100 dark:bg-gray-800">

          <UnifiedChat messages={filteredMessages} />
      </main>
    </div>
  </div>
  );
  
}