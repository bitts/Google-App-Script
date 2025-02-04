# Google-App-Script - Selecionar arquivos em um formulário Web

A idéia aqui foi criar para um formulário HTML um campo do tipo "select" onde seja possível selecionar um arquivo do Google Drive.
Existe necessidade de utilização de jQuery para o seu funcionamento correto.

  # USO:
  
  jQuery
  ```
    var chave = "chave de da pasta do Google Drive";
    var local = "local onde sera exibida as informações do arquivo";

    $('#select_file').selectGFile(chave, local);
  ```

  HTML
  ```
    <select id="select_file"></select>
    <p id="id"></p>
  ```

  Chamada da Classe
  ```
    var elemento = $('#select_file');                     //elemento do tipo select
    var folderId = "chave de da pasta do Google Drive";   //chave 
    var output = $('#id');                                //elemento de saida

    new selectFile(elemento , folderId, output);          //chamada da classe
  ```

  
  # Visualização:

  ## Selecionando arquivo

  - Carregado os arquivos
      
![selectFile0](https://github.com/user-attachments/assets/c69500e5-fc79-4fb3-822b-dae092b3921d)

  - Carrega primeiramente a pasta escolhida como Root para a listagem

![selectFile1](https://github.com/user-attachments/assets/3d82fc15-f85e-4af9-a2a4-1bc274b3f830)

  - Procure o arquivo que deseja

![selectFile2](https://github.com/user-attachments/assets/eb86ad6f-0fb5-471b-abde-58493f083dd7)

  - Selecionando o arquivo do Google Drive as informações do mesmo serão exibidas no elemento indicado
  
![selectFile3-](https://github.com/user-attachments/assets/ae116fec-6a58-443b-b181-a00fc12839ce)

## Acessando Pasta

- Clique na pasta que deseja carregar seu conteudo

![selectFile3](https://github.com/user-attachments/assets/8083523f-55ad-4a19-9b90-34960ad238b1)

- Na listagem é apresentado o botão para voltar a pasta pai

![selectFile4](https://github.com/user-attachments/assets/a7c8ff65-964a-4b0b-a8de-58f7d14bebf5)


