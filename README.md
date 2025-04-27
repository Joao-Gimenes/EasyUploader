# EasyUploader

O **EasyUploader** é um aplicativo de upload de arquivos desenvolvido para facilitar o envio de arquivos para um servidor, organizando-os em pastas personalizadas e permitindo a adição de informações extras. O projeto foi desenvolvido utilizando **HTML**, **CSS**, **JavaScript** e **Node.js**, com a integração com o **Firebase** para armazenamento dos arquivos.

## Funcionalidades

- **Upload de Arquivos**: Envia arquivos para o servidor de forma simples e eficiente.
- **Criação Automática de Pastas**: Organiza os arquivos em pastas com base nas informações fornecidas (nome, curso, data e hora).
- **Arquivo de Texto**: Gera um arquivo de texto junto com os arquivos enviados, contendo informações adicionais sobre o envio (número de páginas, tipo de impressão, valor total, etc.).
- **Cálculo de Preço**: Calcula o valor total do upload com base na quantidade de páginas e tipo de impressão escolhido.
- **Interface Limpa**: Exibe o formulário de envio de maneira simples e intuitiva.
- **Integração com Firebase**: Armazena os arquivos no Firebase, garantindo a escalabilidade e segurança dos dados.
- **Limpeza de Formulário**: Após o envio, os campos de nome, curso e arquivos são limpos automaticamente.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
- **Backend**:
  - Node.js
  - Firebase

## Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/easyuploader.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd easyuploader
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor localmente:
   ```bash
   npm start
   ```

5. Acesse o projeto em seu navegador através de `http://localhost:3000`.

## Funcionalidade de Admin

O projeto também possui uma interface de administração:

1. **Página Admin**: Acesse a página de administração através de `/admin`.
2. **Login**: A página Admin requer autenticação de login para visualizar e gerenciar os arquivos enviados.
3. **Visualização de Arquivos**: O administrador pode visualizar as pastas organizadas por nome, curso, data e hora.
4. **Download de Arquivos**: O administrador pode baixar os arquivos diretamente da interface de administração.

## Estrutura de Pastas

```
/easyuploader
  /firebase
  /public
    /uploads
  /src
  .gitignore
  package.json
  README.md
```

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma branch com suas alterações:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Comite suas alterações:
   ```bash
   git commit -am 'Adicionando nova funcionalidade'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Abra um Pull Request.
