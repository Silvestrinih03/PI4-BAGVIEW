export class PagamentoDto {
    email: string;
    idPlan: string;
    card: {
        num: string;
        nome: string;
        val: string;
    }[];
}
  