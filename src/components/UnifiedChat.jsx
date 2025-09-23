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
  const [sortGroupsBy, setSortGroupsBy] = useState('name'); // 'name', 'count', 'recent'
  const [sortMessagesBy, setSortMessagesBy] = useState('recent'); // 'recent', 'platform'

  const filtered = messages.filter(msg =>
    msg.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCount = filtered.length;
  
  // Los mensajes del mismo usuario se agrupan
  const groupedMessages = useMemo(() => {
    // Agrupar todos los mensajes por usuario
    const groups = {};
    filtered.forEach(msg => {
      if (!groups[msg.user]) {
        groups[msg.user] = {
          user: msg.user,
          messages: [],
          platforms: new Set()
        };
      }
      groups[msg.user].messages.push(msg);
      groups[msg.user].platforms.add(msg.platform);
    });
    
    // Convertir Set a Array y preparar para ordenamiento
    const groupsArray = Object.values(groups).map(group => {
      const platforms = Array.from(group.platforms);
      // Encontrar el mensaje más reciente para ordenar grupos
      const lastMessage = group.messages.reduce((latest, current) => {
        const latestTime = new Date(latest.timestamp || 0);
        const currentTime = new Date(current.timestamp || 0);
        return currentTime > latestTime ? current : latest;
      }, group.messages[0]);
      
      return {
        ...group,
        platforms,
        lastMessageTime: lastMessage?.timestamp || new Date().toISOString()
      };
    });
    
    // Ordenar grupos
    switch (sortGroupsBy) {
      case 'name':
        groupsArray.sort((a, b) => a.user.localeCompare(b.user));
        break;
      case 'count':
        groupsArray.sort((a, b) => b.messages.length - a.messages.length);
        break;
      case 'recent':
        groupsArray.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        break;
      default:
        break;
    }
    
    // Ordenar mensajes dentro de cada grupo
    groupsArray.forEach(group => {
      switch (sortMessagesBy) {
        case 'recent':
          group.messages.sort((a, b) => {
            const timeA = new Date(a.timestamp || 0);
            const timeB = new Date(b.timestamp || 0);
            return timeB - timeA;
          });
          break;
        case 'platform':
          group.messages.sort((a, b) => a.platform.localeCompare(b.platform));
          break;
        default:
          break;
      }
    });
    
    return groupsArray;
  }, [filtered, sortGroupsBy, sortMessagesBy]);

  return (
    <div>
      {/* Buscador y controles de ordenamiento */}
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

        {/* Controles de ordenamiento */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Grupos:</label>
            <select 
              value={sortGroupsBy}
              onChange={(e) => setSortGroupsBy(e.target.value)}
              className="bg-gray-100 dark:bg-[#161616] text-gray-800 dark:text-white px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm"
            >
              <option value="name">Por nombre</option>
              <option value="count">Por cantidad</option>
              <option value="recent">Más recientes</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Mensajes:</label>
            <select 
              value={sortMessagesBy}
              onChange={(e) => setSortMessagesBy(e.target.value)}
              className="bg-gray-100 dark:bg-[#161616] text-gray-800 dark:text-white px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm"
            >
              <option value="recent">Más recientes</option>
              <option value="platform">Por plataforma</option>
            </select>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
            {filteredCount} resultados
          </span>
        </div>
      </div>
  
      {/* Mensajes agrupados */}
      <div className="space-y-6 px-6 py-4">
        {groupedMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No hay mensajes para mostrar</p>
          </div>
        ) : (
          groupedMessages.map((groupData) => (
            <div key={groupData.user} className="bg-white dark:bg-[#111] rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
              {/* Header del grupo con usuario y plataformas */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">
                  {highlightMatch(groupData.user, searchTerm)}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({groupData.messages.length} mensajes)
                  </span>
                </h3>
                <div className="flex gap-1">
                  {groupData.platforms.map(platform => (
                    <span 
                      key={platform} 
                      className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      title={platform}
                    >
                      {platformIcons[platform] || '📱'}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Lista de mensajes */}
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {groupData.messages
                  .filter(msg => msg.text && msg.text.trim() !== "")
                  .map((msg, msgIndex) => {
                    const platformStyles = getPlatformClasses(msg.platform);

                    return (
                      <li
                        key={`${msg.user}-${msgIndex}`}
                        className="py-4 animate-fade-in hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`text-xl p-2 rounded-full 
                            ${platformStyles.lightBg} ${platformStyles.darkBg} 
                            ${platformStyles.lightText} ${platformStyles.darkText}`}>
                            {platformIcons[msg.platform]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-800 dark:text-white">
                                {highlightMatch(groupData.user, searchTerm)}
                              </span>
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                {msg.platform}
                              </span>
                              {msg.timestamp && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>
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
          ))
        )}
      </div>
    </div>
  );
}

// Colores por plataforma
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

// Resaltado de coincidencias
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