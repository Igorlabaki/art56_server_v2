import { calcExtras } from "./calcExtra";
import { calcDiaria } from "./calcDiaria";
import { transformDate } from "./transformData";
import { calcHorasExtras } from "./calcHorasExtra";
import { calcQtdHoraExtra } from "./calcQtdHoraExtra";
import { calcDuracaoFesta } from "./calcDuracaoFesta";
import { Values } from "@prisma/client";

interface CalcNovoTotalProps{
  data: {
    total:number;
    limpeza: boolean;
    seguranca: boolean;
    convidados: number;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    valueList: Values[];
    recepcionista: boolean;
  },
  separador?: string;
}

export function calcNovoTotal({data: {valueList,limpeza,data,horarioInicio,horarioFim,seguranca,recepcionista,convidados, total},separador}: CalcNovoTotalProps){
    const { dataFinal, dataInicial } = transformDate({
        separador,
        dataInicio: data,
        horarioFim: horarioFim,
        horarioInicio: horarioInicio,
      });
    
      const final = new Date (dataFinal.toDate())
      const inicial = new Date (dataInicial.toDate())  
    
      const duracaoFesta = calcDuracaoFesta(inicial, final);
    
      const dataExtra = valueList?.map((item: Values) => {
        return { titulo: item?.titulo, valor: item?.valor };
      });
    
      const extras = calcExtras(
        {
          limpeza:limpeza,
          recepcionista: recepcionista,
          seguranca: seguranca,
        },
        250,
        250,
        250
      );
    
      const valor = total - extras
      const qtdHorasExtras = calcQtdHoraExtra(duracaoFesta);
      const diaria = (valor / duracaoFesta) * (duracaoFesta - qtdHorasExtras)
      const valorHoraExtra = calcHorasExtras(diaria);

      const novoTotal = diaria + extras + ( valorHoraExtra * qtdHorasExtras);

      return {
        final,
        diaria,
        inicial,
        novoTotal,
        qtdHorasExtras,
        valorHoraExtra,
      }
}
