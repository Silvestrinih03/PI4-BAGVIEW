export class CadastroDto {
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    idPlan: string;
    card: {
      num: string;
      nome: string;
      val: string;
    }[];
}
  