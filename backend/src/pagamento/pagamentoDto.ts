export class PagamentoDto {
    email: string;
    card: {
        num: string;
        nome: string;
        val: string;
    }[];
}
  