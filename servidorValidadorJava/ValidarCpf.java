
public class ValidarCpf extends Comunicado {
    private String cpf;

    public ValidarCpf(String cpf) {
        this.cpf = cpf.replaceAll("[^\\d]", "");
    }

    public boolean isValid() {
        if (this.cpf == null || this.cpf.isEmpty() || this.cpf.length() != 11)
            return false;

        if (!cpf.matches("\\d+")) {
            return false;
        }

        // Separa os 9 primeiros dígitos
        String cpfBase = cpf.substring(0, 9);

        // Calcula o primeiro dígito da verificação
        int primeiroDigitoVerificador = calcularDigito(cpfBase, 10);
        boolean digitoUmValido = cpf.charAt(9) == (primeiroDigitoVerificador + '0'); // Comparação correta com char

        // Calcula o segundo dígito verificador
        String cpfBaseComPrimeiroDigito = cpfBase + primeiroDigitoVerificador;
        int segundoDigitoVerificador = calcularDigito(cpfBaseComPrimeiroDigito, 11);
        boolean digitoDoisValido = cpf.charAt(10) == (segundoDigitoVerificador + '0'); // Comparação correta com char

        // Compara os dois, mais uma validacao
        return digitoUmValido && digitoDoisValido;
    }

    private static int calcularDigito(String cpfBase, int pesoInicial) {
        int soma = 0;
        for (int i = 0; i < cpfBase.length(); i++) {
            soma += Character.getNumericValue(cpfBase.charAt(i)) * pesoInicial--;
        }

        int resto = soma % 11;
        return (resto < 2) ? 0 : 11 - resto;
    }
}
