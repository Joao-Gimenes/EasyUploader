// App.js
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyCtS5s27_RRNQRYvtBQZsvbA-NT3tJ7s",
  authDomain: "easyuploader2024.firebaseapp.com",
  projectId: "easyuploader2024",
  storageBucket: "easyuploader2024.appspot.com",
  messagingSenderId: "39965968147",
  appId: "1:39965968147:web:8f377c74ae8d7923143ce6"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const storageRef = ref(storage, `uploads/${selectedFile.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, selectedFile);
      console.log('Upload concluído:', snapshot);
      alert('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Erro no envio:', error);
      alert('Erro no envio.');
    }
  };

  return (
    <div>
      <h1>Anexar Arquivo</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
