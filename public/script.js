let filesArray = []; // Array para armazenar os arquivos selecionados

function updateFileList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpa a lista atual

    filesArray.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name; // Nome do arquivo
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFile(index); // Atribui a função de remover ao botão
        listItem.appendChild(removeButton);
        fileList.appendChild(listItem);
    });

    // Atualiza a mensagem de arquivos escolhidos
    const message = filesArray.length > 0 ? 'Arquivos escolhidos: ' + filesArray.length : 'Nenhum arquivo escolhido.';
    document.getElementById('fileMessage').textContent = message; // Atualiza a mensagem com o número correto
}

function addFiles(event) {
    const newFiles = Array.from(event.target.files); // Adiciona arquivos selecionados ao array
    filesArray.push(...newFiles); // Adiciona os novos arquivos ao array existente
    updateFileList(); // Atualiza a lista de arquivos
}

function removeFile(index) {
    filesArray.splice(index, 1); // Remove o arquivo do array
    updateFileList(); // Atualiza a lista de arquivos
}

function validateFiles() {
    let totalSize = 0;
    for (const file of filesArray) {
        totalSize += file.size;
    }
    if (totalSize > 250 * 1024 * 1024) { // Verifica se o tamanho total dos arquivos excede 250MB
        alert('Erro: O tamanho total dos arquivos não pode exceder 250MB.');
        return false; // Impede o envio do formulário
    }
    return true; // Permite o envio do formulário
}

function prepareFilesForUpload(event) {
    const input = document.querySelector('input[type="file"]');
    const dataTransfer = new DataTransfer(); // Para criar uma nova lista de arquivos
    filesArray.forEach(file => dataTransfer.items.add(file)); // Adiciona os arquivos selecionados

    input.files = dataTransfer.files; // Atualiza o input de arquivos
}
