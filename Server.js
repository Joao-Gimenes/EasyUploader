const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Função para criar a pasta e o arquivo de texto
const createFolderAndFile = (name, course, additionalInfo) => {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }).replace(':', '-');
    const folderName = `${name}/${course} - ${date}-${time}`;
    const folderPath = path.join(__dirname, 'uploads', folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Criar arquivo de texto com informações adicionais
    const textFilePath = path.join(folderPath, 'informacoes.txt');
    const textContent = `Nome: ${name}\nCurso: ${course}\nInformações Adicionais: ${additionalInfo}`;
    fs.writeFileSync(textFilePath, textContent, 'utf8');

    return folderPath;
};

// Configuração do Multer para armazenar arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const additionalInfo = req.body.additionalInfo || ''; // Pegue informações adicionais do formulário
        const folderPath = createFolderAndFile(req.body.nome, req.body.curso, additionalInfo);
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

  // Conversão do custo para número
  const custo = parseFloat(req.body.custo);
  if (isNaN(custo)) {
      return res.status(400).json({ message: 'Custo deve ser um número válido.' });
  }

  // Acesse o tipo como um valor único
  const tipo = req.body.tipo; // Isso deve capturar apenas o valor selecionado

  // Criação do arquivo de texto com informações adicionais
  const folderPath = createFolderAndFile(req.body.nome, req.body.curso, req.body.additionalInfo);
  const txtFilePath = path.join(folderPath, 'informacoes.txt');

  // Atualização da informação para garantir que 'tipo' está correto
  const info = `Nome: ${req.body.nome}\nCurso: ${req.body.curso}\nTipo: ${tipo}\nQuantidade: ${req.body.quantidade}\nCusto: R$ ${custo.toFixed(2)}`;

  // Escrevendo no arquivo de texto
  fs.writeFileSync(txtFilePath, info, { encoding: 'utf8' });

  res.json({ message: 'Arquivos enviados com sucesso!' });
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
