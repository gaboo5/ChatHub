import { useState, useMemo } from 'react';

const platformIcons = {
  Instagram: '📸',
  Whatsapp: '💬',
  Messenger: '📨',
  Telegram: '🚀',
  Unificado: '🔗'
};

export default function UnifiedChat({ messages }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = messages.filter(msg =>
    msg.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCount = filtered.length;
  
  const groupedMessages = useMemo(() => {
    const groups = {};
    filtered.forEach(msg => {
      if (!groups[msg.user]) groups[msg.user] = [];
      groups[msg.user].push(msg);
    });
    return groups;
  }, [filtered]);

  return (
    <div>
      {/* 🔍 Buscador */}
      <div className="bg-white dark:bg-[#000] text-gray-900 dark:text-white px-6 py-6 font-sans">
        <h1 className="text-2xl font-bold mb-2">Buscar en 3NGTech</h1>

        <div className="relative my-4">
          <input
            type="text"
            placeholder="Buscar por usuario o palabra clave..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#161616] text-gray-800 dark:text-white px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        </div>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
            {filteredCount} resultados
          </span>
        </div>
      </div>
  
      {/* 💬 Mensajes agrupados */}
      <div className="space-y-6 px-6 py-4">
        {Object.entries(groupedMessages).map(([user, userMessages]) => (
          <div key={user} className="bg-white dark:bg-[#111] rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold mb-3">{highlightMatch(user, searchTerm)}</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {userMessages
  .filter(msg => msg.text && msg.text.trim() !== "")
  .map((msg, index) => {
    const platformStyles = getPlatformClasses(msg.platform);

    return (
      <li
        key={index}
        className="py-4 animate-fade-in hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition"
      >
        <div className="flex items-start gap-3">
          <div className={`text-xl p-2 rounded-full 
            ${platformStyles.lightBg} ${platformStyles.darkBg} 
            ${platformStyles.lightText} ${platformStyles.darkText}`}>
            {platformIcons[msg.platform]}
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {highlightMatch(user, searchTerm)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {highlightMatch(msg.text, searchTerm)}
            </p>
          </div>
        </div>
      </li>
    );
  })}

            </ul>
          </div>
        ))}
      </div>
      </div>
  );
}
            

          
// 🎨 Colores por plataforma
function getPlatformColor(platform) {
  switch (platform) {
    case 'Instagram': return 'purple';
    case 'Whatsapp': return 'green';
    case 'Telegram': return 'blue';
    case 'Messenger': return 'sky';
    default: return 'gray';
  }
}

function getPlatformClasses(platform) {
  const map = {
    Instagram: {
      lightBg: 'bg-purple-100',
      darkBg: 'dark:bg-purple-800',
      lightText: 'text-purple-600',
      darkText: 'dark:text-purple-200'
    },
    Whatsapp: {
      lightBg: 'bg-green-100',
      darkBg: 'dark:bg-green-800',
      lightText: 'text-green-600',
      darkText: 'dark:text-green-200'
    },
    Telegram: {
      lightBg: 'bg-blue-100',
      darkBg: 'dark:bg-blue-800',
      lightText: 'text-blue-600',
      darkText: 'dark:text-blue-200'
    },
    Messenger: {
      lightBg: 'bg-sky-100',
      darkBg: 'dark:bg-sky-800',
      lightText: 'text-sky-600',
      darkText: 'dark:text-sky-200'
    },
    Unificado: {
      lightBg: 'bg-gray-100',
      darkBg: 'dark:bg-gray-800',
      lightText: 'text-gray-600',
      darkText: 'dark:text-gray-200'
    }
  };
  return map[platform] || map.Unificado;
}


// ✨ Resaltado de coincidencias
function highlightMatch(text, term) {
  if (!term) return text;

  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  const index = lowerText.indexOf(lowerTerm);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + term.length);
  const after = text.slice(index + term.length);

  return (
    <>
      {before}
      <strong className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white px-1 rounded">
  {match}
</strong>
      {after}
    </>
  );
}
