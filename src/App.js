// App.js
import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Arquivo enviado com sucesso!');
      } else {
        alert('Erro no envio.');
      }
    } catch (error) {
      console.error('Erro:', error);
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
