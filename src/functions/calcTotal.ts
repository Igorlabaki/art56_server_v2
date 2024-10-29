
import { calcExtras } from "./calcExtra";
import { calcDiaria } from "./calcDiaria";
import { transformDate } from "./transformData";
import { calcHorasExtras } from "./calcHorasExtra";
import { calcQtdHoraExtra } from "./calcQtdHoraExtra";
import { calcDuracaoFesta } from "./calcDuracaoFesta";
import { Values } from "@prisma/client";

interface CalcTotalProps {
  data: {
    limpeza: boolean;
    seguranca: boolean;
    convidados: number;
    dataInicio: string;
    horarioInicio: string;
    horarioFim: string;
    valueList: Values[];
    recepcionista: boolean;
  };
  separador?: string;
}

export function calcTotal({
  data: {
    valueList,
    limpeza,
    dataInicio,
    horarioInicio,
    horarioFim,
    seguranca,
    recepcionista,
    convidados,
  },
  separador,
}: CalcTotalProps) {

  const { dataFinal, dataInicial } = transformDate({
    separador,
    dataInicio: dataInicio,
    horarioFim: horarioFim,
    horarioInicio: horarioInicio,
  });

  const dataFim = new Date(dataFinal.toDate());
  const inicial = new Date(dataInicial.toDate());

  const duracaoFesta = calcDuracaoFesta(inicial, dataFim);

  const dataExtra = valueList?.map((item: Values) => {
    return { titulo: item?.titulo, valor: item?.valor };
  });

  const extras = calcExtras(
    {
      limpeza: limpeza,
      recepcionista: recepcionista,
      seguranca: seguranca,
    },
    250,
    250,
    250
  );

  const [monthInicio] = dataInicio.split("-");

  const diaria = calcDiaria(
    "Festa",
    monthInicio,
    convidados,
    100
  );

  const qtdHorasExtras = calcQtdHoraExtra(duracaoFesta);
  const valorHoraExtra = calcHorasExtras(diaria);
  const total = diaria + extras + valorHoraExtra * qtdHorasExtras;

  return {
    total,
    dataFim,
    diaria,
    inicial,
    qtdHorasExtras,
    valorHoraExtra,
  };
}
