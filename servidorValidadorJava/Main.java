public class Main {
    public static void main(String[] args) {
        // Teste com diferentes números de cartão
        String[] cartoes = {
                "4111111111111111", // Visa válido
                "5105105105105100", // Mastercard válido
                "5066991111111111", // Elo válido
                "1234567812345678", // Número inválido
                "4011781234567890", // Elo válido
                "4012001038443335", // Visa válido
                "2221001234567890", // Mastercard válido
                "2720991234567890", // Mastercard válido
                "0000000000000000", // Número inválido
                "4000 0000 0000 0000",
                "4000 0000 0a00 0000",
                "4000 0000 c0000 b0000",
        };

        for (String numeroCartao : cartoes) {
            ValidadarCartao validador = new ValidadarCartao(numeroCartao);
            System.out.println("Número do cartão: " + numeroCartao);
            if (validador.isValid()) {
                System.out.println("Cartão válido! Bandeira identificada.");
            } else {
                System.out.println("Cartão inválido!");
            }
            System.out.println("--------------------------");
        }
    }
}
