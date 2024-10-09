require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const uploadsFolder = process.env.UPLOADS_FOLDER || 'uploads';

// Configuração do multer para armazenar arquivos
const storage = multer.memoryStorage(); // Usando memória para manipular os arquivos antes de salvá-los

const upload = multer({ 
  storage,
  limits: { fileSize: 250 * 1024 * 1024 } // Limite de 250MB para cada arquivo
});

const app = express();

// Middleware para suportar formulários URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos

// Rota para a página de upload na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envia o HTML
});

// Rota para processar o upload de arquivos
app.post('/upload', upload.array('files'), (req, res) => { // Mudei a rota para '/upload'
  const now = new Date();
  const folderName = now.toISOString().replace(/:/g, '-');
  const dir = path.join(__dirname, uploadsFolder, folderName);

  // Cria uma única pasta para todos os arquivos do upload
  fs.mkdirSync(dir, { recursive: true });

  // Salva cada arquivo no diretório criado
  req.files.forEach(file => {
    const filePath = path.join(dir, file.originalname);
    fs.writeFileSync(filePath, file.buffer); // Salva o arquivo na pasta
  });

  // Após o upload, redireciona para a raiz para atualizar o formulário
  res.redirect('/'); // Redireciona para a página principal após o upload
});

// Middleware para tratar erros de upload
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('Erro: O tamanho do arquivo é muito grande. O limite é de 250MB.');
    }
  } else if (err) {
    return res.status(500).send('Erro ao fazer o upload dos arquivos.');
  }
  next();
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
