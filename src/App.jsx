import { useState } from "react";
import Layout from './components/Layout';
import  InstagramChat  from './components/InstagramChat';
import  WhatsappChat  from './components/WhatsappChat';
import  MessengerChat  from './components/MessengerChat';
import  TelegramChat  from './components/TelegramChat';

import UnifiedChat from './components/UnifiedChat';

const allMessages = [
  { user: 'juan.perez', platform: 'Instagram', text: 'Hola!' },
  { user: 'juan.perez', platform: 'Whatsapp', text: '¿Estás ahí?' },
  { user: 'maria.dev', platform: 'Telegram', text: 'Te mandé el archivo' },
  { user: 'juan.perez', platform: 'Messenger', text: 'Ya llegué' },
  { user: 'maria.dev', platform: 'Instagram', text: '¿Lo recibiste?' },
];

function App() {
    const [selectedPlatform, setSelectedPlatform] = useState('Instagram');

    const renderChat = () => {
        switch (selectedPlatform) {
            case 'Instagram':
                return <InstagramChat />;
            case 'Whatsapp':
                return <WhatsappChat />;
            case 'Messenger':
                return <MessengerChat />;
            case 'Telegram':
                return <TelegramChat />;
            case 'Unificado':
                return <UnifiedChat messages={allMessages} />;

            default:
                return <p>Selecciona una plataforma</p>;
                

        }
    };

    return (
        <Layout onSelectPlatform={setSelectedPlatform}
        selectedPlatform={selectedPlatform} >
            {renderChat()}
        </Layout>
    );
}

export default App;