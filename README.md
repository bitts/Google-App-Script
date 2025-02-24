# Google-App-Script
Script do Google App Script - Scripts criados por mim como exercício de lógica de programação e conhecimento das bibliotecas e recursos disponíveis para essa suite de ferramentas


- [moedaPorExtenso.gs](https://github.com/bitts/Google-App-Script/blob/main/moedaPorExtenso.gs) Função para retornar valor monetário por extenso (possivel de incrementaão para outras moedas)
  USO:
  ```
  =moedaPorExtenso(11814,63)
  ```
  ```
  =moedaPorExtenso(11814,63, 'real')
  ```
  RETORNO:
  ```
  "onze mil, oitocentos e quatrorze reais e sessenta e três centavos"
  ```

  OBS: Somente funcional para "Real" (para funcionamento correto para outras moedas editar pacote de linguagem* (assim que possível realizarei ajustes para dolar e quem sabe bitcoin)
  - pacote de linguagem não testado para outras que não português Brasil, sendo provável a necessidade de pequenos ajustes para funcionamento correto!
    (contribua caso encontre erros)
  
  
- [selectFile.gs](https://github.com/bitts/Google-App-Script/blob/main/selectFile/init.gs)
Selecionar arquivos em um formulário Web
Criação para um formulário HTML de um campo do tipo "select" onde seja possível selecionar um arquivo do Google Drive. (Existe necessidade de utilização de jQuery para o seu funcionamento correto)
  - [selectFile.html](https://github.com/bitts/Google-App-Script/blob/main/selectFile/selectFile.html) Modelo
  - [init.gs](https://github.com/bitts/Google-App-Script/blob/main/selectFile/init.gs) Algoritmo
  
   ![selectFile4](https://github.com/user-attachments/assets/43585e36-5de2-4417-aef0-a195538a4e85)



