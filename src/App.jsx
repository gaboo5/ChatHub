
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home'; 
import Layout from './components/Layout'; 

function App() {
    
    // const [selectedPlatform, setSelectedPlatform] = useState('Instagram');

    return (
        // Envuelve toda la aplicación con BrowserRouter para habilitar la navegación
        <Router>
            <Routes>
                {/* Ruta para la página principal */}
                <Route path="/" element={<Home />} />
                
                {/* Ruta para la sección de mensajes (tu layout actual) */}
                
                <Route path="/chat" element={<Layout onSelectPlatform={() => {}} selectedPlatform="Instagram" />} />
                
                {/*  <Route path="/profiles" element={<div>Sección de Perfiles (a implementar)</div>} /> */}
            </Routes>
        </Router>
    );
}

export default App;