package com.servidorjava.bagview.controller;

public class CPFValidacaoTeste {

    public static boolean validarCPF(String cpf) {
        // CPF precisa ter 11 números para ter a primeira validacao (essa validacao pode
        // ser feita fora do servidor)
        if (cpf.length() != 11) {
            return false;
        }

        // INICIO

        // Primeiro, separar os 9 primeiros numeros do CPF do cliente
        // Recebe so os 9 primeiros do CPF -> OK
        String cpfBase = cpf.substring(0, 9);
        int[] digitos = new int[11]; // vetor em uso!!!!!!!!

        // Confere para nao deixar entrar string como CPF, mas essa verificação pode ser
        // feita na pag de cadastro antes de
        // enviar o CPF já verificado pro servidor fazer a conta e ver se existe mesmo
        // for (int i = 0; i < 9; i++) {
        // digitos[i] = Character.getNumericValue(cpf.charAt(i));
        // }

        // Calcula o primeiro dígito da verificacao
        int primeiroDigitoVerificador = calcularDigito(cpfBase, 10);
        digitos[9] = primeiroDigitoVerificador;

        // Calcula o segundo dígito verificador
        String cpfBaseComPrimeiroDigito = cpfBase + primeiroDigitoVerificador;
        int segundoDigitoVerificador = calcularDigito(cpfBaseComPrimeiroDigito, 11);
        digitos[10] = segundoDigitoVerificador;

        // Compara os dois, mais uma validacao
        return cpf.charAt(9) == Character.forDigit(primeiroDigitoVerificador, 10) &&
                cpf.charAt(10) == Character.forDigit(segundoDigitoVerificador, 10);
    }

    // Cada um dos 9 numeros sao multiplicados por outros numa ordem decrescente,
    // que comeca em 10 e termina em 2:
    // Aqui ocorre o calculo da multiplicacao pelo peso decrescente, o loop opera a
    // troca dos pesos
    // Recebe os 9 primeiros numeros do CPF e multiplica pelo peso --------> OK
    private static int calcularDigito(String cpfBase, int pesoInicial) {
        int soma = 0;
        for (int i = 0; i < cpfBase.length(); i++) {
            soma += Character.getNumericValue(cpfBase.charAt(i)) * pesoInicial--;
        }

        int resto = soma % 11;
        return (resto < 2) ? 0 : 11 - resto;
    }
}
