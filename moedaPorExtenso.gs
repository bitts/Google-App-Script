/**
 * @name          moedaPorExtenso.gs
 * @fileoverview  Função para Google Sheets que retorna valor monetário por extenso | Function for Google Sheets that returns monetary value in words
 * @author        Bitts
 * @version       1.0
 * @changelog
 * - version 1.0 [01/01/2024 18:00]
 *   - Released initial version.
 */


/**
 * ## Retorna valor por extenso
 * Retorna valor informado da moeda por extenso sendo permitido a implantação de novas moedas com pequenas moficações no código
 * 
 * ### Modo de Uso:
 * ```  
 *   =moedaPorExtenso(11814,63, "real")
 * ```
 * 
 * ### Resultado:
 * ```
 *  "onze mil, oitocentos e quatrorze reais e sessenta e três centavos"
 * ```
 * 
 * @param {number} número que será convertido para por extenso
 * @param {String} Moeda para a qual será convertida
 * @return {String} Retorna o valor por extensão
 * @customfunction  
 */
function moedaPorExtenso(n = "?", moeda = "real"){

  var lang = {
    'info' : `Utilização função escreve moeda por extenso
      =moedaPorExtenso( valor, moeda)"
        - valor: número positivo
        - moeda: "real"

      CHAMADA: =moedaPorExtenso(11814,63)
                =moedaPorExtenso(11814,63, "real")

      RESULTADO: "onze mil, oitocentos e quatrorze reais e sessenta e três centavos"

            (Version 1.0 | Data: 01/04/2024 | https://github.com/bitts)`,
    'negativo': 'Erro: número negativo',
    'parametros': 'Erro: Necessário informar parâmetros de escrita por extensao',
    'valor': 'Erro: Intervalo de valores não é permitido para retorno da função'

  };

  var money_lang = {
    ['real'] : {
      trilhao : {
        singular : "trilhão",
        plugar : "trilhões"
      },
      bilhao : {
        singular: "bilhão",
        plural: "bilhões"
      },
      milhao : {
        singular: "milhão",
        plural: "milhões"
      },
      moeda : {
        singular : "real",
        plural: "reais" 
      },
      centavo : {
        singular: "centavo",
        plural: "centavos"
      },
      zero: "zero",
      extensao : {
        t1 : ["um","dois","três","quatro","cinco","seis","sete","oito","nove"],
        t2 : ["dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"],
        t3 : ["vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"],
        t4 : ["cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"],
      }
    },
    ['dolar'] : {

    }

  }

  var money = money_lang[moeda];

  function CentenaExtenso(n, extensao = {
      t1 : ["um","dois","três","quatro","cinco","seis","sete","oito","nove"],
      t2 : ["dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"],
      t3 : ["vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"],
      t4 : ["cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"]
    }){
    var u,d,c,casas;
    var r="";
    
    var t1 = extensao.t1;
    var t2 = extensao.t2;
    var t3 = extensao.t3;
    var t4 = extensao.t4;

    casas=n.toString().length;
    u=0;d=0;c=0;
    if(n>0) {u=parseInt(n.toString().substr(casas-1,1));}
    if(n>9) {d=parseInt(n.toString().substr(casas-2,1));}
    if(n>99){c=parseInt(n.toString().substr(casas-3,1));}
    if(n==100){return "cem";}
    else {
      if(c>0){
        r=r+t4[c-1];
        if(d>0 || u>0){r=r+" e ";}
      }
      if(d>1){
        r=r+t3[d-2];
        if(u>0){r=r+" e ";}
      } else if(d==1 && u>=0){
        r=r+t2[d+u-1];
      }
      if(u>0 && d!=1){
        r=r+t1[u-1];
      }
    }
    return r;
  }

  var j,x,m,r,ri,rd,d,i,casas,erro;
  var v1=0,v2=0,v3=0,v4=0,v5=0,v6=0;
  r="";
  rd="";
  ri="";
  i=parseInt(n);
  d=n-i;
  d=d.toFixed(2);
  d=d*100;
  d=d.toFixed(0);
  casas=i.toString().length;

  if(n=="?")return lang.info;

  if(Array.isArray(n))return lang.valor;

  if(n<0)return lang.negativo;

  if(d==100){ d=0; i=i+1; }

  if(casas>12){
    v5=(parseInt(i/1000000000000)*1000000000000-parseInt(i/1000000000000000)*1000000000000000)/1000000000000;
    if(v5>0){
      j="";
      x=CentenaExtenso(v5, money.extensao);
      if(v5>1){ri=ri+j+x+' '+money.trilhao.plugar}else{ri=ri+j+x+' '+money.trilhao.singular}
    }
  }
  if(casas>9){
    v4=(parseInt(i/1000000000)*1000000000-parseInt(i/1000000000000)*1000000000000)/1000000000;
    if(v4>0){
      if(v5){j=", ";}else{j="";}
      x=CentenaExtenso(v4, money.extensao);
      if(v4>1){ri=ri+j+x+' '+money.bilhao.plural}else{ri=ri+j+x+' '+money.bilhao.singular}
    }
  }
  if(casas>6){
    v3=(parseInt(i/1000000)*1000000-parseInt(i/1000000000)*1000000000)/1000000;
    if(v3>0){
      if(v4+v5){j=", ";}else{j="";}
      x=CentenaExtenso(v3, money.extensao);
      if(v3>1){ri=ri+j+x+' '+money.milhao.plural}else{ri=ri+j+x+' '+money.milhao.singular}
    }
  }
  if(casas>3){
    v2=(parseInt(i/1000)*1000-parseInt(i/1000000)*1000000)/1000;
    if(v2>0){
      if(v3+v4+v5){j=", "}else{j=""}
      x=CentenaExtenso(v2, money.extensao);
      if(v2==1){
        ri=ri+j+"mil";
      } else {
        ri=ri+j+x+" mil";
      }
    }
  }
  if(casas>0){
    v1=(parseInt(i).toFixed(0))-(parseInt(i/1000).toFixed(0)*1000);
    if(v1>0){
      if(v2+v3+v4+v5){if(v1<=100){j=" e ";}else{j=", ";}}else{j="";}
      x=CentenaExtenso(v1, money.extensao);
      ri=ri+j+x;
    }
  }

  if((d!=0 && money.moeda.singular=="inteiro") || money.moeda.singular!="inteiro"){
    if(i>0 && !v1){ri=ri+" de "+money.moeda.plural;}
    else if(i>1 && v1==1){ri=ri+" "+money.moeda.plural;}
    else if(v1==1){ri=ri+" "+money.moeda.singular;}
    else if(v1>1){ri=ri+" "+money.moeda.plural;}
    else if(i==1){ri=ri+" "+money.moeda.singular;}
  }
  
  if(d==1){
    rd="um "+centavo;
  } else if(d>1 && d<100){
    rd=CentenaExtenso(d, money.extensao)+" "+money.centavo.plural;
  }
  if(i<1 && d>0 && money.moeda.singular!="inteiro"){
    rd=rd+" de "+money.moeda.singular;
  }else if(i==0 && d==0){
    rd=money.zero+' '+money.moeda.singular;
  }  

  if(d>0 && i>0){
    rd=" e "+rd;
  }
    
  r=ri+rd;
  return r;
}

