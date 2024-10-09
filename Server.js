const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Inicializa o aplicativo Express
const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos (HTML, CSS, etc.)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Função para criar a pasta com nome/curso e data/hora
const createFolder = (name, course) => {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }).replace(':', '-');
    const folderName = `${name}/${course} - ${date}-${time}`;
    const folderPath = path.join(__dirname, 'uploads', folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    return folderPath;
};

// Configuração do Multer para armazenar arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = createFolder(req.body.nome, req.body.curso);
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Rota para upload de arquivos
app.post('/upload', upload.array('files', 10), (req, res) => {
    if (!req.body.nome || !req.body.curso) {
        return res.status(400).json({ message: 'Nome e curso são obrigatórios.' });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }

    res.json({ message: 'Arquivos enviados com sucesso!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
