public class Main {
    public static void main(String[] args) {
        String[] numerosCartao = {
                "4111111111111111", // Visa válido
                "5105105105105100", // Mastercard válido
                "2221000000000009", // Mastercard válido
                "4011780000000000", // Elo válido
                "5066991111111111", // Elo válido
                "123456789012", // Comprimento incorreto
                "12345678901234567890", // Comprimento incorreto
                "4111a11111111111", // Contém letras
                "1234567890123456", // Prefixo inválido
                "0000000000000000", // Somente zeros
                "4111-1111-1111-1111" // Caracteres especiais
        };

        for (String cartao : numerosCartao) {
            ValidarCartao validador = new ValidarCartao(cartao);
            System.out.println("Número do cartão: " + cartao);
            System.out.println("É válido? " + validador.isValid());
            System.out.println("--------------------------");
        }

        // Testando várias senhas
        String[] senhas = {
                "Senha123!", // Válida
                "senha123", // Inválida, sem maiúscula e caractere especial
                "Senha!123", // Válida
                "abc123!A", // Válida
                "12345!A", // Inválida, menos de 8 caracteres
                "Senh@1234", // Válida
                "s3nh@1234" // Válida
        };

        for (String senha : senhas) {
            ValidarSenha validacao = new ValidarSenha(senha);
            System.out.println("Senha: " + senha + " | Válida: " + validacao.isValid());
        }
    }
}