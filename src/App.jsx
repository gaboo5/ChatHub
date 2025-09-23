import { useState } from "react";
import Layout from './components/Layout';

function App() {
    const [selectedPlatform, setSelectedPlatform] = useState('Instagram');

    return (
        <Layout 
            onSelectPlatform={setSelectedPlatform}
            selectedPlatform={selectedPlatform}
        />
    );
}

export default App;