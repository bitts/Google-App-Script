/**
 * @name          FIFO-DataUpdate.gs
 * @fileoverview  Lógica para Google Sheets que atualiza a "última data" quando a quantidade disponível é zerada
 * @author        Bitts
 * @version       1.0
 * @changelog
 * - version 1.0 [06/03/2025 19:00]
 *   - Released initial version.
 */

/**
Solicitação via Telegram do usuário "Debora Caroline" no Grupo "Googe Sheets & App Script BR"

Boa tarde, pessoal! Tudo bem?
Estou desenvolvendo um controle de estoque baseado no método FIFO (Primeiro que Entra, Primeiro que Sai). Até agora, consegui identificar quando uma carga foi totalmente consumida e quando começamos a utilizar outra carga. No entanto, meu objetivo é também registrar a data em que cada carga acabou, para que eu tenha um controle mais preciso sobre o tempo de uso de cada lote de produto."
Essa versão fica mais precisa e detalha melhor o que já foi feito e o que ainda falta ser feito
Conseguem me ajudar?
https://docs.google.com/spreadsheets/d/1PqWz4bNKywovVRBGhuT1yGSfvGFgsnRaj-v7ExdLQAw/edit?usp=sharing
*/


function onEdit(e) {
  new Estoque(e);
}

class Estoque{

  getSheet(){
    return {
      aba: 'Estoque',
      linguagem: 'pt-br',
      data_formato : 'dd/MM/yyyy HH:mm:ss',
      colunas : {
        'entrada' : {indice: 2, letra: 'A', nome: 'Data entrada'},
        'descricao' : {indice: 3, letra: 'B', nome: 'Descrição'},
        'pedido' : {indice: 4, letra: 'C', nome: 'Pedido fornecedor'},
        'vlr_total' : {indice: 5, letra: 'D', nome: 'Valor total'},
        'qntd' : {indice: 6, letra: 'E', nome: 'Quantidade'},
        'vlr_untr' : {indice: 7, letra: 'F', nome: 'Valor unitário'},
        'qntd_vnd' : {indice: 8, letra: 'G', nome: 'Quantidade vendida'},
        'qntd_dspn' : {indice: 9, letra: 'H', nome: 'Quantidade dispinível'},
        'data' : {indice: 10, letra: 'I', nome: 'Última data'}
      }
    }
  }
  
  constructor(e) {
  
    var sheet = this.getSheet();
    
    try {
      var planilhaBase = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet.aba);
      
      if (!planilhaBase) {
        throw new Error(`Planilha '${sheet.aba}' não encontrada.`);
      }

    } catch (err) {
      Logger.log(`Erro ao processar dados para a planilha: ${err.toString()}`);
      SpreadsheetApp.getUi().alert(`Erro ao processar dados para a planilha: ${err.message}`);
    }

    try{
      const r = e.range;              
      const linha = r.getRow();       
      const sh = r.getSheet();        
      const sheetName = sh.getName(); 

      const data_registro = Utilities.formatDate(new Date(), sheet.linguagem, sheet.data_formato).toString();

      if(sheet.aba == sheetName){
        if(planilhaBase.getRange(linha, sheet.colunas.qntd_dspn.indice).getValue() == 0)
          planilhaBase.getRange(linha, sheet.colunas.data.indice).setValue(data_registro)
      }

    } catch (err) {
      Logger.log(`Erro ao processar dados para a planilha: ${err.toString()}`);
      SpreadsheetApp.getUi().alert(`Erro ao processar dados para a planilha: ${err.message}`);
    }    

  }

}
